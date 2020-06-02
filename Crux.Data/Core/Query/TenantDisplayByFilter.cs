using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Filters;
using Crux.Data.Core.Index;
using Crux.Data.Core.Results;
using Crux.Data.Core.Projections;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace Crux.Data.Core.Query
{
    public class TenantDisplayByFilter : NamedQuery<TenantDisplay, TenantStat>
    {
        public TenantFilter Filter { get; set; }

        public override async Task Execute()
        {
            var query = Session.Query<TenantStat, TenantStatIndex>()
                .ProjectInto<TenantStat>()
                .Statistics(out QueryStatistics stats)
                .Take(Filter.Take)
                .Skip(Filter.Skip * Filter.Take)
                .OrderBy(a => a.Name);

            if (Filter.AuthorKeys.Any())
            {
                query = query.Where(v => v.AuthorId.In(Filter.AuthorKeys));
            }

            query = await Init(query, Filter, "tenant");
            Result = await TenantStatProjection.Transform(query).ToListAsync();
            Process(Filter, stats);
        }
    }
}