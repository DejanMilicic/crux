using Crux.Endpoint.ViewModel.Base;

namespace Crux.Endpoint.ViewModel.Interact
{
    public class MeetingTypeViewModel : OwnedViewModel
    {
        public string Prename { get; set; }
        public string Pretext { get; set; }
        public int DaysWhen { get; set; }
        public bool IsRecur { get; set; }
    }
}