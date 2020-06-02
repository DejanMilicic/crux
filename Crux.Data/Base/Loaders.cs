using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Model.Base.Interface;

namespace Crux.Data.Base
{
    public class Loaders<T> : DataCommand<T> where T : IEntity
    {
        public IList<string> Ids { get; set; }
        public IEnumerable<T> Result { get; set; }

        public override async Task Execute()
        {
            var task = await Session.LoadAsync<T>(Ids);
            Result = task.Values.ToList();
        }
    }
}