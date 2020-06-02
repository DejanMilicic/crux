using System.Collections.Generic;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Interact.Loader;
using Crux.Data.Interact.Result;
using Crux.Model.Core;
using Crux.Model.Interact;
using Crux.Test.Base;

namespace Crux.Test.Api.Interact.Handler
{
    public class MeetingApiDataHandler : FakeApiDataResultHandler<Meeting, MeetingDisplay>
    {
        public IEnumerable<Attendance> ResultAttendances { get; set; }

        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(Loaders<Attendance>)) ||
                command.GetType() == typeof(Loaders<Attendance>))
            {
                if (command is Loaders<Attendance> output)
                {
                    output.Result = (IEnumerable<Attendance>)Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Loaders<User>)) ||
                command.GetType() == typeof(Loaders<User>))
            {
                if (command is Loaders<User> output)
                {
                    output.Result = (IEnumerable<User>)Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(MeetingById)) || command.GetType() == typeof(MeetingById))
            {
                if (command is MeetingById output)
                {
                    output.Result = (Meeting)Result.Object.Execute(command);
                    output.ResultAttendances = ResultAttendances;
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