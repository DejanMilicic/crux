using System.Collections.Generic;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Base.Results;
using Crux.Model.Base.Interface;

namespace Crux.Test.Base
{
    public class FakeApiDataResultHandler<E, R> : FakeApiDataEntityHandler<E>, IDataHandler
        where E : IEntity where R : ResultNamed
    {
        public override async Task Execute(ICommand command)
        {
            if (command.GetType().IsSubclassOf(typeof(Query<ResultProfile>)) ||
                command.GetType() == typeof(Query<ResultProfile>))
            {
                if (command is Query<ResultProfile> output)
                {
                    output.Result = (IEnumerable<ResultProfile>)Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Query<ResultOwned>)) ||
                command.GetType() == typeof(Query<ResultOwned>))
            {
                if (command is Query<ResultOwned> output)
                {
                    output.Result = (IEnumerable<ResultOwned>)Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Query<R>)) || command.GetType() == typeof(Query<R>))
            {
                if (command is Query<R> output)
                {
                    output.Result = (IEnumerable<R>)Result.Object.Execute(command);
                    await Register();
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Display<R>)))
            {
                if (command is Display<R> output)
                {
                    output.Result = (R)Result.Object.Execute(command);
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