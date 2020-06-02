using System.Collections.Generic;
using System.Threading.Tasks;
using Crux.Data.Base.Results;

namespace Crux.Data.Base
{
    public abstract class Query<T> : ResultCommand<T> where T : Result
    {
        public IEnumerable<T> Result { get; set; }
        public abstract override Task Execute();
    }
}