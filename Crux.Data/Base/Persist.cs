using System;
using System.Threading.Tasks;
using Crux.Model.Base.Interface;
using Crux.Model.Core.Confirm;

namespace Crux.Data.Base
{
    public class Persist<T> : DataCommand<T> where T : IEntity
    {
        public ModelConfirm<T> Confirm { get; set; }
        public T Model { get; set; }

        public override async Task Execute()
        {
            try
            {
                Model.DateModified = DateTime.UtcNow;

                if (string.IsNullOrEmpty(Model.Id))
                {
                    Model.DateCreated = Model.DateModified;
                }

                await Session.StoreAsync(Model);
                Confirm = ModelConfirm<T>.CreateSuccess(Model);
            }
            catch (Exception error)
            {
                Confirm = ModelConfirm<T>.CreateFailure(error.Message);
            }
        }
    }
}