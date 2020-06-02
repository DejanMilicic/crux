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
    public class UserDisplayByFilter : OwnedQuery<UserDisplay, UserMaster>
    {
        public UserFilter Filter { get; set; }

        public override async Task Execute()
        {
            var query = Session.Query<UserMaster, UserIndex>()
                .ProjectInto<UserMaster>()
                .Statistics(out QueryStatistics stats)
                .Take(Filter.Take)
                .Skip(Filter.Skip * Filter.Take)
                .OrderBy(a => a.Name);

            if (Filter.AuthRestrict)
            {
                query = query.Where(u => u.CanAdmin);
            }

            query = await Init(query, Filter, "user");
            Result = await UserDisplayProjection.Transform(query).ToListAsync();
            Process(Filter, stats);
        }
    }
}