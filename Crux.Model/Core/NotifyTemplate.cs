using Crux.Model.Base;

namespace Crux.Model.Core
{
    public class NotifyTemplate : EntityNamed
    {
        public string EmailTitle { get; set; }
        public string EmailSubject { get; set; }
        public string EmailText { get; set; }
        public string EmailHtml { get; set; }
        public string PushAction { get; set; }
        public string PushTitle { get; set; }
        public string PushMessage { get; set; }
        public string SmsMessage { get; set; }
    }
}