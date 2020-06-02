namespace Crux.Model.Base.Interface
{
    public interface IEntityNamed : IEntity
    {
        string Name { get; set; }
        bool IsActive { get; set; }
    }
}