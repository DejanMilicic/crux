using Crux.Cloud.Core;
using Crux.Cloud.Engage.DataTransfer;
using Crux.Cloud.Engage.Interface;
using Crux.Model.Core.Confirm;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Crux.Cloud.Engage
{
    public class PushCmd : CloudCmd
    {
        public string UserId { get; set; }
        public string TenantId { get; set; }
        public string Action { get; set; }
        public bool IncludeUser { get; set; } = false;
        public bool ExcludeUser { get; set; } = false;
        public IList<string> IncludeUsers { get; set; } = new List<string>();
        public IList<ClientExclude> IncludeClients { get; set; } = new List<ClientExclude>();
        public string Identity { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public string Url { get; set; }

        public override async Task Execute()
        {
            var options = new PushCreateOptions
            {
                AppId = new Guid(Settings.Value.OneSignalAppId),
                Filters = new List<IPushFilter>(),
                Data = new Dictionary<string, string>()
            };

            options.Data.Add(new KeyValuePair<string, string>("Action", Action));

            if (IncludeUser)
            {
                options.Filters.Add(new PushFilterField
                    {Key = "userId", Value = UserId, Field = "tag", Relation = "="});
            }

            foreach (var clientExclude in IncludeClients)
            {
                if (options.Filters.Any())
                {
                    options.Filters.Add(new PushFilterOperator {Operator = "OR"});
                }

                options.Filters.Add(new PushFilterField
                    {Key = "tenantId", Value = clientExclude.TenantId, Field = "tag", Relation = "="});

                foreach (var userId in clientExclude.ExcludedUsers)
                {
                    options.Filters.Add(new PushFilterOperator {Operator = "AND"});
                    options.Filters.Add(new PushFilterField
                        {Key = "userId", Value = userId, Field = "tag", Relation = "!="});
                }

                if (ExcludeUser && TenantId == clientExclude.TenantId)
                {
                    options.Filters.Add(new PushFilterOperator {Operator = "AND"});
                    options.Filters.Add(new PushFilterField
                        {Key = "userId", Value = UserId, Field = "tag", Relation = "!="});
                }
            }

            foreach (var userId in IncludeUsers)
            {
                if (!ExcludeUser || UserId != userId)
                {
                    if (options.Filters.Any())
                    {
                        options.Filters.Add(new PushFilterOperator {Operator = "OR"});
                    }

                    options.Filters.Add(new PushFilterField
                        {Key = "userId", Value = userId, Field = "tag", Relation = "="});
                }
            }

            if (!string.IsNullOrEmpty(Identity))
            {
                options.Data.Add(new KeyValuePair<string, string>("Identity", Identity));
            }

            if (!string.IsNullOrEmpty(Message))
            {
                options.Contents.Add("en", Message);
            }

            if (!string.IsNullOrEmpty(Title))
            {
                options.Headings = new Dictionary<string, string>
                {
                    {"en", Title}
                };
            }

            if (!string.IsNullOrEmpty(Url))
            {
                options.Url = Url;
            }

            RestClient RestClient = new RestClient(Settings.Value.OneSignalEndpoint);
            RestRequest restRequest = new RestRequest("notifications", Method.POST);

            restRequest.AddHeader("Authorization", string.Format("Basic {0}", Settings.Value.OneSignalClientKey));
            restRequest.RequestFormat = DataFormat.Json;
            restRequest.JsonSerializer = new SimpleSerializer();
            restRequest.AddJsonBody(options);

            var restResponse = RestClient.Execute<PushCreateResult>(restRequest);

            if (!(restResponse.StatusCode != HttpStatusCode.Created || restResponse.StatusCode != HttpStatusCode.OK))
            {
                if (restResponse.ErrorException != null)
                {
                    throw restResponse.ErrorException;
                }
                else if (restResponse.StatusCode != HttpStatusCode.OK && restResponse.Content != null)
                {
                    throw new Exception(restResponse.Content);
                }
            }

            var result = restResponse.Data;
            if (!string.IsNullOrEmpty(result.Id))
            {
                Result = ActionConfirm.CreateSuccess("Notification successful " + result.Id);
            }
            else
            {
                Result = ActionConfirm.CreateFailure("Notification failed " + Identity);
            }

            await Task.CompletedTask;
        }
    }
}