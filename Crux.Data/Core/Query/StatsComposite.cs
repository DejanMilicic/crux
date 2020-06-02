using System;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Data.Core.Results;
using Crux.Data.Core.Projections;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Crux.Model.Core;
using Crux.Model.Utility;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;

namespace Crux.Data.Core.Query
{
    public class StatsComposite : Display<StatsDisplay>
    {
        public int Back { get; set; }
        public User CurrentUser { get; set; }

        public override async Task Execute()
        {
            Result = new StatsDisplay() { Name = CurrentUser.TenantName, Id = CurrentUser.TenantId };

            var meetingQuery = Session.Query<MeetingMaster, MeetingIndex>()
                .ProjectInto<MeetingMaster>()
                .Take(128)
                .Skip(0)
                .Where(a => a.When > DateHelper.FormatDayStart(DateTime.UtcNow.AddDays(-Back)) &&
                            a.When < DateHelper.FormatDayEnd(DateTime.UtcNow) && a.TenantId == CurrentUser.TenantId)
                .OrderByDescending(a => a.DateModified);

            var meetingResult = MeetingDisplayProjection.Transform(meetingQuery).LazilyAsync();

            var msgQuery = Session.Query<MsgMaster, MsgIndex>()
                .ProjectInto<MsgMaster>()
                .Take(5)
                .Skip(0)
                .Where(m => m.DateCreated > DateHelper.FormatDayStart(DateTime.UtcNow.AddDays(-Back)) &&
                                                                      m.TenantId == CurrentUser.TenantId)
                .OrderByDescending(a => a.DateModified);

            var msgResult = MsgDisplayTrans.Transform(msgQuery).LazilyAsync();

            var tenantQuery = TenantStatProjection
                .Transform(Session.Query<TenantStat, TenantStatIndex>().Where(c => c.Id == CurrentUser.TenantId))
                .Take(1).LazilyAsync();

            var tenantResult = await tenantQuery.Value;
            Result.Meetings = await meetingResult.Value;
            Result.Msgs = await msgResult.Value;
            Result.Tenant = tenantResult.FirstOrDefault();
        }
    }
}