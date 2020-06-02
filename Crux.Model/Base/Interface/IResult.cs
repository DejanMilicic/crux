using System;
using System.Collections.Generic;

namespace Crux.Model.Base.Interface
{
    public interface IResult
    {
        string Id { get; set; }
        DateTime? DateCreated { get; set; }
        DateTime? DateModified { get; set; }
        IEnumerable<string> Searchable { get; set; }
        bool Favourite { get; set; }
        bool CanAdd { get; set; }
        bool CanEdit { get; set; }
        bool CanDelete { get; set; }
        bool CanList { get; set; }
    }
}