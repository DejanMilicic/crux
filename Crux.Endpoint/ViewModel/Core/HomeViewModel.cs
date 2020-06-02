using Crux.Data.Interact.Result;
using System.Collections.Generic;

namespace Crux.Endpoint.ViewModel.Core
{
    public class HomeViewModel
    {
        public IEnumerable<DayViewModel<AttendanceDisplay>> Attendance { get; set; }
        public IEnumerable<MsgDisplay> Msg { get; set; }
        public bool Success { get; set; } = false;
    }
}