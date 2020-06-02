using Crux.Model.Base.Interface;
using System;

namespace Crux.Model.Base
{
    [Serializable]
    public abstract class Entity : EntityWithId<string>, IEntity
    {
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateModified { get; set; } = DateTime.UtcNow;
    }
}