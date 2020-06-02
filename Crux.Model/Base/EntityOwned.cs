using Crux.Model.Base.Interface;

namespace Crux.Model.Base
{
    public abstract class EntityOwned : EntityNamed, IEntityOwned
    {
        public string TenantId { get; set; }
        public virtual string TenantName { get; set; } = string.Empty;
        public string AuthorId { get; set; }
        public virtual string AuthorName { get; set; } = string.Empty;
        public string RegionKey { get; set; } = string.Empty;
    }
}