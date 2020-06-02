using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Raven.Client.Documents;

namespace Crux.Data.Interact.Query
{
    public class AttendanceDisplayById : Display<AttendanceDisplay>
    {
        public override async Task Execute()
        {
            Result = await AttendanceDisplayProjection
                .Transform(Session.Query<AttendanceMaster, AttendanceIndex>().Where(c => c.Id == Id))
                .FirstOrDefaultAsync();
        }
    }
}