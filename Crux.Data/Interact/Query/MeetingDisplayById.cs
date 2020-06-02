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
    public class MeetingDisplayById : Display<MeetingDisplay>
    {
        public override async Task Execute()
        {
            var meetingQuery = MeetingDisplayProjection
                .Transform(Session.Query<MeetingMaster, MeetingIndex>().Where(c => c.Id == Id)).Take(1).LazilyAsync();
            var favQuery = Session.Query<FavMaster, FavFanIndex>().Where(c => c.Id == Id).CountLazilyAsync();

            var meetingResult = await meetingQuery.Value;
            var favResult = await favQuery.Value;

            Result = meetingResult.FirstOrDefault();
            Result.Favourite = favResult > 0;
        }
    }
}