using Crux.Data.Base.Results;

namespace Crux.Endpoint.ViewModel.Base
{
    public class PagedResult<T>
    {
        public Paging Paging { get; set; }
        public T Data { get; set; }
        public bool Success { get; set; } = false;
        public string Message { get; set; }
    }
}