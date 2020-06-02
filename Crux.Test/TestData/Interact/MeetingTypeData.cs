using System;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;
using Crux.Model.Utility;
using Crux.Test.TestData.Core;

namespace Crux.Test.TestData.Interact
{
    public static class MeetingTypeData
    {
        public const string FirstId = "MeetingTypes-3151-A";
        public const string SecondId = "MeetingTypes-5262-A";

        public static MeetingType GetFirst()
        {
            return new MeetingType
            {
                Id = FirstId,
                Name = "Standard Meeting",
                Prename = "Standard Meeting",
                Pretext = "Meetup and Intro",
                RegionKey = "GLA",
                AuthorId = UserData.FirstId,
                AuthorName = UserData.FirstName,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                IsRecur = false,
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static MeetingType GetSecond()
        {
            return new MeetingType
            {
                Id = SecondId,
                Name = "Recur Meeting",
                Prename = "Recur Meeting",
                Pretext = "Every week",
                RegionKey = "GLA",
                AuthorId = UserData.FirstId,
                AuthorName = UserData.FirstName,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                IsRecur = true,
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static MeetingTypeDisplay GetFirstDisplay(bool isFav)
        {
            var source = GetFirst();

            var result = new MeetingTypeDisplay()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                Prename = source.Prename,
                Pretext = source.Pretext,
                DaysWhen = source.DaysWhen,
                IsRecur = source.IsRecur,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified,
                Favourite = isFav
            };

            return result;
        }

        public static ResultOwned GetFirstOwned()
        {
            var source = GetFirst();

            var result = new ResultOwned()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified
            };

            return result;
        }
    }
}