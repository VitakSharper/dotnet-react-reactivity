﻿using System.Threading.Tasks;
using Application.Photos;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseController
    {
        [HttpPost]
        public async Task<ActionResult<Photo>> Add([FromForm] Add.Command command)
            => await Mediator.Send(command);

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id) =>
            await Mediator.Send(new Delete.Command {ImageId = id});

        [HttpPost("{id}/setMain")]
        public async Task<ActionResult<Unit>> SetMain(string id) =>
            await Mediator.Send(new SetMain.Command {ImageId = id});
    }
}