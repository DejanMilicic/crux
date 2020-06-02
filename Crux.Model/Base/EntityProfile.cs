using Crux.Model.Base.Interface;

namespace Crux.Model.Base
{
    public abstract class EntityProfile : EntityOwned, IEntityProfile
    {
        public bool HasProfile { get; set; } = false;
        public string ProfileId { get; set; } = string.Empty;
        public string ProfileThumbUrl { get; set; } = string.Empty;
    }
}