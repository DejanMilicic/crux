using Crux.Cloud.Core;
using Crux.Model.Core.Confirm;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Net;
using System.Threading.Tasks;

namespace Crux.Cloud.Engage
{
    public class EmailCmd : CloudCmd
    {
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string RecipientEmail { get; set; }
        public string Subject { get; set; }
        public string BodyText { get; set; }
        public string BodyHtml { get; set; }

        public override async Task Execute()
        {
            if (string.IsNullOrEmpty(SenderEmail))
            {
                SenderEmail = "mailer@lobsterfs.co.uk";
                SenderName = "Crux";
            }

            var from = new EmailAddress(SenderEmail, SenderName);
            var to = new EmailAddress(RecipientEmail);
            var email = MailHelper.CreateSingleEmail(from, to, Subject, BodyText, BodyHtml);
            var mailClient = new SendGridClient(Settings.Value.SendGridMailKey, Settings.Value.SendGridEndpoint);

            var response = await mailClient.SendEmailAsync(email);

            if (response.StatusCode == HttpStatusCode.Created || response.StatusCode == HttpStatusCode.OK ||
                response.StatusCode == HttpStatusCode.Accepted)
            {
                Result = ActionConfirm.CreateSuccess(response.StatusCode);
            }
            else
            {
                Result = ActionConfirm.CreateFailure(response.StatusCode.ToString());
            }
        }
    }
}