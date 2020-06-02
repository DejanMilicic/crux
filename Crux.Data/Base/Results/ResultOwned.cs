using Crux.Model.Base.Interface;

namespace Crux.Data.Base.Results
{
    public class ResultOwned : ResultNamed, IResultOwned
    {
        public string AuthorId { get; set; }
        public string AuthorName { get; set; }
        public string TenantId { get; set; }
        public string TenantName { get; set; }
        public string RegionKey { get; set; }
    }
}