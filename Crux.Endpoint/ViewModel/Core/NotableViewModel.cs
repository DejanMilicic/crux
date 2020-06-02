using Crux.Data.Base.Results;
using Crux.Model.Core;

namespace Crux.Endpoint.ViewModel.Core
{
    public class NotableViewModel
    {
        public ResultOwned Notable { get; set; }
        public Notes Notes { get; set; }
        public string Message { get; set; }
    }
}