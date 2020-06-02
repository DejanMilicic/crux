using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base.Filters;
using Crux.Data.Base.Results;
using Crux.Data.Core.Index;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace Crux.Data.Base
{
    public abstract class NamedQuery<T, M> : Query<T> where T : ResultNamed where M : ResultNamed
    {
        public User CurrentUser { get; set; }
        public Paging Paging { get; } = new Paging();
        public int Favourites { get; set; }
        private IList<FavMaster> Favs { get; set; } = new List<FavMaster>();
        public abstract override Task Execute();

        public virtual async Task<IRavenQueryable<M>> Init(IRavenQueryable<M> query, PagedFilter filter, string favKey)
        {
            Favs = await Session.Query<FavMaster, FavFanIndex>()
                .Where(c => c.UserId == CurrentUser.Id && c.FilterKey == favKey).ToListAsync();

            if (filter.FavouriteRestrict) query = query.Where(c => c.Id.In(Favs.Select(f => f.Id)));

            if (!string.IsNullOrEmpty(filter.Search))
                query = query.Search(c => c.Searchable, $"*{filter.Search}*", options: SearchOptions.And);

            return query;
        }

        public void Process(PagedFilter filter, QueryStatistics stats)
        {
            Paging.Total = stats.TotalResults;
            Paging.Intervals = Paging.Total / filter.Take;

            if (Paging.Intervals * filter.Take == Paging.Total) Paging.Intervals--;

            Paging.Loadable = filter.Skip < Paging.Intervals;

            var favourites = 0;

            if (!filter.FavouriteRestrict)
                foreach (var item in Result)
                {
                    if (Favs.Any(f => f.Id == item.Id))
                    {
                        item.Favourite = true;
                        favourites++;
                    }

                    item.Searchable = new List<string>();
                }
            else
                foreach (var item in Result)
                {
                    item.Favourite = true;
                    item.Searchable = new List<string>();
                    favourites++;
                }

            Favourites = favourites;
            Paging.Skip = filter.Skip;
        }
    }
}