using Crux.Data.Base.Results;

namespace Crux.Data.Core.Results
{
    public class VisibleMaster : ResultOwned
    {
        public string UrlKey { get; set; } = string.Empty;
        public string ThumbKey { get; set; } = string.Empty;
        public string ContentType { get; set; } = string.Empty;
        public virtual bool IsImage { get; set; } = false;
        public virtual bool IsVideo { get; set; } = false;
        public virtual bool IsDocument { get; set; } = false;
    }
}