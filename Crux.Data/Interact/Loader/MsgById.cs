using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Crux.Model.Base;
using Crux.Model.Interact;
using Crux.Model.Base.Interface;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Crux.Data.Base.Projections;
using Crux.Data.Core.Results;
using Crux.Data.Core.Index;
using Crux.Data.Core.Projections;

namespace Crux.Data.Interact.Loader
{
    public class MsgById : Loader<Msg>
    {
        public IEnumerable<VisibleDisplay> ResultFiles { get; set; }
        public IEnumerable<ResultProfile> ResultRecipients { get; set; }
        public MsgDisplay ResultReply { get; set; }

        public override async Task Execute()
        {
            Result = await Session.LoadAsync<Msg>(Id);

            if (Result != null)
            {
                ResultFiles = await VisibleDisplayProjection
                    .Transform(Session.Query<VisibleFile, VisibleIndex>().Where(c => c.Id.In(Result.Files)))
                    .ToListAsync();
                ResultRecipients = await ResultProfileProjection
                    .Transform(Session.Query<UserMaster, UserIndex>().Where(c => c.Id.In(Result.Recipients))
                        .OfType<IEntityProfile>()).ToListAsync();

                if (!string.IsNullOrEmpty(Result.ReplyId))
                {
                    ResultReply = await MsgDisplayTrans
                        .Transform(Session.Query<MsgMaster, MsgIndex>().Where(c => c.Id == Result.ReplyId))
                        .FirstOrDefaultAsync();
                }
            }
        }
    }
}