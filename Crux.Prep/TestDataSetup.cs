namespace Crux.Prep
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Security.Cryptography.X509Certificates;
    using Crux.Model.Base;
    using Crux.Model.Core;
    using Crux.Model.Interact;
    using Crux.Model.Utility;
    using Raven.Client.Documents;
    using Raven.Client.Documents.Indexes;
    using Raven.Client.Documents.Operations;

    public static class TestDataSetup
    {
        public static readonly string[] Urls = {"http://localhost:8080"};
        public static readonly string Database = "Crux";
        public static readonly string Thumbprint = "";

        private static IDocumentStore SetupStore()
        {
            var store = new DocumentStore {Database = Database, Urls = Urls};

            if (!string.IsNullOrEmpty(Thumbprint))
            {
                using var certificateStore = new X509Store(StoreName.My, StoreLocation.CurrentUser);
                certificateStore.Open(OpenFlags.ReadOnly);

                var collection = certificateStore.Certificates.Find(X509FindType.FindByThumbprint, Thumbprint, false);
                var certificate = collection.OfType<X509Certificate2>().FirstOrDefault();

                store.Certificate = certificate;
            }

            store.Conventions.IdentityPartsSeparator = "-";
            store.Initialize();

            IndexCreation.CreateIndexes(typeof(EverythingIndex).Assembly, store);

            return store;
        }

        public static void Clean()
        {
            Console.WriteLine("");
            Console.WriteLine("Connecting to " + Urls[0]);
            Console.WriteLine("");
            Console.WriteLine("Clean Started");

            var store = SetupStore();

            var query = new DeleteByQueryOperation<Entity, EverythingIndex>(x => x.Id != "");
            store.Operations.Send(query);
            Console.WriteLine("Clean Finished");
        }

        public static void Build()
        {
            Console.WriteLine("");
            Console.WriteLine("Build Started");
            var store = SetupStore();

            using (var session = store.OpenSession())
            {
                var tenant1 = Test.TestData.Core.TenantData.GetFirst();
                var tenant2 = Test.TestData.Core.TenantData.GetSecond();
                var image6 = Test.TestData.Core.VisibleData.GetSixth();

                var user1 = Test.TestData.Core.UserData.GetFirst();
                var config1 = Test.TestData.Core.UserConfigData.GetFirst();
                var image1 = Test.TestData.Core.VisibleData.GetFirst();
                var user2 = Test.TestData.Core.UserData.GetSecond();
                var config2 = Test.TestData.Core.UserConfigData.GetSecond();
                var image2 = Test.TestData.Core.VisibleData.GetSecond();
                var user3 = Test.TestData.Core.UserData.GetThird();
                var config3 = Test.TestData.Core.UserConfigData.GetThird();
                var image3 = Test.TestData.Core.VisibleData.GetThird();
                var user4 = Test.TestData.Core.UserData.GetFourth();
                var config4 = Test.TestData.Core.UserConfigData.GetFourth();
                var image4 = Test.TestData.Core.VisibleData.GetFourth();
                var user5 = Test.TestData.Core.UserData.GetFifth();
                var config5 = Test.TestData.Core.UserConfigData.GetFifth();
                var image5 = Test.TestData.Core.VisibleData.GetFifth();

                var welcomeUserEmail = Test.TestData.Core.NotifyTemplateData.GetFirst();
                var welcomeOrgEmail = Test.TestData.Core.NotifyTemplateData.GetSecond();
                var messageEmail = Test.TestData.Core.NotifyTemplateData.GetThird();
                var twoFactorEmail = Test.TestData.Core.NotifyTemplateData.GetFourth();
                var attendEmail = Test.TestData.Core.NotifyTemplateData.GetFifth();
                var forgotEmail = Test.TestData.Core.NotifyTemplateData.GetSixth();

                var meetingType1 = Test.TestData.Interact.MeetingTypeData.GetFirst();
                var meetingType2 = Test.TestData.Interact.MeetingTypeData.GetSecond();

                session.Store(tenant1);
                session.Store(tenant2);
                session.Store(image6);

                session.Store(user1);
                session.Store(config1);
                session.Store(image1);
                session.Store(user2);
                session.Store(config2);
                session.Store(image2);
                session.Store(user3);
                session.Store(config3);
                session.Store(image3);
                session.Store(user4);
                session.Store(config4);
                session.Store(image4);
                session.Store(user5);
                session.Store(config5);
                session.Store(image5);

                session.Store(welcomeUserEmail);
                session.Store(welcomeOrgEmail);
                session.Store(messageEmail);
                session.Store(twoFactorEmail);
                session.Store(attendEmail);
                session.Store(forgotEmail);

                session.Store(meetingType1);
                session.Store(meetingType2);

                session.SaveChanges();

                var list = new List<string>() {user1.Id, user2.Id, user3.Id, user4.Id, user5.Id};
                var users = new List<User>() {user1, user2, user3, user4, user5};

                for (var i = 1; i < 53; i++)
                {
                    var random1 = EncryptHelper.RandomList<string>(list);
                    var random2 = EncryptHelper.RandomList<string>(list);

                    if (random1 == random2)
                    {
                        random2 = EncryptHelper.RandomList<string>(list);
                    }

                    if (random1 == random2)
                    {
                        random2 = EncryptHelper.RandomList<string>(list);
                    }

                    if (random1 == random2)
                    {
                        random2 = EncryptHelper.RandomList<string>(list);
                    }

                    var userOne = users.Find(u => u.Id == random1);
                    var userTwo = users.Find(u => u.Id == random2);

                    var meeting = new Meeting()
                    {
                        Text = "Test" + i, AuthorId = random1, AuthorName = userOne.Name, Name = "Meeting " + i,
                        TenantId = tenant1.Id, TenantName = tenant1.TenantName, RegionKey = "GLA",
                        When = DateTime.Now.AddDays(i - 14), MeetingTypeId = meetingType1.Id,
                        Participants = new List<string>() {random1, random2}
                    };
                    session.Store(meeting);

                    var attend1 = new Attendance()
                    {
                        MeetingId = meeting.Id, UserId = random1, TenantId = tenant1.Id,
                        TenantName = tenant1.TenantName, RegionKey = "GLA", AuthorId = random1,
                        AuthorName = userOne.Name, Name = "Attend " + i + "/1", HasProfile = true,
                        ProfileId = userOne.ProfileId, ProfileThumbUrl = userOne.ProfileThumbUrl
                    };
                    var attend2 = new Attendance()
                    {
                        MeetingId = meeting.Id, UserId = random2, TenantId = tenant1.Id,
                        TenantName = tenant1.TenantName, RegionKey = "GLA", AuthorId = random1,
                        AuthorName = userOne.Name, Name = "Attend " + i + "/1", HasProfile = true,
                        ProfileId = userTwo.ProfileId, ProfileThumbUrl = userTwo.ProfileThumbUrl
                    };

                    session.Store(attend1);
                    session.Store(attend2);

                    meeting.Attendances.Add(attend1.Id);
                    meeting.Attendances.Add(attend2.Id);

                    session.Store(meeting);

                    var msg = new Msg()
                    {
                        AuthorId = userOne.Id, AuthorName = userOne.Name, TenantId = tenant1.Id,
                        TenantName = tenant1.Name, Recipients = {random1, random2}, RegionKey = "GLA",
                        Text = "Meeting arranged with Test Number " + i, Name = "Test Meeting No " + i
                    };
                    session.Store(msg);
                }

                session.SaveChanges();
            }

            Console.WriteLine("Build Finished");
        }
    }
}