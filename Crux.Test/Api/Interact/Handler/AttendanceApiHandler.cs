using System.Collections.Generic;
using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Loader;
using Crux.Data.Interact.Persist;
using Crux.Data.Interact.Result;
using Crux.Model.Core.Confirm;
using Crux.Model.Interact;
using Crux.Test.Base;

namespace Crux.Test.Api.Interact.Handler
{
    public class AttendanceApiDataHandler : FakeApiDataResultHandler<Attendance, AttendanceDisplay>
    {
        public ModelConfirm<Attendance> ResultConfirm { get; set; }
        public IEnumerable<ResultProfile> ResultParticipants { get; set; }

        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(AttendanceById)) || command.GetType() == typeof(AttendanceById))
            {
                if (command is AttendanceById output)
                {
                    if (ResultParticipants != null)
                    {
                        output.ResultParticipants = ResultParticipants;
                    }
                    
                    output.Result = (Attendance)Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(AttendanceCheckin)) || command.GetType() == typeof(AttendanceCheckin))
            {
                if (command is AttendanceCheckin output)
                {
                    output.Result = (bool)Result.Object.Execute(command);
                    output.Confirm = ResultConfirm;
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(AttendanceNoShow)) || command.GetType() == typeof(AttendanceNoShow))
            {
                if (command is AttendanceNoShow output)
                {
                    output.Result = (bool)Result.Object.Execute(command);
                    output.Confirm = ResultConfirm;
                    await Register();
                }
            }
            else
            {
                await base.Execute(command);
            }
        }
    }
}