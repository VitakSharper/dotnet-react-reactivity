﻿using Application.Errors;
using Application.Profiles;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Followers
{
    public class List
    {
        public class Query : IRequest<List<Profile>>
        {
            public string Username { get; set; }
            public string Are { get; set; }
        }

        public class Handler : IRequestHandler<Query, List<Profile>>
        {
            private readonly DataContext _context;
            private readonly IProfileReader _profileReader;

            private List<UserFollowing> UserFollowings { get; set; } = new List<UserFollowing>();

            private List<Profile> Profiles { get; } = new List<Profile>();

            public Handler(DataContext context, IProfileReader profileReader)
            {
                _context = context;
                _profileReader = profileReader;
            }

            public async Task<List<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var queryable = _context.Followings.AsQueryable();

                switch (request.Are)
                {
                    case "followers":
                        {
                            UserFollowings = await queryable.Where(x =>
                                x.Target.UserName == request.Username).ToListAsync(cancellationToken: cancellationToken);

                            foreach (var follower in UserFollowings)
                            {
                                Profiles.Add(await _profileReader.ReadProfile(follower.Observer.UserName));
                            }

                            break;
                        }
                    case "following":
                        {
                            UserFollowings = await queryable.Where(x =>
                                x.Observer.UserName == request.Username).ToListAsync(cancellationToken: cancellationToken);

                            foreach (var follower in UserFollowings)
                            {
                                Profiles.Add(await _profileReader.ReadProfile(follower.Target.UserName));
                            }

                            break;
                        }
                    default:
                        throw new RestException(HttpStatusCode.BadRequest, new { Are = "Bad parameter." });
                }

                return Profiles;
            }
        }
    }
}