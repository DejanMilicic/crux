using System.Collections.Generic;
using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Base;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class VisibleIndex : AbstractMultiMapIndexCreationTask<VisibleMaster>
    {
        public VisibleIndex()
        {
            AddMapForAll<VisibleFile>(visibles => from visible in visibles
                where visible.IsActive
                select new
                {
                    visible.Id,
                    visible.Name,
                    visible.TenantId,
                    visible.AuthorId,
                    visible.IsActive,
                    visible.DateCreated,
                    visible.DateModified,
                    visible.UrlKey,
                    visible.ThumbKey,
                    visible.IsImage,
                    visible.IsVideo,
                    visible.IsDocument,
                    Searchable = new List<string> {visible.Name, visible.TenantName, visible.AuthorName}
                });

            Indexes.Add(x => x.Searchable, FieldIndexing.Search);
            Priority = IndexPriority.Normal;
        }
    }
}