using System;
using System.Collections.Generic;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;
using Crux.Model.Utility;
using Crux.Test.TestData.Core;

namespace Crux.Test.TestData.Interact
{
    public static class AttendanceData
    {
        public const string FirstId = "attendances-4351-A";
        public const string SecondId = "attendances-2552-A";

        public static Attendance GetFirst()
        {
            return new Attendance
            {
                Id = FirstId,
                Name = "First Attendance",
                RegionKey = "GLA",
                AuthorId = UserData.FirstId,
                AuthorName = UserData.FirstName,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                MeetingId = MeetingData.FirstId,
                AttendedWhen = DateHelper.FormatDayStart(DateTime.UtcNow),
                UserId = UserData.FirstId,
                HasAttended = false,
                HasProfile = true,
                ProfileId = UserData.GetFirst().ProfileId,
                ProfileThumbUrl = UserData.GetFirst().ProfileThumbUrl,
                IsCheckedIn = false,
                CheckedInUser = UserData.FirstId,
                CheckedInWhen = DateHelper.FormatDayStart(DateTime.UtcNow),
                IsConfirmed = false,
                IsNoShow = false,
                NoShowWhen = DateHelper.FormatDayStart(DateTime.UtcNow),
                NoShowUser = UserData.FirstId,
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static Attendance GetSecond()
        {
            return new Attendance
            {
                Id = SecondId,
                Name = "Second Attendance",
                RegionKey = "GLA",
                AuthorId = UserData.SecondId,
                AuthorName = UserData.SecondName,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                MeetingId = MeetingData.FirstId,
                AttendedWhen = DateHelper.FormatDayStart(DateTime.UtcNow),
                UserId = UserData.SecondId,
                HasAttended = false,
                HasProfile = true,
                ProfileId = UserData.GetSecond().ProfileId,
                ProfileThumbUrl = UserData.GetSecond().ProfileThumbUrl,
                IsCheckedIn = false,
                CheckedInUser = UserData.SecondId,
                CheckedInWhen = DateHelper.FormatDayStart(DateTime.UtcNow),
                IsConfirmed = false,
                IsNoShow = false,
                NoShowWhen = DateHelper.FormatDayStart(DateTime.UtcNow),
                NoShowUser = UserData.SecondId,
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static AttendanceDisplay GetFirstDisplay(bool isFav)
        {
            var source = GetFirst();

            var result = new AttendanceDisplay()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                Participants = new List<ResultProfile>() { UserData.GetFirstProfile() },
                When = source.AttendedWhen,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                ProfileThumbUrl = source.ProfileThumbUrl,
                IsConfirmed =  source.IsConfirmed,
                UserId = source.UserId,
                HasAttended = source.HasAttended,
                MeetingId = source.MeetingId,
                MeetingName = MeetingData.GetFirst().Name,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified,
                Favourite = isFav
            };

            return result;
        }
        public static AttendanceDisplay GetSecondDisplay(bool isFav)
        {
            var source = GetSecond();

            var result = new AttendanceDisplay()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                Participants = new List<ResultProfile>() { UserData.GetSecondProfile() },
                When = source.AttendedWhen,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                ProfileThumbUrl = source.ProfileThumbUrl,
                IsConfirmed = source.IsConfirmed,
                UserId = source.UserId,
                HasAttended = source.HasAttended,
                MeetingId = source.MeetingId,
                MeetingName = MeetingData.GetSecond().Name,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified,
                Favourite = isFav
            };

            return result;
        }

    }
}