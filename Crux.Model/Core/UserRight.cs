namespace Crux.Model.Core
{
    public class UserRight
    {
        public bool CanSuperuser { get; set; }
        public bool CanAdmin { get; set; }
        public bool CanAuth { get; set; }
    }
}