namespace Crux.Model.Base.Interface
{
    public interface IEntityOwned : IEntityNamed
    {
        string TenantId { get; set; }
        string TenantName { get; set; }
        string AuthorId { get; set; }
        string AuthorName { get; set; }
        string RegionKey { get; set; }
    }
}