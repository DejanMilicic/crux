using Raven.Client.Documents.Session;

namespace Crux.Data.Base.Interface
{
    public interface IDataCommand : ICommand
    {
        IAsyncDocumentSession Session { get; set; }
    }
}