namespace Crux.Endpoint.ViewModel.Base
{
    public class OwnedViewModel : NamedViewModel
    {
        public string TenantId { get; set; } = string.Empty;
    }
}