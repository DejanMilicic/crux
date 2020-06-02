using System.Collections.Generic;

namespace Crux.Cloud.Engage.DataTransfer
{
    public class ClientExclude
    {
        public string TenantId { get; set; } = string.Empty;
        public IList<string> ExcludedUsers { get; set; } = new List<string>();
    }
}