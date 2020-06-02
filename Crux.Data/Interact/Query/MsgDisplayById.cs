using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Data.Core.Results;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Raven.Client.Documents;

namespace Crux.Data.Interact.Query
{
    public class MsgDisplayById : Display<MsgDisplay>
    {
        public override async Task Execute()
        {
            var msgQuery = MsgDisplayTrans.Transform(Session.Query<MsgMaster, MsgIndex>().Where(c => c.Id == Id))
                .Take(1).LazilyAsync();
            var favQuery = Session.Query<FavMaster, FavFanIndex>().Where(c => c.Id == Id).Take(1).CountLazilyAsync();

            var msgResult = await msgQuery.Value;
            var favResult = await favQuery.Value;

            Result = msgResult.FirstOrDefault();
            Result.Favourite = favResult > 0;
        }
    }
}