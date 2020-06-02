using Crux.Model.Base;

namespace Crux.Model.Core
{
    public class ImageFile : VisibleFile
    {
        public override bool IsImage { get; set; } = true;
    }
}