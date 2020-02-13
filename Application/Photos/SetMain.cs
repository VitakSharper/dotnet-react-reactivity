using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest
        {
            public string ImageId { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;


            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentUser = await _context.Users.SingleOrDefaultAsync(u =>
                    u.UserName == _userAccessor.GetCurrentUsername(), cancellationToken: cancellationToken);

                var photo = currentUser.Photos.FirstOrDefault(p => p.Id == request.ImageId);

                foreach (var item in currentUser.Photos)
                {
                    Console.WriteLine($"\n {item.Id}");
                }

                Console.WriteLine(
                    $"\nPhoto requested from current user: {photo?.Url}: {currentUser.UserName}: {request.ImageId}\n");
                
                if (photo == null)
                    throw new RestException(HttpStatusCode.NotFound,
                        new {Photo = "Photo not found."});
                photo.IsMain = true;

                var currentMain = currentUser.Photos.FirstOrDefault(f => f.IsMain);
                if (currentMain != null) currentMain.IsMain = false;

                if (await _context.SaveChangesAsync(cancellationToken) > 0) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}