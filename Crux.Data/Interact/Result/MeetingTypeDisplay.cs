using Crux.Data.Base.Results;

namespace Crux.Data.Interact.Result
{
    public class MeetingTypeDisplay : ResultOwned
    {
        public string Prename { get; set; } = string.Empty;
        public string Pretext { get; set; } = string.Empty;
        public bool IsRecur { get; set; }
        public int DaysWhen { get; set; } = 0;
    }
}