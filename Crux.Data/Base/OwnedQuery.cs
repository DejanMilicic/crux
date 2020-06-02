using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base.Filters;
using Crux.Data.Base.Results;
using Raven.Client.Documents.Linq;

namespace Crux.Data.Base
{
    public abstract class OwnedQuery<T, M> : NamedQuery<T, M> where T : ResultOwned where M : ResultOwned
    {
        public override async Task<IRavenQueryable<M>> Init(IRavenQueryable<M> query, PagedFilter filter, string favKey)
        {
            if (filter.TenantRestrict)
            {
                query = query.Where(c => c.TenantId == CurrentUser.TenantId);
            }

            if (filter.AuthorKeys.Any())
            {
                query = query.Where(v => v.AuthorId.In(filter.AuthorKeys));
            }

            return await base.Init(query, filter, favKey);
        }
    }
}