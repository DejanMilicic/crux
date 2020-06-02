using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Model.Core;
using Raven.Client;
using Raven.Client.Documents.Operations;
using Raven.Client.Documents.Queries;

namespace Crux.Data.Core.Persist
{
    public class TenantSave : Persist<Tenant>
    {
        public string Original { get; set; }

        public override async Task Execute()
        {
            await base.Execute();

            if (!string.IsNullOrEmpty(Model.Id) && Original != Model.Name)
            {
                var tenantQuery = new IndexQuery
                {
                    Query =
                        @"from index 'OwnedMasterIndex' as entity 
                        where entity.TenantId = $tenantId 
                        update { entity.TenantName =  $tenantName }",
                    QueryParameters = new Parameters
                    {
                        {"tenantId", Model.Id},
                        {"tenantName", Model.Name}
                    }
                };

                await Session.Advanced.DocumentStore.Operations.SendAsync(
                    new PatchByQueryOperation(tenantQuery, new QueryOperationOptions() {AllowStale = true}));
            }
        }
    }
}