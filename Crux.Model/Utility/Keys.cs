namespace Crux.Model.Utility
{
    public class Keys
    {
        public string JwtKey { get; set; }
        public string RollbarAccessToken { get; set; }
        public string RollbarEnvironment { get; set; }
        public string OneSignalClientKey { get; set; }
        public string OneSignalAppId { get; set; }
        public string OneSignalEndpoint { get; set; }
        public string TwilioAccountSid { get; set; }
        public string TwilioAuthToken { get; set; }
        public string TwilioSenderPhone { get; set; }
        public string GiphyApiKey { get; set; }
        public string GiphyEndpoint { get; set; }
        public string SendGridMailKey { get; set; }
        public string SendGridEndpoint { get; set; }
        public string MediaRoot { get; set; }
        public string AzureAccountKey { get; set; }
        public string RavenThumbprint { get; set; }
        public string RavenDatabase { get; set; }
        public string[] RavenUrls { get; set; }
        public static string Salty { get; set; } = "h764fb!8&fvk6t5bv";
    }
}