using Application.Errors;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public ProfileReader(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }

        public async Task<Profile> ReadProfile(string username)
        {
            var user = await _context.Users.SingleOrDefaultAsync(
                u => u.UserName == username);

            _ = user ??
                throw new RestException(HttpStatusCode.NotFound,
                    new { User = "User not found." });

            var currentUser = await _context.Users.SingleOrDefaultAsync(
                u => u.UserName == _userAccessor.GetCurrentUsername());

            _ = currentUser ??
                throw new RestException(HttpStatusCode.NotFound,
                    new { User = "Not Found." });

            var profile = new Profile
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Image = user.Photos.FirstOrDefault(i => i.IsMain)?.Url,
                Photos = user.Photos,
                Bio = user.Bio,
                FollowersCount = user.Followers.Count(),
                FollowingCount = user.Followings.Count()
            };

            if (currentUser.Followings.Any(f => f.TargetId == user.Id))
                profile.IsFollowed = true;

            return profile;
        }
    }
}