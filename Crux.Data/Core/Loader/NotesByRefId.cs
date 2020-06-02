using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Model.Core;
using Crux.Model.Core.Interface;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;

namespace Crux.Data.Core.Loader
{
    public class NotesByRefId : Loader<Notes>
    {
        public INotable ResultNotable { get; set; }

        public override async Task Execute()
        {
            var notesQuery = Session.Query<Notes, NoteIndex>().Where(u => u.RefId == Id).Take(1).LazilyAsync();
            var notableQuery = Session.Query<INotable, NotableIndex>().Where(c => c.Id == Id).Take(1).LazilyAsync();

            var notesResult = await notesQuery.Value;
            var notableResult = await notableQuery.Value;

            Result = notesResult.FirstOrDefault();
            ResultNotable = notableResult.FirstOrDefault();
        }
    }
}