using Crux.Model.Base;
using Crux.Model.Core.Interface;

namespace Crux.Endpoint.ViewModel.Core
{
    public class ConfirmViewModel
    {
        private ConfirmViewModel()
        {
        }

        public bool Success { get; private set; }
        public string Message { get; set; }
        public string Identity { get; set; }

        public static ConfirmViewModel Create(bool success, string identity)
        {
            return new ConfirmViewModel {Identity = identity, Success = success};
        }

        public static ConfirmViewModel CreateSuccess(string identity)
        {
            return new ConfirmViewModel {Identity = identity, Success = true};
        }

        public static ConfirmViewModel CreateSuccess(Entity model)
        {
            return new ConfirmViewModel {Identity = model.Id, Success = true};
        }

        public static ConfirmViewModel CreateFailure(string message)
        {
            return new ConfirmViewModel {Message = message, Success = false};
        }

        public static ConfirmViewModel CreateFromConfirm(IConfirm confirm)
        {
            return new ConfirmViewModel {Identity = confirm.Identity, Success = confirm.Success};
        }
    }
}