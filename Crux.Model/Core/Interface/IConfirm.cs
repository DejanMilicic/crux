namespace Crux.Model.Core.Interface
{
    public interface IConfirm
    {
        string Identity { get; }
        string Message { get; }
        bool Success { get; }
    }
}