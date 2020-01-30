﻿using Application.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class UserController : BaseController
    {
        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> Login(Login.Query query)
            => await Mediator.Send(query);

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<ActionResult<User>> Register(Register.Command command)
            => await Mediator.Send(command);

        [HttpGet]

        public async Task<ActionResult<User>> CurrentUser()
            => await Mediator.Send(new CurrentUser.Query());
    }
}