namespace Crux.Model.Base.Interface
{
    public interface IResultOwned : IResultNamed
    {
        string TenantId { get; set; }
        string TenantName { get; set; }
        string AuthorId { get; set; }
        string AuthorName { get; set; }
        string RegionKey { get; set; }
    }
}