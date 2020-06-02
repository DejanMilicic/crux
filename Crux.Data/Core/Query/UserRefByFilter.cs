using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Results;
using Crux.Data.Core.Filters;
using Crux.Data.Core.Results;
using Crux.Data.Core.Index;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;
using Crux.Data.Base.Projections;
using Crux.Model.Core;

namespace Crux.Data.Core.Query
{
    public class UserRefByFilter : OwnedQuery<ResultProfile, UserMaster>
    {
        public UserFilter Filter { get; set; }

        public override async Task Execute()
        {
            var query = Session.Query<UserMaster, UserIndex>()
                .Statistics(out QueryStatistics stats)
                .OrderByDescending(a => a.Name);

            if (Filter.AuthRestrict)
            {
                query = query.Where(u => u.CanAdmin);
            }

            query = await Init(query, Filter, "user");
            Result = await ResultProfileProjection.Transform(query.OfType<User>()).ToListAsync();
            Process(Filter, stats);
        }
    }
}