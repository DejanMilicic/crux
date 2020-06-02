using Crux.Model.Base.Interface;
using System;
using System.Collections.Generic;

namespace Crux.Data.Base.Results
{
    public abstract class Result : ResultWithId, IResult
    {
        public bool? IsActive { get; set; }
        public DateTime? DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime? DateModified { get; set; } = DateTime.UtcNow;
        public IEnumerable<string> Searchable { get; set; } = new List<string>();
        public bool Favourite { get; set; }
        public virtual bool CanAdd { get; set; } = false;
        public virtual bool CanEdit { get; set; } = false;
        public virtual bool CanDelete { get; set; } = false;
        public virtual bool CanList { get; set; } = true;
        public virtual bool CanCustom { get; set; } = true;
        public virtual bool CanFavourite { get; set; } = false;
    }
}