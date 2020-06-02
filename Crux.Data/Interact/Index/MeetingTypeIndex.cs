using System.Collections.Generic;
using System.Linq;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Interact.Index
{
    public class MeetingTypeIndex : AbstractIndexCreationTask<MeetingType, MeetingTypeMaster>
    {
        public MeetingTypeIndex()
        {
            Map = meetingTypes => from meetingType in meetingTypes
                where meetingType.IsActive
                select new
                {
                    meetingType.Id,
                    meetingType.Name,
                    meetingType.TenantId,
                    meetingType.AuthorId,
                    meetingType.RegionKey,
                    meetingType.IsActive,
                    meetingType.DateCreated,
                    meetingType.DateModified,
                    meetingType.IsRecur,
                    Searchable = new List<string> {meetingType.Name, meetingType.TenantName, meetingType.AuthorName}
                };

            Indexes.Add(x => x.Searchable, FieldIndexing.Search);
            Priority = IndexPriority.Normal;
        }
    }
}