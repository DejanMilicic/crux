namespace Crux.Endpoint.ViewModel.External
{
    public class ForgotResetViewModel : ForgotCodeViewModel
    {
        public string ResetCode { get; set; } = string.Empty;
        public string ResetPassword { get; set; } = string.Empty;
    }
}