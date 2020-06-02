using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Model.Core;
using Raven.Client.Documents;

namespace Crux.Data.Core.Loader
{
    public class TenantByEntryKey : Single<Tenant>
    {
        public string EntryKey { get; set; }

        public override async Task Execute()
        {
            Result = await Session.Query<Tenant, TenantIndex>().FirstOrDefaultAsync(c => c.EntryKey == EntryKey);
        }
    }
}