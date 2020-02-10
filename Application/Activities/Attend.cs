using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class Attend
    {
        public class Query : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Delete.Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Delete.Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { activity = "Could not find activity." });

                var user =
                    await _context.Users.SingleOrDefaultAsync(u =>
                        u.UserName == _userAccessor.GetCurrentUsername(), cancellationToken: cancellationToken);

                var attendance =
                    await _context.UserActivities.SingleOrDefaultAsync(a =>
                        a.ActivityId == activity.Id && a.AppUserId == user.Id, cancellationToken: cancellationToken);

                if (attendance != null)
                    throw new RestException(HttpStatusCode.BadRequest,
                        new { Attendence = "Already attending this activity." });

                attendance = new UserActivity
                {
                    Activity = activity,
                    AppUser = user,
                    IsHost = false,
                    DateJoined = DateTime.Now
                };

                await _context.UserActivities.AddAsync(attendance, cancellationToken);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes.");
            }
        }
    }
}