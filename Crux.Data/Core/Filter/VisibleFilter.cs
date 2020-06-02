using Crux.Data.Base.Filters;

namespace Crux.Data.Core.Filters
{
    public class VisibleFilter : PagedFilter
    {
        public bool ImageRestrict { get; set; } = false;
        public bool VideoRestrict { get; set; } = false;
        public bool DocumentRestrict { get; set; } = false;
    }
}