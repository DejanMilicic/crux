using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Core.Index;
using Crux.Model.Core;
using Raven.Client.Documents;

namespace Crux.Data.Core.Loader
{
    public class NotifyTemplateByName : Single<NotifyTemplate>
    {
        public string Name { get; set; }

        public override async Task Execute()
        {
            Result = await Session.Query<NotifyTemplate, NotifyTemplateIndex>()
                .FirstOrDefaultAsync(u => u.Name == Name);
        }
    }
}