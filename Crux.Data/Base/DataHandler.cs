using System;
using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Model.Core;
using Raven.Client.Documents.Session;

namespace Crux.Data.Base
{
    public class DataHandler : IDataHandler
    {
        public DataHandler(IAsyncDocumentSession session)
        {
            Session = session;
            Session.Advanced.MaxNumberOfRequestsPerSession = 128;
        }

        public User User { get; set; }
        public IAsyncDocumentSession Session { get; set; }

        public async Task Execute(ICommand command)
        {
            if (command is IDataCommand executable)
            {
                executable.Session = Session;
                await executable.Execute();
            }
            else
            {
                throw new ArgumentException("Cannot cast command to IDataCommand");
            }
        }

        public async Task Commit()
        {
            await Session.SaveChangesAsync();
        }
    }
}