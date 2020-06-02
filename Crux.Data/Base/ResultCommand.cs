using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Base.Results;
using Raven.Client.Documents.Session;

namespace Crux.Data.Base
{
    public abstract class ResultCommand<T> : IDataCommand where T : Result
    {
        public IAsyncDocumentSession Session { get; set; }
        public abstract Task Execute();
    }
}