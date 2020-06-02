using System.Threading.Tasks;
using Crux.Data.Base.Interface;
using Crux.Model.Core;

namespace Crux.Test.Base
{
    public abstract class BaseHandler : IHandler
    {
        public User User { get; set; }
        public int ExecutedCount { get; set; }
        public bool HasExecuted { get; set; }
        public abstract Task Execute(ICommand command);
    }
}