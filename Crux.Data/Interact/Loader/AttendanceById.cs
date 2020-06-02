using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Results;
using Crux.Model.Interact;
using Crux.Model.Base.Interface;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Crux.Data.Base.Projections;
using Crux.Data.Core.Results;
using Crux.Data.Core.Index;

namespace Crux.Data.Interact.Loader
{
    public class AttendanceById : Loader<Attendance>
    {
        public IEnumerable<ResultProfile> ResultParticipants { get; set; }

        public override async Task Execute()
        {
            Result = await Session.Include<Attendance>(m => m.MeetingId).LoadAsync<Attendance>(Id);

            if (Result != null)
            {
                var meeting = await Session.LoadAsync<Meeting>(Result.MeetingId);
                ResultParticipants = await ResultProfileProjection
                    .Transform(Session.Query<UserMaster, UserIndex>().Where(c => c.Id.In(meeting.Participants))
                        .OfType<IEntityProfile>()).ToListAsync();
            }
        }
    }
}