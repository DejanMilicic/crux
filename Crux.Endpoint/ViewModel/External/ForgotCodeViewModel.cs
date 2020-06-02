namespace Crux.Endpoint.ViewModel.External
{
    public class ForgotCodeViewModel
    {
        public string Email { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool Success { get; set; } = false;
    }
}