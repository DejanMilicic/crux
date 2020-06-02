namespace Crux.Test.TestData.External
{
    using Core;
    using Endpoint.ViewModel.External;
    using Model.Utility;

    public static class LoginData
    {
        public static SignupViewModel GetSignup()
        {
            return new SignupViewModel
            {
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                Email = "signup@test.com",
                Pwd = "simple",
                Name = "test signup"
            };
        }

        public static LoginViewModel GetLogin()
        {
            return new LoginViewModel
            {
                Email = "signup@test.com",
                Pwd = "simple",
                RememberMe = true
            };
        }
        
        public static AuthViewModel GetAuth()
        {
            return new AuthViewModel
            {
                Id = UserData.FirstId,
                Success = true,
                Message = string.Empty,
                Verification = "xxx111key",
                Key = EncryptHelper.Encrypt(UserData.FirstId + Keys.Salty),
                Config = UserConfigData.GetFirst(),
            };
        }

        public static TwoFactorViewModel GetTwoFactor()
        {
            return new TwoFactorViewModel()
            {
                Id = UserData.FirstId,
                Auth = "123456"
            };
        }


        public static ReconnectViewModel GetReconnect()
        {
            return new ReconnectViewModel
            {
                Id = UserData.FirstId,
                Key = EncryptHelper.Encrypt(UserData.FirstId + Keys.Salty)
            };
        }
    }
}