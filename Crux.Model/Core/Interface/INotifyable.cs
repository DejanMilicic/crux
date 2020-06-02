namespace Crux.Model.Core.Interface
{
    public interface INotifyable
    {
        string AuthorId { get; set; }
        string Text { get; set; }
        bool IsPrivate { get; set; }
        bool ForceNotify { get; set; }
    }
}