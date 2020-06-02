using Crux.Model.Core.Confirm;

namespace Crux.Endpoint.Api.Base.Interface
{
    public interface IProcessCommand : ILogicCommand
    {
        ActionConfirm Result { get; set; }
    }
}