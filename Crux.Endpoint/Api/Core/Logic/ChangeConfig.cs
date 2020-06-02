using System;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Base;
using Crux.Model.Core;

namespace Crux.Endpoint.Api.Core.Logic
{
    public class ChangeConfig : LogicCommand
    {
        public string UserId { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
        public User CurrentUser { get; set; }
        public User ResultUser { get; set; }
        public UserConfig ResultConfig { get; set; }
        public bool Result { get; set; }

        public override async Task Execute()
        {
            var proceed = await Check();

            if (proceed)
            {
                switch (Key.ToUpper())
                {
                    case "HASINTRO":
                        ResultConfig.HasIntro = Convert.ToBoolean(Value);
                        break;
                    case "TEMPLATEVIEW":
                        ResultConfig.TemplateView = Value;
                        break;
                    case "EMAILNOTIFY":
                        ResultConfig.EmailNotify = Convert.ToBoolean(Value);
                        break;
                    case "PUSHNOTIFY":
                        ResultConfig.PushNotify = Convert.ToBoolean(Value);
                        break;
                    case "SMSNOTIFY":
                        ResultConfig.SmsNotify = Convert.ToBoolean(Value);
                        break;
                    case "TAKE":
                        ResultConfig.Take = Convert.ToInt32(Value);
                        break;
                    case "ISTWOFACTOR":
                        ResultConfig.IsTwoFactor = Convert.ToBoolean(Value);
                        break;
                    default:
                        proceed = false;
                        break;
                }

                if (proceed)
                {
                    var persist = new Persist<UserConfig> {Model = ResultConfig};
                    await DataHandler.Execute(persist);
                    Result = persist.Confirm.Success;
                }
                else
                {
                    proceed = true;

                    switch (Key.ToUpper())
                    {
                        case "CANSUPERUSER":
                            if (CurrentUser.Right.CanSuperuser)
                            {
                                ResultUser.Right.CanSuperuser = Convert.ToBoolean(Value);
                            }
                            else
                            {
                                proceed = false;
                            }

                            break;
                        case "CANADMIN":
                            if (CurrentUser.Right.CanSuperuser)
                            {
                                ResultUser.Right.CanAdmin = Convert.ToBoolean(Value);
                            }
                            else
                            {
                                proceed = false;
                            }

                            break;
                        case "CANAUTH":
                            ResultUser.Right.CanAuth = Convert.ToBoolean(Value);
                            break;
                        default:
                            proceed = false;
                            break;
                    }

                    if (proceed)
                    {
                        var persist = new Persist<User> {Model = ResultUser};
                        await DataHandler.Execute(persist);
                        Result = persist.Confirm.Success;
                    }
                }
            }
        }

        private async Task<bool> Check()
        {
            ResultUser = CurrentUser;

            if (CurrentUser.Id != UserId)
            {
                var loader = new UserById {Id = UserId};
                await DataHandler.Execute(loader);

                if (loader.Result != null)
                {
                    ResultUser = loader.Result;
                    ResultConfig = loader.ResultConfig;

                    if (ResultUser.TenantId != CurrentUser.TenantId || !CurrentUser.Right.CanAdmin)
                    {
                        if (CurrentUser.Right.CanSuperuser)
                        {
                            return true;
                        }
                    }
                    else
                    {
                        return true;
                    }
                }
            }
            else
            {
                return true;
            }

            return false;
        }
    }
}