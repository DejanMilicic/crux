using Crux.Data.Base.Results;

namespace Crux.Data.Core.Results
{
    public class FavMaster : ResultWithId
    {
        public string UserId { get; set; }
        public string FilterKey { get; set; }
    }
}