using System;

namespace Crux.Model.Base.Interface
{
    public interface IDated : IResultOwned
    {
        DateTime When { get; }
    }
}