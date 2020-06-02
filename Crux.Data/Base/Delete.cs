using System.Threading.Tasks;
using Crux.Model.Base.Interface;

namespace Crux.Data.Base
{
    public class Delete<T> : DataCommand<T> where T : IEntity
    {
        public string Id { get; set; }
        public bool Result { get; set; }

        public override async Task Execute()
        {
            var deleted = await Session.LoadAsync<T>(Id);
            Session.Delete(deleted);
            Result = true;
        }
    }
}