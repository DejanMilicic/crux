using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Crux.Model.Interact;
using Raven.Client.Documents;

namespace Crux.Data.Interact.Query
{
    public class MeetingTypeDisplayById : Display<MeetingTypeDisplay>
    {
        public override async Task Execute()
        {
            Result = await MeetingTypeDisplayTrans
                .Transform(Session.Query<MeetingType, MeetingTypeIndex>().Where(c => c.Id == Id)).FirstOrDefaultAsync();
        }
    }
}