using System;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Crux.Model.Utility;

namespace Crux.Test.TestData.Core
{
    public static class TenantData
    {
        public const string Region = "GLA";
        public const string FirstId = "tenants-22-A";
        public const string FirstName = "Org A";
        public const string SecondId = "tenants-33-A";
        public const string SecondName = "Org B";

        public static Tenant GetFirst()
        {
            return new Tenant
            {
                Id = FirstId,
                Name = FirstName,
                EntryKey = "first",
                RegionKey = Region,
                StorageLimit = 10000000,
                IsActive = true,
                HasProfile = true,
                ProfileId = VisibleData.SixthId,
                ProfileThumbUrl = VisibleData.GetSixth().ThumbUrl,
                AuthorId = UserData.FourthId,
                AuthorName = UserData.FourthName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static Tenant GetSecond()
        {
            return new Tenant
            {
                Id = SecondId,
                Name = SecondName,
                EntryKey = "alt",
                RegionKey = Region,
                StorageLimit = 10000000,
                IsActive = true,
                AuthorId = UserData.FourthId,
                AuthorName = UserData.FourthName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static TenantDisplay GetFirstDisplay()
        {
            var source = GetFirst();

            var result = new TenantDisplay()
            {
                Id = source.Id,
                Name = source.Name,
                HasProfile = source.HasProfile,
                ProfileId = source.ProfileId,
                ProfileThumbUrl = source.ProfileThumbUrl,
                UserCount = 0,
                UserLimit = source.UserLimit,
                IsActive = true,
                StorageLimit = source.StorageLimit,
                FileSize = 0,
                FileCount = 0,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified
            };

            return result;
        }
    }
}