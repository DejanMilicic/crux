using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace Crux.Data.Interact.Query
{
    public class MeetingTypeRefByFilter : OwnedQuery<ResultOwned, MeetingTypeMaster>
    {
        public MeetingTypeFilter Filter { get; set; }

        public override async Task Execute()
        {
            var query = Session.Query<MeetingTypeMaster, MeetingTypeIndex>()
                .Statistics(out QueryStatistics stats)
                .OrderByDescending(a => a.DateModified);

            if (Filter.RecurRestrict)
            {
                query = query.Where(u => u.IsRecur);
            }

            query = await Init(query, Filter, "meetingType");
            Result = await query.ToListAsync();
            Process(Filter, stats);
        }
    }
}