using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Activity = Domain.Activity;

namespace Application.Activities
{
    public class List
    {
        public class ActivitiesEnvelope
        {
            public List<ActivityDto> Activities { get; set; }
            public int ActivityCount { get; set; }
        }

        public class Query : IRequest<ActivitiesEnvelope>
        {
            public int? Limit { get; }
            public int? Offset { get; }
            public bool IsGoing { get; }
            public bool IsHost { get; }
            public DateTime? StartDate { get; }

            public Query(int? limit, int? offset, bool isGoing, bool isHost, DateTime? startDate)
            {
                Limit = limit;
                Offset = offset;
                IsGoing = isGoing;
                IsHost = isHost;
                StartDate = startDate ?? DateTime.Now;
            }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Activities
                    .Where(a => a.Date >= request.StartDate)
                    .OrderBy(a => a.Date)
                    .AsQueryable();

                if (request.IsGoing && !request.IsHost)
                {
                    queryable = queryable.Where(u => u.UserActivities.Any(a =>
                        a.AppUser.UserName == _userAccessor.GetCurrentUsername()));
                }

                if (request.IsHost && !request.IsGoing)
                {
                    queryable = queryable.Where(u => u.UserActivities.Any(a =>
                        a.AppUser.UserName == _userAccessor.GetCurrentUsername() && a.IsHost));
                }

                var activities = await queryable
                    .Skip(request.Offset ?? 0)
                    .Take(request.Limit ?? 2).ToListAsync(cancellationToken: cancellationToken);

                return new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>>(activities),
                    ActivityCount = activities.Count()
                };
            }
        }
    }
}