namespace Crux.Test.TestData.External
{
    using Core;
    using Endpoint.ViewModel.External;

    public static class SignupData
    {
        public static EntryKeyViewModel GetEntry()
        {
            return new EntryKeyViewModel
            {
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                EntryKey = "ABC"
            };
        }
        public static SignupViewModel GetSignup()
        {
            return new SignupViewModel
            {
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                Name = "Test",
                Pwd = "Pwd",
                Email = "test@test.com"
            };
        }

    }
}