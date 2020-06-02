using System.Linq;
using Crux.Data.Base.Results;
using Crux.Model.Core.Interface;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class NotableIndex : AbstractMultiMapIndexCreationTask<ResultOwned>
    {
        public NotableIndex()
        {
            AddMapForAll<INotable>(notables => from notable in notables
                where notable.IsActive
                select new
                {
                    notable.Id,
                    notable.TenantId,
                    notable.AuthorId,
                    notable.Name,
                    notable.RegionKey,
                    notable.IsActive,
                    notable.DateModified,
                    notable.DateCreated
                });

            Priority = IndexPriority.Low;
        }
    }
}