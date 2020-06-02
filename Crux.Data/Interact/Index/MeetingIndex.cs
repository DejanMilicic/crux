using System.Collections.Generic;
using System.Linq;
using Crux.Data.Interact.Result;
using Crux.Model.Core;
using Crux.Model.Interact;
using Raven.Client.Documents.Indexes;

namespace Crux.Data.Interact.Index
{
    public class MeetingIndex : AbstractIndexCreationTask<Meeting, MeetingMaster>
    {
        public MeetingIndex()
        {
            Map = meetings => from meeting in meetings
                where meeting.IsActive
                let meetingType = LoadDocument<MeetingType>(meeting.MeetingTypeId)
                let notes = LoadDocument<Notes>(meeting.NotesId)
                select new
                {
                    meeting.Id,
                    meeting.Name,
                    meeting.TenantId,
                    meeting.AuthorId,
                    meeting.RegionKey,
                    meeting.IsActive,
                    meeting.DateCreated,
                    meeting.DateModified,
                    meeting.When,
                    meeting.MeetingTypeId,
                    meetingType.IsRecur,
                    meetingType.DaysWhen,
                    meeting.NotesId,
                    NoteCount = notes == null ? 0 : notes.History.Count,
                    meeting.IsComplete,
                    meeting.IsAttended,
                    meeting.Attendances,
                    meeting.Participants,
                    Searchable = new List<string> {meeting.Name, meeting.TenantName, meeting.AuthorName}
                };

            Indexes.Add(x => x.Searchable, FieldIndexing.Search);
            StoreAllFields(FieldStorage.Yes);
            Priority = IndexPriority.Normal;
        }
    }
}