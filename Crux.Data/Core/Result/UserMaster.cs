using Crux.Data.Base.Results;

namespace Crux.Data.Core.Results
{
    public class UserMaster : ResultOwned
    {
        public string ConfigId { get; set; }
        public string Email { get; set; }
        public bool HasProfile { get; set; }
        public string ProfileId { get; set; }
        public string ProfileThumbUrl { get; set; }
        public bool HasPhone { get; set; }
        public bool CanAuth { get; set; }
        public bool CanAdmin { get; set; }
        public bool CanSuperuser { get; set; }
    }
}