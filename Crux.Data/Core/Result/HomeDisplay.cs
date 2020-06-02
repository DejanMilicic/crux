using System.Collections.Generic;
using Crux.Data.Base.Results;

namespace Crux.Data.Interact.Result
{
    public class HomeDisplay : ResultNamed
    {
        public IEnumerable<AttendanceDisplay> Attendances { get; set; }
        public IEnumerable<MsgDisplay> Msgs { get; set; }
    }
}