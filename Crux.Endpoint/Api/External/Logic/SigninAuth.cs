using System.Threading.Tasks;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.ViewModel.External;
using Crux.Model.Core;
using Crux.Model.Utility;
using Microsoft.Extensions.Options;

namespace Crux.Endpoint.Api.External.Logic
{
    public class SigninAuth : LogicCommand
    {
        public User Login { get; set; }
        public UserConfig Config { get; set; }
        public Tenant Tenant { get; set; }
        public IOptions<Keys> Settings { get; set; }
        public AuthViewModel Result { get; set; } = new AuthViewModel();

        public override async Task Execute()
        {
            var token = new WriteToken {UserId = Login.Id, JwtKey = Settings.Value.JwtKey};
            await LogicHandler.Execute(token);

            if (token.Result)
            {
                Result.Success = true;
                Result.Id = Login.Id;
                Result.Verification = token.Verification;
                Result.Config = Config;
                Result.Key = EncryptHelper.Encrypt(Login.Id + Keys.Salty);

                Result.User.Id = Login.Id;
                Result.User.Name = Login.Name;
                Result.User.Email = Login.Email;
                Result.User.HasProfile = Login.HasProfile;
                Result.User.HasPhone = !string.IsNullOrEmpty(Login.EncryptedPhone);
                Result.User.ProfileThumbUrl = Login.ProfileThumbUrl;
                Result.Right = Login.Right;
                Result.Success = true;

                if (Tenant != null)
                {
                    Result.User.TenantId = Tenant.Id;
                    Result.User.ClientHasProfile = Tenant.HasProfile;
                    Result.User.TenantName = Tenant.Name;
                    Result.User.ClientProfileThumbUrl = Tenant.ProfileThumbUrl;
                }
            }

            await Task.CompletedTask;
        }
    }
}