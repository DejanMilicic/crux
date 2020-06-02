using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Model.Core;
using Raven.Client;
using Raven.Client.Documents.Operations;
using Raven.Client.Documents.Queries;

namespace Crux.Data.Core.Persist
{
    public class TenantDelete : Delete<Tenant>
    {
        public override async Task Execute()
        {
            var tenantQuery = new IndexQuery
            {
                Query =
                    @"from index 'OwnedMasterIndex' as entity 
                        where entity.TenantId = $tenantId",
                QueryParameters = new Parameters
                {
                    {"tenantId", Id}
                }
            };

            await Session.Advanced.DocumentStore.Operations.SendAsync(new DeleteByQueryOperation(tenantQuery,
                new QueryOperationOptions()
                {
                    AllowStale = true,
                    MaxOpsPerSecond = 1024
                }));
            await base.Execute();

            Result = true;
        }
    }
}