using System.Collections.Generic;
using System.Linq;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Interact.Index
{
    public class MsgIndex : AbstractIndexCreationTask<Msg, MsgMaster>
    {
        public MsgIndex()
        {
            Map = msgs => from msg in msgs
                where msg.IsActive
                select new
                {
                    msg.Id,
                    msg.Name,
                    msg.TenantId,
                    msg.RegionKey,
                    msg.IsActive,
                    msg.DateCreated,
                    msg.DateModified,
                    msg.AuthorId,
                    msg.ReplyId,
                    msg.Recipients,
                    msg.IsPrivate,
                    msg.Files,
                    Searchable = new List<string> {msg.Name, msg.Text, msg.TenantName, msg.AuthorName}
                };

            Indexes.Add(x => x.Searchable, FieldIndexing.Search);
            StoreAllFields(FieldStorage.Yes);
            Priority = IndexPriority.Normal;
        }
    }
}