using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class TenantIndex : AbstractIndexCreationTask<Tenant, TenantMaster>
    {
        public TenantIndex()
        {
            Map = tenants => from tenant in tenants
                where tenant.IsActive
                select new
                {
                    tenant.Id,
                    tenant.RegionKey,
                    tenant.IsActive,
                    tenant.DateCreated,
                    tenant.DateModified,
                    tenant.EntryKey
                };

            StoreAllFields(FieldStorage.No);
            Priority = IndexPriority.High;
        }
    }
}