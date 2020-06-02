using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Model.Core;

namespace Crux.Data.Core.Loader
{
    public class UserById : Loader<User>
    {
        public UserConfig ResultConfig { get; set; }
        public Tenant ResultTenant { get; set; }

        public override async Task Execute()
        {
            Result = await Session.Include<User>(u => u.ConfigId).Include<User>(u => u.TenantId).LoadAsync<User>(Id);

            if (Result != null && !string.IsNullOrEmpty(Result.ConfigId))
            {
                ResultConfig = await Session.LoadAsync<UserConfig>(Result.ConfigId);
            }

            if (Result != null && !string.IsNullOrEmpty(Result.TenantId))
            {
                ResultTenant = await Session.LoadAsync<Tenant>(Result.TenantId);
            }
        }
    }
}