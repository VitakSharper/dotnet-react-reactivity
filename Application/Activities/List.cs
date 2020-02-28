using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
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

            public Query(int? limit, int? offset)
            {
                Limit = limit;
                Offset = offset;
            }
        }

        public class Handler : IRequestHandler<Query, ActivitiesEnvelope>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ActivitiesEnvelope> Handle(Query request, CancellationToken cancellationToken) =>
                new ActivitiesEnvelope
                {
                    Activities = _mapper.Map<List<Activity>, List<ActivityDto>>(
                        await _context.Activities
                            .Skip(request.Offset ?? 0)
                            .Take(request.Limit ?? 3).ToListAsync(cancellationToken: cancellationToken)),
                    ActivityCount = _context.Activities.Count()
                };
        }
    }
}