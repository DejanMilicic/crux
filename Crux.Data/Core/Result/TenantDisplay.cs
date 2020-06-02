using Crux.Data.Base.Results;
using Crux.Model.Utility;

namespace Crux.Data.Core.Results
{
    public class TenantDisplay : ResultNamed
    {
        public bool? HasProfile { get; set; }
        public string ProfileId { get; set; }
        public string ProfileThumbUrl { get; set; }
        public long StorageLimit { get; set; }
        public int UserLimit { get; set; }
        public int FileCount { get; set; }
        public long FileSize { get; set; }
        public int UserCount { get; set; }

        public decimal FileMB
        {
            get { return EncryptHelper.ConvertMB(FileSize); }
        }

        public decimal LimitMB
        {
            get { return EncryptHelper.ConvertMB(StorageLimit); }
        }
    }
}