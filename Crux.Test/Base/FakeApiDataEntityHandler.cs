using System.Collections.Generic;
using System.Threading.Tasks;
using Crux.Data.Base;
using Crux.Data.Base.Interface;
using Crux.Data.Core.Loader;
using Crux.Model.Base.Interface;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Crux.Test.Base.Interface;
using Moq;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;

namespace Crux.Test.Base
{
    public class FakeApiDataEntityHandler<E> : BaseHandler, IDataHandler where E : IEntity
    {
        public Mock<IMockHandler> Result { get; set; } = new Mock<IMockHandler>();
        public IAsyncDocumentSession Session { get; set; }
        public IDocumentStore MainStore { get; set; }
        public bool HasCommitted { get; set; }

        public override async Task Execute(ICommand command)
        {
            if (command.GetType() == typeof(NotifyTemplateByName))
            {
                if (command is NotifyTemplateByName output)
                {
                    output.Result = (NotifyTemplate) Result.Object.Execute(command);
                }
            }
            else if (command.GetType() == typeof(Loader<Tenant>))
            {
                if (command is Loader<Tenant> output)
                {
                    output.Result = (Tenant) Result.Object.Execute(command);
                }
            }
            else if (command.GetType() == typeof(Loader<UserConfig>))
            {
                if (command is Loader<UserConfig> output)
                {
                    output.Result = (UserConfig) Result.Object.Execute(command);
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Single<E>)))
            {
                if (command is Single<E> output)
                {
                    output.Result = (E) Result.Object.Execute(command);
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Loader<E>)) || command.GetType() == typeof(Loader<E>))
            {
                if (command is Loader<E> output)
                {
                    output.Result = (E) Result.Object.Execute(command);
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Loaders<E>)) || command.GetType() == typeof(Loaders<E>))
            {
                if (command is Loaders<E> output)
                {
                    output.Result = (IEnumerable<E>) Result.Object.Execute(command);
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Persist<E>)) || command.GetType() == typeof(Persist<E>))
            {
                if (command is Persist<E> output)
                {
                    output.Model = (E) Result.Object.Execute(command);
                    output.Confirm = ModelConfirm<E>.CreateSuccess(output.Model);
                }
            }
            else if (command.GetType().IsSubclassOf(typeof(Delete<E>)) || command.GetType() == typeof(Delete<E>))
            {
                if (command is Delete<E> output)
                {
                    output.Result = (bool) Result.Object.Execute(command);
                }
            }

            await Register();
        }

        protected async Task Register()
        {
            ExecutedCount++;
            HasExecuted = true;

            await Task.CompletedTask;
        }

        public virtual async Task Commit()
        {
            HasCommitted = true;
            await Task.CompletedTask;
        }
    }
}