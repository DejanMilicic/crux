using System.Linq;
using Crux.Model.Core;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Core.Index
{
    public class NotifyTemplateIndex : AbstractIndexCreationTask<NotifyTemplate>
    {
        public NotifyTemplateIndex()
        {
            Map = templates => from template in templates
                select new
                {
                    template.Id,
                    template.Name
                };

            Priority = IndexPriority.Low;
            LockMode = IndexLockMode.LockedError;
        }
    }
}