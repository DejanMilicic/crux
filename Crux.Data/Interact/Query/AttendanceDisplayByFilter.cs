using System;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace Crux.Data.Interact.Query
{
    public class AttendanceDisplayByFilter : OwnedQuery<AttendanceDisplay, AttendanceMaster>
    {
        public AttendanceFilter Filter { get; set; }

        public override async Task Execute()
        {
            var query = Session.Query<AttendanceMaster, AttendanceIndex>()
                .ProjectInto<AttendanceMaster>()
                .Statistics(out QueryStatistics stats)
                .Take(Filter.Take)
                .Skip(Filter.Skip * Filter.Take)
                .OrderByDescending(a => a.DateModified);

            if (Filter.DateFrom > DateTime.MinValue || Filter.DateTo > DateTime.MaxValue)
            {
                query = query.Where(v => v.When > Filter.DateFrom && v.When < Filter.DateTo);
            }

            if (Filter.ParticipantKeys.Any())
            {
                query = query.Where(v => v.UserId.In(Filter.ParticipantKeys));
            }

            query = await Init(query, Filter, "attendance");
            Result = await AttendanceDisplayProjection.Transform(query).ToListAsync();
            Process(Filter, stats);
        }
    }
}