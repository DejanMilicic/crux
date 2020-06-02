using Crux.Endpoint.ViewModel.Base;

namespace Crux.Endpoint.ViewModel.Core
{
    public class NoteViewModel : EntityViewModel
    {
        public int Counter { get; set; } = 0;
        public string Text { get; set; }
        public bool IsPrivate { get; set; }
        public bool ForceNotify { get; set; } = false;
    }
}