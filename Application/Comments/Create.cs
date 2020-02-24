using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public string Body { get; set; }
            public Guid ActivityId { get; set; }
            public string Username { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
            }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                _ = activity ?? throw new RestException(HttpStatusCode.NotFound,
                    new {Activity = "Activity not found."});

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == request.Username,
                    cancellationToken);

                _ = user ?? throw new RestException(HttpStatusCode.NotFound,
                    new {Activity = "User not found."});

                var comment = new Comment
                {
                    Activity = activity,
                    Author = user,
                    Body = request.Body,
                    CreatedAt = DateTime.Now
                };

                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync(cancellationToken) > 0;
                if (success) return _mapper.Map<CommentDto>(comment);
                throw new Exception("Problem saving changes.");
            }
        }
    }
}