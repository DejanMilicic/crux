using Crux.Data.Base.Interface;

namespace Crux.Test.Base.Interface
{
    public interface IMockHandler
    {
        object Execute(ICommand command);
    }
}