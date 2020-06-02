using System;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Interact.Filters;
using Crux.Data.Interact.Index;
using Crux.Data.Interact.Result;
using Crux.Data.Interact.Projection;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace Crux.Data.Interact.Query
{
    public class MsgDisplayByFilter : OwnedQuery<MsgDisplay, MsgMaster>
    {
        public MsgFilter Filter { get; set; }

        public override async Task Execute()
        {
            var query = Session.Query<MsgMaster, MsgIndex>()
                .ProjectInto<MsgMaster>()
                .Statistics(out QueryStatistics stats)
                .Take(Filter.Take)
                .Skip(Filter.Skip * Filter.Take)
                .OrderByDescending(a => a.DateModified);

            if (Filter.DateFrom > DateTime.MinValue || Filter.DateTo > DateTime.MaxValue)
            {
                query = query.Where(v => v.DateCreated > Filter.DateFrom && v.DateCreated < Filter.DateTo);
            }

            if (Filter.AuthorKeys.Any())
            {
                query = query.Where(v => v.AuthorId.In(Filter.AuthorKeys));
            }

            if (Filter.RecipientKeys.Any())
            {
                query = query.Where(v => v.Recipients.In(Filter.RecipientKeys));
            }

            if (Filter.PrivateRestrict)
            {
                query = query.Where(v => v.IsPrivate.Value);
            }

            query = await Init(query, Filter, "msg");
            Result = await MsgDisplayTrans.Transform(query).ToListAsync();
            Process(Filter, stats);
        }
    }
}