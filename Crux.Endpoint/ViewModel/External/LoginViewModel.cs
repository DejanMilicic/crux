namespace Crux.Endpoint.ViewModel.External
{
    public class LoginViewModel
    {
        public string Email { get; set; } = string.Empty;
        public string Pwd { get; set; } = string.Empty;
        public bool RememberMe { get; set; } = false;
    }
}