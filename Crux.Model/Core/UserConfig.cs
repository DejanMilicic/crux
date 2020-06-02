using Crux.Model.Base;

namespace Crux.Model.Core
{
    public class UserConfig : EntityOwned
    {
        public string UserId { get; set; } = string.Empty;
        public bool HasIntro { get; set; } = false;
        public string TemplateView { get; set; } = "table";
        public int Take { get; set; } = 10;
        public int ChatCounter { get; set; } = 0;
        public bool EmailNotify { get; set; } = true;
        public bool PushNotify { get; set; } = false;
        public bool SmsNotify { get; set; } = false;
        public int ForgotCounter { get; set; } = 0;
        public string ForgotCode { get; set; } = string.Empty;
        public string ResetCode { get; set; } = string.Empty;
        public string ResetAuth { get; set; } = string.Empty;
        public bool IsTwoFactor { get; set; } = false;
        public bool IsTwoFactorActive { get; set; } = false;
        public string TwoFactorAuth { get; set; } = string.Empty;
    }
}