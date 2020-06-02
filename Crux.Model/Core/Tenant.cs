using Crux.Model.Base;
using Crux.Model.Base.Interface;

namespace Crux.Model.Core
{
    public class Tenant : EntityNamed, IEntityProfile
    {
        public string EntryKey { get; set; } = string.Empty;
        public bool HasProfile { get; set; } = false;
        public string ProfileId { get; set; } = string.Empty;
        public string ProfileThumbUrl { get; set; } = string.Empty;
        public long StorageLimit { get; set; } = 20000000;
        public int UserLimit { get; set; } = 50;
        public string RegionKey { get; set; } = "GLA";
        public string AuthorId { get; set; } = string.Empty;
        public virtual string AuthorName { get; set; } = string.Empty;

        public string TenantId
        {
            get { return Id; }
            set { Id = value; }
        }

        public string TenantName
        {
            get { return Name; }
            set { Name = value; }
        }
    }
}