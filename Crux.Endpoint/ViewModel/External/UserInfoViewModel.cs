namespace Crux.Endpoint.ViewModel.External
{
    public class UserInfoViewModel
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool HasProfile { get; set; } = false;
        public string ProfileThumbUrl { get; set; } = string.Empty;
        public bool HasPhone { get; set; } = false;
        public string TenantId { get; set; } = string.Empty;
        public string TenantName { get; set; } = string.Empty;
        public bool ClientHasProfile { get; set; } = false;
        public string ClientProfileThumbUrl { get; set; } = string.Empty;
    }
}