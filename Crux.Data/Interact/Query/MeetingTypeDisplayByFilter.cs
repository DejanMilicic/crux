using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Crux.Model.Interact;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace Crux.Data.Interact.Query
{
    public class MeetingTypeDisplayByFilter : OwnedQuery<MeetingTypeDisplay, MeetingTypeMaster>
    {
        public MeetingTypeFilter Filter { get; set; }

        public override async Task Execute()
        {
            var query = Session.Query<MeetingTypeMaster, MeetingTypeIndex>()
                .Statistics(out QueryStatistics stats)
                .Take(Filter.Take)
                .Skip(Filter.Skip * Filter.Take)
                .OrderByDescending(a => a.DateModified);

            if (Filter.RecurRestrict)
            {
                query = query.Where(u => u.IsRecur);
            }

            query = await Init(query, Filter, "meetingType");
            Result = await MeetingTypeDisplayTrans.Transform(query.OfType<MeetingType>()).ToListAsync();
            Process(Filter, stats);
        }
    }
}