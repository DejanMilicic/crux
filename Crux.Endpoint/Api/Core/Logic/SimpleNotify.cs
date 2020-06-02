using System.Threading.Tasks;
using Crux.Cloud.Core.Interface;
using Crux.Cloud.Engage;
using Crux.Data.Base;
using Crux.Data.Core.Loader;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;

namespace Crux.Endpoint.Api.Core.Logic
{
    public class SimpleNotify : LogicCommand, IProcessCommand
    {
        public ICloudHandler CloudHandler { get; set; }
        public User CurrentUser { get; set; }
        public object Model { get; set; }
        public string TemplateName { get; set; }
        public string ReturnUrl { get; set; }
        public string ReturnIdentity { get; set; }
        public ActionConfirm EmailResult { get; set; }
        public ActionConfirm PushResult { get; set; }
        public ActionConfirm SmsResult { get; set; }
        public ActionConfirm Result { get; set; }

        public override async Task Execute()
        {
            var template = new NotifyTemplateByName {Name = TemplateName};
            await DataHandler.Execute(template);

            if (template.Result != null)
            {
                var tenant = new Loader<Tenant> {Id = CurrentUser.TenantId};
                await DataHandler.Execute(tenant);

                var config = new Loader<UserConfig> {Id = CurrentUser.ConfigId};
                await DataHandler.Execute(config);

                var processor = new TemplaterCmd();

                processor.Models.Add(CurrentUser);

                if (tenant.Result != null)
                {
                    processor.Models.Add(tenant.Result);
                }

                if (Model != null)
                {
                    processor.Models.Add(Model);
                }

                if (config.Result.EmailNotify)
                {
                    var email = new EmailTemplateCmd
                    {
                        Template = template.Result,
                        RecipientEmail = CurrentUser.Email,
                        Processor = processor
                    };

                    await CloudHandler.Execute(email);
                    EmailResult = email.Result;
                }

                if (config.Result.PushNotify)
                {
                    var push = new PushTemplateCmd()
                    {
                        IncludeUser = true,
                        TenantId = CurrentUser.TenantId,
                        UserId = CurrentUser.Id,
                        Template = template.Result,
                        Processor = processor,
                        Url = ReturnUrl,
                        Identity = ReturnIdentity
                    };

                    await CloudHandler.Execute(push);
                    PushResult = push.Result;
                }

                if (config.Result.SmsNotify)
                {
                    var sms = new SmsTemplateCmd()
                    {
                        RecipientPhone = CurrentUser.EncryptedPhone,
                        SenderPhone = CloudHandler.Settings.Value.TwilioSenderPhone,
                        Template = template.Result,
                        Processor = processor
                    };

                    await CloudHandler.Execute(sms);
                    SmsResult = sms.Result;
                }

                Result = ActionConfirm.CreateSuccess("Notification Completed");
            }
            else
            {
                ActionConfirm.CreateFailure("Template Missing -> " + TemplateName);
            }
        }
    }
}