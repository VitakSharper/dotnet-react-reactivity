using AutoMapper;
using Domain;
using System.Linq;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(destination => destination.Username,
                    opt =>
                        opt.MapFrom(source => source.AppUser.UserName))
                .ForMember(destination => destination.DisplayName,
                    opt =>
                        opt.MapFrom(source => source.AppUser.DisplayName))
                .ForMember(destination => destination.Image,
                    opt =>
                        opt.MapFrom(source => source.AppUser.Photos.FirstOrDefault(p => p.IsMain).Url));
        }
    }
}