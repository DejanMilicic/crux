using Crux.Data.Base.Results;

namespace Crux.Data.Core.Results
{
    public class VisibleDisplay : ResultOwned
    {
        public int Width { get; set; }
        public int Height { get; set; }
        public long Length { get; set; }
        public string FullUrl { get; set; }
        public string ThumbUrl { get; set; }
        public string ContentType { get; set; }
        public bool IsImage { get; set; }
        public bool IsVideo { get; set; }
        public bool IsDocument { get; set; }
    }
}