using Crux.Model.Base.Interface;

namespace Crux.Model.Base
{
    public abstract class EntityNamed : EntityActive, IEntityNamed
    {
        public virtual string Name { get; set; } = string.Empty;
    }
}