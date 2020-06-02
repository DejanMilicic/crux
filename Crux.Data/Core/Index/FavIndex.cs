using System.Linq;
using Crux.Model.Core;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class FavIndex : AbstractIndexCreationTask<Fav>
    {
        public FavIndex()
        {
            Map = favs => from fav in favs
                select new
                {
                    fav.Id,
                    fav.FilterKey,
                    fav.UserId
                };

            Priority = IndexPriority.Low;
        }
    }
}