namespace Crux.Endpoint.Api.Base
{
    using System;
    using System.Threading.Tasks;
    using Data.Base.Interface;
    using Interface;
    using Model.Core;

    public class LogicHandler : ILogicHandler
    {
        public User User { get; set; }
        public IDataHandler DataHandler { get; set; }

        public async Task Execute(ICommand command)
        {
            if (command is ILogicCommand executable)
            {
                if (DataHandler != null)
                {
                    executable.DataHandler = DataHandler;
                }

                executable.LogicHandler = this;
                await executable.Execute();
            }
            else
            {
                throw new ArgumentException("Cannot cast command to ILogicCommand");
            }
        }
    }
}