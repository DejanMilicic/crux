using Crux.Cloud.Core;
using Crux.Model.Core.Confirm;
using System;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

namespace Crux.Cloud.Engage
{
    public class SmsCmd : CloudCmd
    {
        public string SenderPhone { get; set; }
        public string RecipientPhone { get; set; }
        public string Message { get; set; }

        public override async Task Execute()
        {
            TwilioClient.Init(Settings.Value.TwilioAccountSid, Settings.Value.TwilioAuthToken);

            try
            {
                var message = await MessageResource.CreateAsync(
                    body: Message,
                    from: new Twilio.Types.PhoneNumber(SenderPhone),
                    to: new Twilio.Types.PhoneNumber(RecipientPhone)
                );

                Result = ActionConfirm.CreateSuccess(message.Sid);
            }
            catch (Exception e)
            {
                Result = ActionConfirm.CreateFailure(e.Message);
            }
        }
    }
}