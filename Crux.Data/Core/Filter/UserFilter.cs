using Crux.Data.Base.Filters;

namespace Crux.Data.Core.Filters
{
    public class UserFilter : PagedFilter
    {
        public bool AuthRestrict { get; set; } = false;
    }
}