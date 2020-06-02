namespace Crux.Endpoint.Api.External
{
    using System.ComponentModel;
    using System.Net;
    using System.Threading.Tasks;
    using Data.Base.Interface;
    using Data.Core.Loader;
    using Base;
    using Base.Interface;
    using Logic;
    using Endpoint.ViewModel.External;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using NSwag.Annotations;
    using Crux.Cloud.Core.Interface;

    public class SignupController : HandledController
    {
        public SignupController(IDataHandler dataHandler, ICloudHandler cloudHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
            CloudHandler = cloudHandler;
        }

        public ICloudHandler CloudHandler { get; set; }

        [HttpPost]
        [AllowAnonymous]
        [Description("Get a tenant based on Entry Key")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(EntryKeyViewModel))]
        public async Task<IActionResult> Entry([FromBody] EntryKeyViewModel viewModel)
        {
            var query = new TenantByEntryKey { EntryKey = viewModel.EntryKey };
            await DataHandler.Execute(query);

            if (query.Result != null)
            {
                return Ok(new EntryKeyViewModel { EntryKey = viewModel.EntryKey, TenantId = query.Result.Id, TenantName = query.Result.Name });
            }

            return Ok(new FailViewModel { Message = "Organisation not found or no longer valid" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Description("Signup from main form")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AuthViewModel))]
        public async Task<IActionResult> Post([FromBody] SignupViewModel viewModel)
        {
            var query = new UserByEmail { Email = viewModel.Email };
            await DataHandler.Execute(query);

            if (query.Result == null)
            {
                var signup = new SignupUser()
                {
                    DataHandler = DataHandler,
                    Input = viewModel,
                    LogicHandler = LogicHandler,
                    CloudHandler = CloudHandler
                };

                await LogicHandler.Execute(signup);
                return Ok(signup.ResultAuth);
            }

            return Ok(new FailViewModel { Message = "Email already in use" });
        }
    }
}