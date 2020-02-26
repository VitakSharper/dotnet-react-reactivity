using Application.Interfaces;
using AutoMapper;
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using Persistence;
using System.Linq;

namespace Application.Activities
{
    // mapping resolver;
    public class FollowingResolver : IValueResolver<UserActivity, AttendeeDto, bool>
    {
        private readonly IUserAccessor _userAccessor;
        private readonly DataContext _context;

        public FollowingResolver(IUserAccessor userAccessor, DataContext context) =>
            (_userAccessor, _context) = (userAccessor, context);

        public bool Resolve(UserActivity source, AttendeeDto destination, bool destMember, ResolutionContext context) =>
            _context.Users
                .SingleOrDefaultAsync(u =>
                    u.UserName == _userAccessor.GetCurrentUsername()).Result
                .Followings.Any(u => u.TargetId == source.AppUserId);
    }
}