namespace Crux.Model.Base.Interface
{
    public interface IEntityProfile : IEntityOwned
    {
        bool HasProfile { get; set; }
        string ProfileId { get; set; }
        string ProfileThumbUrl { get; set; }
    }
}