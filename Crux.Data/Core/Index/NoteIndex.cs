using System.Linq;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class NoteIndex : AbstractIndexCreationTask<Notes, NotesMaster>
    {
        public NoteIndex()
        {
            Map = notes => from note in notes
                select new
                {
                    note.Id,
                    note.RefId,
                    note.Name,
                    note.TenantId,
                    note.AuthorId,
                    note.RegionKey,
                    note.IsActive,
                    note.DateCreated,
                    note.DateModified,
                    Authors = note.History.Where(h => h.IsActive).Select(h => h.AuthorId),
                    Searchable = note.History.Where(h => h.IsActive).Select(h => h.Text)
                };

            Indexes.Add(x => x.Searchable, FieldIndexing.Search);
            Priority = IndexPriority.Normal;
        }
    }
}