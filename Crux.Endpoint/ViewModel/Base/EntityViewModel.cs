using System;

namespace Crux.Endpoint.ViewModel.Base
{
    [Serializable]
    public abstract class EntityViewModel
    {
        public string Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }
}