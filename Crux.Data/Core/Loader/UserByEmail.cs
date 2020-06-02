using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Model.Core;
using Raven.Client.Documents;

namespace Crux.Data.Core.Loader
{
    public class UserByEmail : Single<User>
    {
        public string Email { get; set; }
        public UserConfig ResultConfig { get; set; }
        public Tenant ResultTenant { get; set; }

        public override async Task Execute()
        {
            Result = await Session.Query<User, UserIndex>().Include(c => c.ConfigId).Include(c => c.TenantId)
                .FirstOrDefaultAsync(u => u.Email == Email);

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