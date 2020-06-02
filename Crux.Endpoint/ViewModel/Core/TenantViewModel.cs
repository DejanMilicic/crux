using Crux.Endpoint.ViewModel.Base;

namespace Crux.Endpoint.ViewModel.Core
{
    public class TenantViewModel : NamedViewModel
    {
        public string ProfileId { get; set; }
        public string ProfileThumbUrl { get; set; }
    }
}