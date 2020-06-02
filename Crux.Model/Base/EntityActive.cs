namespace Crux.Model.Base
{
    public abstract class EntityActive : Entity
    {
        public virtual bool IsActive { get; set; } = true;
    }
}