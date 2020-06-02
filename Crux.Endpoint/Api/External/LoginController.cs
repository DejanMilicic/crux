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
    using Model.Utility;
    using NSwag.Annotations;
    using System;
    using Crux.Model.Core;
    using Crux.Data.Base;
    using Crux.Cloud.Core.Interface;
    using Crux.Endpoint.Api.Core.Logic;

    public class LoginController : HandledController
    {
        public LoginController(IDataHandler dataHandler, ICloudHandler cloudHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
            CloudHandler = cloudHandler;
        }

        public ICloudHandler CloudHandler { get; set; }

        [HttpPost]
        [AllowAnonymous]
        [Description("Auth a User to use the system")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AuthViewModel))]
        public async Task<IActionResult> Auth([FromBody] LoginViewModel viewModel)
        {
            var query = new UserByEmail { Email = viewModel.Email };
            await DataHandler.Execute(query);

            if (query.Result != null && query.Result.IsActive &&
                (query.ResultTenant == null || query.ResultTenant.IsActive))
            {
                if (query.Result.EncryptedPwd.Equals(EncryptHelper.Encrypt(viewModel.Pwd)))
                {
                    if (query.ResultConfig.IsTwoFactor)
                    {
                        query.ResultConfig.TwoFactorAuth = Convert.ToString(EncryptHelper.Randomizer(100000, 999999));
                        query.ResultConfig.IsTwoFactorActive = true;

                        var persist = new Persist<UserConfig>() { Model = query.ResultConfig };
                        await DataHandler.Execute(persist);

                        if (persist.Confirm.Success)
                        {
                            await DataHandler.Commit();
                        }

                        var notify = new SimpleNotify
                        {
                            CloudHandler = CloudHandler,
                            DataHandler = DataHandler,
                            CurrentUser = query.Result,
                            LogicHandler = LogicHandler,
                            Model = persist.Model,
                            TemplateName = "twofactor"
                        };
                        await LogicHandler.Execute(notify);

                        return Ok(new AuthViewModel() { Id = query.Result.Id, IsTwoFactor = true });
                    }
                    else
                    {
                        var logic = new SigninAuth
                        {
                            Login = query.Result,
                            Config = query.ResultConfig,
                            Tenant = query.ResultTenant,
                            Settings = CloudHandler.Settings
                        };
                        await LogicHandler.Execute(logic);
                        return Ok(logic.Result);
                    }
                }
            }

            return Ok(new FailViewModel { Message = "Login failed" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Description("Client reconnect")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AuthViewModel))]
        public async Task<IActionResult> Reconnect([FromBody] ReconnectViewModel viewModel)
        {
            if (viewModel.Key.Equals(EncryptHelper.Encrypt(viewModel.Id + Keys.Salty)))
            {
                var query = new UserById { Id = viewModel.Id };
                await DataHandler.Execute(query);

                if (query.Result != null && query.Result.IsActive &&
                    (query.ResultTenant == null || query.ResultTenant.IsActive))
                {
                    var logic = new SigninAuth
                    {
                        Login = query.Result,
                        Config = query.ResultConfig,
                        Tenant = query.ResultTenant,
                        Settings = CloudHandler.Settings
                    };
                    await LogicHandler.Execute(logic);
                    return Ok(logic.Result);
                }
            }

            return Ok(new FailViewModel { Message = "Reconnect failed" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Description("Reply to TwoFactor with Auth")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(AuthViewModel))]
        public async Task<IActionResult> TwoFactor([FromBody] TwoFactorViewModel viewModel)
        {
            var query = new UserById { Id = viewModel.Id };
            await DataHandler.Execute(query);

            if (query.Result != null && query.Result.IsActive &&
                (query.ResultTenant == null || query.ResultTenant.IsActive))
            {
                var config = query.ResultConfig;

                if (config.TwoFactorAuth == viewModel.Auth && config.IsTwoFactorActive && config.IsTwoFactor)
                {
                    config.IsTwoFactorActive = false;
                    config.TwoFactorAuth = string.Empty;

                    var persist = new Persist<UserConfig>() { Model = config };
                    await DataHandler.Execute(persist);

                    if (persist.Confirm.Success)
                    {
                        await DataHandler.Commit();
                    }

                    var logic = new SigninAuth
                    {
                        Login = query.Result,
                        Config = query.ResultConfig,
                        Tenant = query.ResultTenant,
                        Settings = CloudHandler.Settings
                    };
                    await LogicHandler.Execute(logic);
                    return Ok(logic.Result);
                }

                return Ok(new FailViewModel { Message = "Code does not match" });
            }

            return Ok(new FailViewModel { Message = "Identity not found" });
        }
    }
}