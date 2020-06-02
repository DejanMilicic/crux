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
    public class MeetingById : Loader<Meeting>
    {
        public IEnumerable<ResultProfile> ResultAttendees { get; set; }
        public IEnumerable<Attendance> ResultAttendances { get; set; }

        public override async Task Execute()
        {
            Result = await Session.Include<Meeting>(m => m.Attendances).LoadAsync<Meeting>(Id);

            if (Result != null)
            {
                ResultAttendees = await ResultProfileProjection
                    .Transform(Session.Query<UserMaster, UserIndex>().Where(c => c.Id.In(Result.Participants))
                        .OfType<IEntityProfile>()).ToListAsync();
                var task = await Session.LoadAsync<Attendance>(Result.Attendances);
                ResultAttendances = task.Values;
            }
        }
    }
}