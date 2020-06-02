namespace Crux.Model.Base.Interface
{
    public interface IResultNamed : IResult
    {
        string Name { get; set; }
        bool? IsActive { get; set; }
    }
}