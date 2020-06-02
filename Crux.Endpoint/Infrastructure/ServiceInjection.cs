using Crux.Cloud.Core;
using Crux.Cloud.Core.Interface;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Infrastructure.Interface;
using Microsoft.Extensions.DependencyInjection;

namespace Crux.Endpoint.Infrastructure
{
    public static class ServiceInjection
    {
        public static void ConfigureServices(IServiceCollection services)
        {
            var modelSerializer = new ModelSerializer();
            services.AddSingleton<IDeserializeEntity>(modelSerializer);
            services.AddSingleton<ISerializeEntity>(modelSerializer);
            services.AddScoped<IDataHandler, DataHandler>();
            services.AddScoped<ICloudHandler, CloudHandler>();
            services.AddSingleton(StoreInjecton.CreateStore);
            services.AddScoped(StoreInjecton.CreateSession);
            services.AddScoped<ILogicHandler, LogicHandler>();
        }
    }
}