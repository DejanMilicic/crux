using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Filters;
using Crux.Data.Core.Index;
using Crux.Data.Core.Results;
using Crux.Data.Core.Projections;
using Crux.Model.Base;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace Crux.Data.Core.Query
{
    public class VisibleDisplayByFilter : OwnedQuery<VisibleDisplay, VisibleMaster>
    {
        public VisibleFilter Filter { get; set; }

        public override async Task Execute()
        {
            var query = Session.Query<VisibleMaster, VisibleIndex>()
                .Statistics(out QueryStatistics stats)
                .Take(Filter.Take)
                .Skip(Filter.Skip * Filter.Take)
                .OrderByDescending(a => a.DateModified);

            if (Filter.ImageRestrict)
            {
                query = query.Where(v => v.IsImage);
            }

            if (Filter.VideoRestrict)
            {
                query = query.Where(v => v.IsVideo);
            }

            if (Filter.DocumentRestrict)
            {
                query = query.Where(v => v.IsDocument);
            }

            query = await Init(query, Filter, "visible");
            Result = await VisibleDisplayProjection.Transform(query.OfType<VisibleFile>()).ToListAsync();
            Process(Filter, stats);
        }
    }
}