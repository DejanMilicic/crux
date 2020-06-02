using Crux.Data.Base.Results;

namespace Crux.Data.Core.Results
{
    public class TenantStat : ResultOwned
    {
        public int FileCount { get; set; } = 0;
        public long FileSize { get; set; } = 0;
        public int UserCount { get; set; } = 0;
    }
}