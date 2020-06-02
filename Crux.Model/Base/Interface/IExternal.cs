namespace Crux.Model.Base.Interface
{
    public interface IExternal : IEntityOwned
    {
        string ExternalKey { get; set; }
    }
}