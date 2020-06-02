using AutoMapper;
using Crux.Data.Base.Results;
using Crux.Data.Core.Results;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Base;
using Crux.Model.Base.Interface;
using Crux.Model.Core;

namespace Crux.Endpoint.ViewModel.Maps
{
    public class CoreProfile : Profile
    {
        public CoreProfile()
        {
            CreateMap<Tenant, TenantViewModel>();
            CreateMap<TenantViewModel, Tenant>();
            CreateMap<User, UserViewModel>()
                .ForMember(x => x.Phone, opt => opt.MapFrom(src => src.EncryptedPhone));
            CreateMap<User, CurrentViewModel>();
            CreateMap<TenantDisplay, CurrentViewModel>()
                .ForMember(x => x.Id, opt => opt.Ignore());
            CreateMap<UserViewModel, User>();
            CreateMap<VisibleFile, VisibleViewModel>();
            CreateMap<IEntityOwned, ResultOwned>();
        }
    }
}