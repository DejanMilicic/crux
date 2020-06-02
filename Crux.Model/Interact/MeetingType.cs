using Crux.Model.Base;

namespace Crux.Model.Interact
{
    public class MeetingType : EntityOwned
    {
        public string Prename { get; set; } = string.Empty;
        public string Pretext { get; set; } = string.Empty;
        public int DaysWhen { get; set; } = 7;
        public bool IsRecur { get; set; } = false;
    }
}