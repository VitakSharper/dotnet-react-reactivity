using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Comments
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Comment, CommentDto>()
                .ForMember(destination => destination.Username,
                    opt =>
                        opt.MapFrom(source => source.Author.UserName))
                .ForMember(destination => destination.DisplayName,
                    opt =>
                        opt.MapFrom(source => source.Author.DisplayName))
                .ForMember(destination => destination.Image,
                    opt =>
                        opt.MapFrom(source => source.Author.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}