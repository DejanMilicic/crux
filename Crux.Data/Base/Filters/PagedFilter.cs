using System.Collections.Generic;

namespace Crux.Data.Base.Filters
{
    public class PagedFilter
    {
        public string Search { get; set; } = string.Empty;
        public int Skip { get; set; } = 0;
        public int Take { get; set; } = 8;
        public int Start => Skip * Take;
        public IList<string> AuthorKeys { get; set; } = new List<string>();
        public bool TenantRestrict { get; set; } = false;
        public bool FavouriteRestrict { get; set; } = false;
    }
}