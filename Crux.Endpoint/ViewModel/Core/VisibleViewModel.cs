using Crux.Endpoint.ViewModel.Base;

namespace Crux.Endpoint.ViewModel.Core
{
    public class VisibleViewModel : OwnedViewModel
    {
        public string ThumbUrl { get; set; }
        public string FullUrl { get; set; }
        public int Width { get; set; } = 0;
        public int Height { get; set; } = 0;
        public long Length { get; set; } = 0;
    }
}