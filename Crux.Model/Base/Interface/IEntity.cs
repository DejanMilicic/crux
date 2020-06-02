using System;

namespace Crux.Model.Base.Interface
{
    public interface IEntity
    {
        string Id { get; set; }
        DateTime DateCreated { get; set; }
        DateTime DateModified { get; set; }
    }
}