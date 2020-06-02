namespace Crux.Model.Base
{
    public class VisibleFile : StoredFile
    {
        public string MimeType { get; set; } = string.Empty;
        public int Width { get; set; } = 0;
        public int Height { get; set; } = 0;
        public string ThumbUrl { get; set; } = string.Empty;
        public virtual bool IsImage { get; set; } = false;
        public virtual bool IsVideo { get; set; } = false;
        public virtual bool IsDocument { get; set; } = false;
    }
}