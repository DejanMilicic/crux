using AutoMapper;
using AutoMapper.Configuration;
using Crux.Endpoint.ViewModel.Maps;

namespace Crux.Endpoint.Infrastructure
{
    public class AutoMapperConfig
    {
        public static MapperConfiguration Configure()
        {
            var config = new MapperConfigurationExpression();
            config.AddProfile<CoreProfile>();
            config.AddProfile<InteractProfile>();
            return new MapperConfiguration(config);
        }
    }
}