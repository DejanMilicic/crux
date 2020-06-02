using System.Linq;
using Crux.Data.Base.Results;
using Crux.Model.Base;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Base.Index
{
    public class OwnedMasterIndex : AbstractMultiMapIndexCreationTask<ResultOwned>
    {
        public OwnedMasterIndex()
        {
            AddMapForAll<EntityOwned>(owns => from own in owns
                select new
                {
                    own.Id,
                    own.TenantId,
                    own.AuthorId,
                    own.RegionKey
                });

            Priority = IndexPriority.Low;
        }
    }
}