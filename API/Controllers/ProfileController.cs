﻿using System.Collections.Generic;
using Application.Profiles;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ProfileController : BaseController
    {
        [HttpGet("{username}")]
        public async Task<ActionResult<Profile>> Get(string username) =>
            await Mediator.Send(new Details.Query {Username = username});

        [HttpPut]
        public async Task<ActionResult<Unit>> Edit(Edit.Command command) =>
            await Mediator.Send(command);

        [HttpGet("{username}/activities")]
        public async Task<ActionResult<List<UserActivityDto>>> GetUserActivities(string username, string predicate) =>
            await Mediator.Send(new ListActivities.Query {Username = username, Predicate = predicate});
    }
}