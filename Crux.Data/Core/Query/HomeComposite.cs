using System;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Crux.Model.Core;
using Crux.Model.Utility;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;

namespace Crux.Data.Core.Query
{
    public class HomeComposite : Display<HomeDisplay>
    {
        public int Forward { get; set; }
        public User CurrentUser { get; set; }

        public override async Task Execute()
        {
            Result = new HomeDisplay() {Name = CurrentUser.Name, Id = CurrentUser.Id};

            var attendanceQuery = Session.Query<AttendanceMaster, AttendanceIndex>()
                .ProjectInto<AttendanceMaster>()
                .Take(128)
                .Skip(0)
                .Where(a => a.When > DateHelper.FormatDayStart(DateTime.UtcNow) &&
                            a.When < DateHelper.FormatDayEnd(DateTime.UtcNow.AddDays(Forward)) &&
                            a.UserId == CurrentUser.Id && a.TenantId == CurrentUser.TenantId)
                .OrderByDescending(a => a.DateModified);

            var attendanceResult = AttendanceDisplayProjection.Transform(attendanceQuery).LazilyAsync();

            var msgQuery = Session.Query<MsgMaster, MsgIndex>()
                .ProjectInto<MsgMaster>()
                .Take(5)
                .Skip(0)
                .Where(m => m.Recipients.Contains(CurrentUser.Id) && m.TenantId == CurrentUser.TenantId)
                .OrderByDescending(a => a.DateModified);

            var msgResult = MsgDisplayTrans.Transform(msgQuery).LazilyAsync();

            Result.Attendances = await attendanceResult.Value;
            Result.Msgs = await msgResult.Value;
        }
    }
}