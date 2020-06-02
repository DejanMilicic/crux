using Crux.Model.Base;
using Crux.Model.Core.Interface;

namespace Crux.Model.Core
{
    public class User : EntityProfile, INotable
    {
        public string ConfigId { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string EncryptedPwd { get; set; } = string.Empty;
        public string EncryptedPhone { get; set; } = string.Empty;
        public UserRight Right { get; set; } = new UserRight();
        public string NotesId { get; set; } = string.Empty;
    }
}