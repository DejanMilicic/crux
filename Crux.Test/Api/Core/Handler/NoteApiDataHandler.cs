using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Loader;
using Crux.Model.Core;
using Crux.Model.Core.Interface;
using Crux.Test.Base;

namespace Crux.Test.Api.Core.Handler
{
    public class NoteApiDataHandler : FakeApiDataEntityHandler<Notes>
    {
        public INotable ResultNotable { get; set; }

        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(NotesByRefId)) || command.GetType() == typeof(NotesByRefId))
            {
                if (command is NotesByRefId output)
                {
                    if (ResultNotable != null)
                    {
                        output.ResultNotable = ResultNotable;
                    }


                    output.Result = (Notes) Result.Object.Execute(command);
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