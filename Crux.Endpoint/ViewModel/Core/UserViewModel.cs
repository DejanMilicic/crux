using Crux.Endpoint.ViewModel.Base;
using Crux.Model.Core;

namespace Crux.Endpoint.ViewModel.Core
{
    public class UserViewModel : OwnedViewModel
    {
        public string Email { get; set; }
        public string ProfileId { get; set; }
        public string ProfileThumbUrl { get; set; }
        public string Password { get; set; }
        public string Phone { get; set; }
        public UserRight Right { get; set; }
    }
}