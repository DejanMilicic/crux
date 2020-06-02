using System.Collections.Generic;
using Crux.Data.Base.Results;

namespace Crux.Data.Core.Results
{
    public class NotesMaster : ResultOwned
    {
        public IEnumerable<string> Authors { get; set; }
    }
}