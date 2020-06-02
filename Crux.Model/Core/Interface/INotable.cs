using Crux.Model.Base.Interface;

namespace Crux.Model.Core.Interface
{
    public interface INotable : IEntityOwned
    {
        string NotesId { get; set; }
    }
}