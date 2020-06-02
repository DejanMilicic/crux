using AutoMapper;
using Crux.Data.Core.Results;
using Crux.Model.Core;

namespace Crux.Test.TestData.Maps
{
    public class TestApiProfile : Profile
    {
        public TestApiProfile()
        {
            CreateMap<User, UserDisplay>();
            CreateMap<UserConfig, UserDisplay>()
                .ForMember(x => x.Id, opt => opt.Ignore())
                .ForMember(x => x.Name, opt => opt.Ignore());
            CreateMap<Tenant, TenantDisplay>();
            CreateMap<ImageFile, VisibleDisplay>();
        }
    }
}