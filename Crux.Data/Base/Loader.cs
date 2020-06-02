using System.Threading.Tasks;
using Crux.Model.Base.Interface;

namespace Crux.Data.Base
{
    public class Loader<T> : Single<T> where T : IEntity
    {
        public string Id { get; set; }

        public override async Task Execute()
        {
            Result = await Session.LoadAsync<T>(Id);
        }
    }
}