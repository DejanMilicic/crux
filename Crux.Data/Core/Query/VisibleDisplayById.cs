using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Data.Core.Results;
using Crux.Data.Core.Projections;
using Crux.Model.Base;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;

namespace Crux.Data.Core.Query
{
    public class VisibleDisplayById : Display<VisibleDisplay>
    {
        public override async Task Execute()
        {
            var visibleQuery = VisibleDisplayProjection
                .Transform(Session.Query<VisibleFile, VisibleIndex>().Where(c => c.Id == Id)).Take(1).LazilyAsync();
            var favQuery = Session.Query<FavMaster, FavFanIndex>().Where(c => c.Id == Id).CountLazilyAsync();

            var visibleResult = await visibleQuery.Value;
            var favResult = await favQuery.Value;

            Result = visibleResult.FirstOrDefault();
            Result.Favourite = favResult > 0;
        }
    }
}