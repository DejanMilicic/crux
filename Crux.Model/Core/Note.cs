using Crux.Model.Core.Interface;
using System;

namespace Crux.Model.Core
{
    public class Note : INotifyable
    {
        public int Counter { get; set; } = 0;
        public string AuthorId { get; set; } = string.Empty;
        public string AuthorName { get; set; } = string.Empty;
        public string AuthorProfileThumbUrl { get; set; } = string.Empty;
        public string Text { get; set; } = string.Empty;
        public bool IsPrivate { get; set; } = false;
        public bool ForceNotify { get; set; } = false;
        public virtual bool IsActive { get; set; } = true;
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime DateModified { get; set; } = DateTime.UtcNow;
    }
}