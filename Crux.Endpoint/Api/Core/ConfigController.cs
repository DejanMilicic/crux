using System.ComponentModel;
using System.Net;
using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Query;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Endpoint.ViewModel.Core;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Crux.Endpoint.Api.Core
{
    public class ConfigController : SecureController
    {
        public ConfigController(IDataHandler dataHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
        }

        [HttpGet]
        [Description("Get a Config object for Current User")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(CurrentViewModel))]
        public async Task<IActionResult> Get()
        {
            var current = new CurrentViewModel()
            {
                Id = CurrentUser.Id, TenantId = CurrentUser.TenantId, Config = CurrentConfig, Right = CurrentUser.Right
            };

            var tenant = new TenantDisplayById {Id = CurrentUser.TenantId};
            await DataHandler.Execute(tenant);

            if (tenant.Result != null)
            {
                current = Mapper.Map(tenant.Result, current);
            }

            return Ok(current);
        }

        [HttpGet]
        [Description("Set a Config value on Current User")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ConfigViewModel))]
        public async Task<IActionResult> Set(string key, string value)
        {
            var logic = new ChangeConfig
            {
                CurrentUser = CurrentUser, ResultConfig = CurrentConfig, UserId = CurrentUser.Id, Key = key,
                Value = value
            };
            await LogicHandler.Execute(logic);

            if (logic.Result)
            {
                await DataHandler.Commit();
            }

            return Ok(new ConfigViewModel() {Config = logic.ResultConfig, Key = key, Success = logic.Result});
        }
    }
}