using Application.Followers;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/profile")]
    public class FollowersController : BaseController
    {
        [HttpPost("{username}/follow")]
        public async Task<ActionResult<Unit>> Follow(string username) =>
            await Mediator.Send(new Add.Command { Username = username });

        [HttpDelete("{username}/follow")]
        public async Task<ActionResult<Unit>> UnFollow(string username) =>
            await Mediator.Send(new Delete.Command { Username = username });

        [HttpGet("{username}/follow")]
        public async Task<ActionResult<List<Profile>>> GetFollowings(string username, string are) =>
            await Mediator.Send(new List.Query { Username = username, Are = are });
    }
}