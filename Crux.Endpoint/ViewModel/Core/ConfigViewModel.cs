using Crux.Model.Core;

namespace Crux.Endpoint.ViewModel.Core
{
    public class ConfigViewModel
    {
        public bool Success { get; set; } = false;
        public string Key { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        public UserConfig Config { get; set; } = new UserConfig();
    }
}