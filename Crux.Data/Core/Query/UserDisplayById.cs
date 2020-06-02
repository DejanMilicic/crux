using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Data.Core.Results;
using Crux.Data.Core.Projections;
using Raven.Client.Documents;

namespace Crux.Data.Core.Query
{
    public class UserDisplayById : Display<UserDisplay>
    {
        public override async Task Execute()
        {
            var userQuery = UserDisplayProjection
                .Transform(Session.Query<UserMaster, UserIndex>().Where(c => c.Id == Id)).Take(1).LazilyAsync();
            var favQuery = Session.Query<FavMaster, FavFanIndex>().Where(c => c.Id == Id).CountLazilyAsync();

            var userResult = await userQuery.Value;
            var favResult = await favQuery.Value;

            Result = userResult.FirstOrDefault();
            Result.Favourite = favResult > 0;
        }
    }
}