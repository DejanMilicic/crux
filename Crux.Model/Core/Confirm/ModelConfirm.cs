using Crux.Model.Base.Interface;
using Crux.Model.Core.Interface;

namespace Crux.Model.Core.Confirm
{
    public class ModelConfirm<T> : IConfirm where T : IEntity
    {
        private ModelConfirm()
        {
        }

        public bool Success { get; protected set; }
        public string Message { get; set; }
        public T Model { get; set; }
        public string Identity { get; set; }

        public static ModelConfirm<T> CreateSuccess(T model)
        {
            return new ModelConfirm<T> { Identity = model.Id, Model = model, Success = true };
        }

        public static ModelConfirm<T> CreateFailure(string message)
        {
            return new ModelConfirm<T> { Message = message, Success = false };
        }
    }
}