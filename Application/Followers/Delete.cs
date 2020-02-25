using Application.Errors;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Followers
{
    public class Delete
    {
        public class Command : IRequest
        {
            public string Username { get; set; }
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
                var observer =
                    await _context.Users.FirstOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUsername(),
                        cancellationToken: cancellationToken);

                _ = observer ??
                    throw new RestException(HttpStatusCode.NotFound,
                        new { User = "User not found." });

                var target =
                    await _context.Users.FirstOrDefaultAsync(u => u.UserName == request.Username, cancellationToken);

                _ = target ??
                    throw new RestException(HttpStatusCode.NotFound,
                        new { User = "User not found." });

                var following =
                    await _context.Followings.SingleOrDefaultAsync(
                        f => f.ObserverId == observer.Id && f.TargetId == target.Id, cancellationToken);

                _ = following ??
                    throw new RestException(HttpStatusCode.NotFound,
                        new { User = "You are not following this user." });


                _context.Followings.Remove(following);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving.");
            }
        }
    }
}