using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(destination => destination.Username,
                    opt => opt.MapFrom(source => source.AppUser.UserName))
                .ForMember(destination => destination.DisplayName,
                    opt => opt.MapFrom(source => source.AppUser.DisplayName));
        }
    }
}