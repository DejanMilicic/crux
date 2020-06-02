namespace Crux.Test.TestData.External
{
    using Core;
    using Endpoint.ViewModel.External;

    public static class ForgotData
    {
        public static ForgotViewModel GetStart()
        {
            return new ForgotViewModel
            {
                Email = UserData.GetFirst().Email,
            };
        }

        public static ForgotCodeViewModel GetCode()
        {
            return new ForgotCodeViewModel
            {
                Email = UserData.GetFirst().Email,
                Code = "ABCD",
                Success = true
            };
        }
        public static ForgotReplyViewModel GetReply()
        {
            return new ForgotReplyViewModel
            {
                Email = UserData.GetFirst().Email,
                Code = "ABCD",
                ResetAuth = "XYZ",
                Success = true
            };
        }
        
        public static ForgotResetViewModel GetReset()
        {
            return new ForgotResetViewModel
            {
                Email = UserData.GetFirst().Email,
                Code = "ABCD",
                ResetCode = "EFGH",
                ResetPassword = "Pwd",
                Success = true
            };
        }

    }
}