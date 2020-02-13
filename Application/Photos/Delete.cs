using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string ImageId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users.SingleOrDefaultAsync(
                    u => u.UserName == _userAccessor.GetCurrentUsername(),
                    cancellationToken: cancellationToken);

                var photo = currentUser.Photos.FirstOrDefault(p => p.Id == request.ImageId);

                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {Photo = "Photo not found."});

                if (photo.IsMain)
                    throw new RestException(HttpStatusCode.BadRequest,
                        new {Photo = "You cannot delete your main photo."});

                if (_photoAccessor.DeletePhoto(photo.Id) == null)
                    throw new Exception("Problem delete the photo.");

                currentUser.Photos.Remove((photo));

                if (await _context.SaveChangesAsync(cancellationToken) > 0) return Unit.Value;

                throw new Exception("Problem deleting photo.");
            }
        }
    }
}