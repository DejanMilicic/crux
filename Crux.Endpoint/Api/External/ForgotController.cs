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
    using Crux.Cloud.Core.Interface;
    using Crux.Model.Core;
    using Crux.Data.Base;
    using System;
    using Crux.Endpoint.Api.Core.Logic;

    public class ForgotController : HandledController
    {
        public ForgotController(IDataHandler dataHandler, ICloudHandler cloudHandler, ILogicHandler logicHandler)
            : base(dataHandler, logicHandler)
        {
            CloudHandler = cloudHandler;
        }

        public ICloudHandler CloudHandler { get; set; }

        [HttpPost]
        [AllowAnonymous]
        [Description("Start the Forget Password process")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ForgotCodeViewModel))]
        public async Task<IActionResult> Code([FromBody] ForgotViewModel viewModel)
        {
            var query = new UserByEmail { Email = viewModel.Email };
            await DataHandler.Execute(query);

            if (query.Result != null && query.Result.IsActive &&
                (query.ResultTenant == null || query.ResultTenant.IsActive))
            {
                var config = query.ResultConfig;

                if (config.ForgotCounter < 10)
                {
                    config.ForgotCode = StringHelper.GenerateCode(12);
                    config.ResetAuth = Convert.ToString(EncryptHelper.Randomizer(100000, 999999));
                    config.ForgotCounter += 1;

                    var persist = new Persist<UserConfig>() { Model = config };
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
                        TemplateName = "forgot"
                    };

                    await LogicHandler.Execute(notify);

                    return Ok(new ForgotCodeViewModel()
                    { Email = viewModel.Email, Code = config.ForgotCode, Success = true });
                }

                return Ok(new FailViewModel { Message = "Too many Forgot Password attempts -> " + config.ForgotCounter });
            }

            return Ok(new FailViewModel { Message = "Email not found" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Description("Reply to Forgot with an Auth Token")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ForgotCodeViewModel))]
        public async Task<IActionResult> Reply([FromBody] ForgotReplyViewModel viewModel)
        {
            var query = new UserByEmail { Email = viewModel.Email };
            await DataHandler.Execute(query);

            if (query.Result != null && query.Result.IsActive &&
                (query.ResultTenant == null || query.ResultTenant.IsActive))
            {
                var config = query.ResultConfig;

                if (!string.IsNullOrEmpty(config.ForgotCode) && !string.IsNullOrEmpty(config.ResetAuth) && config.ForgotCode == viewModel.Code && config.ResetAuth == viewModel.ResetAuth)
                {
                    config.ForgotCode = StringHelper.GenerateCode(12);
                    config.ResetCode = StringHelper.GenerateCode(20);

                    var persist = new Persist<UserConfig>() { Model = config };
                    await DataHandler.Execute(persist);

                    if (persist.Confirm.Success)
                    {
                        await DataHandler.Commit();
                    }

                    return Ok(new ForgotResetViewModel()
                    {
                        Email = viewModel.Email,
                        Code = config.ForgotCode,
                        Success = true,
                        ResetCode = config.ResetCode
                    });
                }

                return Ok(new FailViewModel { Message = "Code does not match" });
            }

            return Ok(new FailViewModel { Message = "Email not found" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Description("Reset Password")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ForgotCodeViewModel))]
        public async Task<IActionResult> Reset([FromBody] ForgotResetViewModel viewModel)
        {
            var query = new UserByEmail { Email = viewModel.Email };
            await DataHandler.Execute(query);

            if (query.Result != null && query.Result.IsActive &&
                (query.ResultTenant == null || query.ResultTenant.IsActive))
            {
                var config = query.ResultConfig;

                if (!string.IsNullOrEmpty(config.ForgotCode) && !string.IsNullOrEmpty(config.ResetCode) && config.ForgotCode == viewModel.Code && config.ResetCode == viewModel.ResetCode)
                {
                    var user = query.Result;
                    user.EncryptedPwd = EncryptHelper.Encrypt(viewModel.ResetPassword);

                    config.ResetAuth = string.Empty;
                    config.ResetCode = string.Empty;
                    config.ForgotCode = string.Empty;
                    config.ForgotCounter = 0;

                    var persistUser = new Persist<User>() { Model = user };
                    await DataHandler.Execute(persistUser);

                    var persistConfig = new Persist<UserConfig>() { Model = config };
                    await DataHandler.Execute(persistConfig);

                    if (persistUser.Confirm.Success)
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

            return Ok(new FailViewModel { Message = "Email not found" });
        }

        [HttpPost]
        [AllowAnonymous]
        [Description("Cancel Forgot Process")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(ForgotCodeViewModel))]
        public async Task<IActionResult> Cancel([FromBody] ForgotViewModel viewModel)
        {
            var query = new UserByEmail { Email = viewModel.Email };
            await DataHandler.Execute(query);

            if (query.Result != null && query.Result.IsActive &&
                (query.ResultTenant == null || query.ResultTenant.IsActive))
            {
                var config = query.ResultConfig;

                config.ResetAuth = string.Empty;
                config.ResetCode = string.Empty;
                config.ForgotCode = string.Empty;

                var persistConfig = new Persist<UserConfig>() { Model = config };
                await DataHandler.Execute(persistConfig);

                if (persistConfig.Confirm.Success)
                {
                    await DataHandler.Commit();
                }

                return Ok(true);
            }

            return Ok(new FailViewModel { Message = "Email not found" });
        }
    }
}