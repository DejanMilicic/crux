using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class FavFanIndex : AbstractIndexCreationTask<Fav, FavMaster>
    {
        public FavFanIndex()
        {
            Map = favs => from fav in favs
                from entityId in fav.EntityIds
                select new
                {
                    Id = entityId,
                    fav.UserId,
                    fav.FilterKey
                };

            Reduce = results => from result in results
                group result by new {result.Id, result.UserId, result.FilterKey}
                into g
                select new
                {
                    Id = g.Select(x => x.Id).First(x => x != null),
                    UserId = g.Select(x => x.UserId).First(x => x != null),
                    FilterKey = g.Select(x => x.FilterKey).First(x => x != null)
                };

            Priority = IndexPriority.Low;
        }
    }
}