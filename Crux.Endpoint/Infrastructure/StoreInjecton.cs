using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Crux.Data.Base.Index;
using Crux.Model.Utility;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Raven.Client.Documents;
using Raven.Client.Documents.Indexes;
using Raven.Client.Documents.Session;

namespace Crux.Endpoint.Infrastructure
{
    public static class StoreInjecton
    {
        public static IDocumentStore CreateStore(IServiceProvider provider)
        {
            var settings = provider.GetService<IOptions<Keys>>();

            var store = new DocumentStore
            {
                Database = settings.Value.RavenDatabase,
                Urls = settings.Value.RavenUrls
            };

            if (!string.IsNullOrEmpty(settings.Value.RavenThumbprint))
            {
                using X509Store certificateStore = new X509Store(StoreName.My, StoreLocation.CurrentUser);
                certificateStore.Open(OpenFlags.ReadOnly);

                var collection = certificateStore.Certificates.Find(X509FindType.FindByThumbprint,
                    settings.Value.RavenThumbprint, false);
                var certificate = collection.OfType<X509Certificate2>().FirstOrDefault();

                store.Certificate = certificate;
            }

            store.Conventions.IdentityPartsSeparator = "-";
            store.Initialize();
            IndexCreation.CreateIndexes(typeof(OwnedMasterIndex).Assembly, store);
            return store;
        }

        public static IAsyncDocumentSession CreateSession(IServiceProvider provider)
        {
            return provider.GetService<IDocumentStore>().OpenAsyncSession();
        }
    }
}