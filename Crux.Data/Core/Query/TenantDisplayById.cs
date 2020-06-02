using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Data.Core.Results;
using Crux.Data.Core.Projections;
using Raven.Client.Documents;

namespace Crux.Data.Core.Query
{
    public class TenantDisplayById : Display<TenantDisplay>
    {
        public override async Task Execute()
        {
            var tenantQuery = TenantStatProjection
                .Transform(Session.Query<TenantStat, TenantStatIndex>().Where(c => c.Id == Id)).Take(1).LazilyAsync();
            var favQuery = Session.Query<FavMaster, FavFanIndex>().Where(c => c.Id == Id).CountLazilyAsync();

            var tenantResult = await tenantQuery.Value;
            var favResult = await favQuery.Value;

            Result = tenantResult.FirstOrDefault();
            Result.Favourite = favResult > 0;
        }
    }
}