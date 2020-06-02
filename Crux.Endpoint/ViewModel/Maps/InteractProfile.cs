using AutoMapper;
using Crux.Endpoint.ViewModel.Interact;
using Crux.Model.Interact;

namespace Crux.Endpoint.ViewModel.Maps
{
    public class InteractProfile : Profile
    {
        public InteractProfile()
        {
            CreateMap<Msg, MsgViewModel>()
                .ForMember(x => x.Files, opt => opt.Ignore())
                .ForMember(x => x.Recipients, opt => opt.Ignore());
            CreateMap<MsgViewModel, Msg>();
            CreateMap<MeetingType, MeetingTypeViewModel>();
            CreateMap<MeetingTypeViewModel, MeetingType>();
            CreateMap<Meeting, MeetingViewModel>()
                .ForMember(x => x.Attendees, opt => opt.Ignore());
            CreateMap<MeetingViewModel, Meeting>();
            CreateMap<Attendance, AttendanceViewModel>()
                .ForMember(x => x.Participants, opt => opt.Ignore());
            CreateMap<AttendanceViewModel, Attendance>();
        }
    }
}