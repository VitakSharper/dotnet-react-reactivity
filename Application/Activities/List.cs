using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Activity = Domain.Activity;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    .ToListAsync(cancellationToken: cancellationToken);

                var listToReturn = _mapper.Map<List<Activity>, List<ActivityDto>>(activities);

                return listToReturn;
            }
        }
    }
}