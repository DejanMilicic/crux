using Crux.Model.Core;

namespace Crux.Endpoint.ViewModel.Core
{
    public class CurrentViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string TenantId { get; set; } = string.Empty;
        public long StorageLimit { get; set; } = 0;
        public int FileCount { get; set; } = 0;
        public long FileSize { get; set; } = 0;
        public int UserLimit { get; set; } = 0;
        public int UserCount { get; set; } = 0;
        public UserConfig Config { get; set; } = new UserConfig();
        public UserRight Right { get; set; } = new UserRight();
    }
}