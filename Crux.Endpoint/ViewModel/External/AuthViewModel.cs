using Crux.Model.Core;

namespace Crux.Endpoint.ViewModel.External
{
    public class AuthViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Verification { get; set; } = string.Empty;
        public bool Success { get; set; } = false;
        public string Key { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public bool IsTwoFactor { get; set; } = false;
        public UserInfoViewModel User { get; set; } = new UserInfoViewModel();
        public UserConfig Config { get; set; } = new UserConfig();
        public UserRight Right { get; set; } = new UserRight();
    }
}