using Crux.Data.Base.Filters;

namespace Crux.Data.Interact.Filters
{
    public class MeetingTypeFilter : PagedFilter
    {
        public bool RecurRestrict { get; set; } = false;
    }
}