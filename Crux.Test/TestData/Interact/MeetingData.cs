using System;
using System.Collections.Generic;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;
using Crux.Model.Utility;
using Crux.Test.TestData.Core;

namespace Crux.Test.TestData.Interact
{
    public static class MeetingData
    {
        public const string FirstId = "meetings-4151-A";
        public const string SecondId = "meetings-2562-A";

        public static Meeting GetFirst()
        {
            return new Meeting
            {
                Id = FirstId,
                Name = "Standard Meeting",
                RegionKey = "GLA",
                AuthorId = UserData.FirstId,
                AuthorName = UserData.FirstName,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                Text = "meeting text",
                IsComplete = false,
                MeetingTypeId = MeetingTypeData.FirstId,
                Participants = new List<string>() { UserData.FirstId, UserData.SecondId },
                When = DateHelper.FormatDayStart(DateTime.UtcNow),
                IsAttended = false,
                NotesId = NoteData.FirstId,
                ForceNotify = false,
                IsPrivate = false,
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static Meeting GetSecond()
        {
            return new Meeting
            {
                Id = SecondId,
                Name = "Recur Meeting",
                RegionKey = "GLA",
                AuthorId = UserData.SecondId,
                AuthorName = UserData.SecondName,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                Text = "second message text",
                IsComplete = false,
                MeetingTypeId = MeetingTypeData.SecondId,
                Participants = new List<string>() { UserData.FirstId, UserData.SecondId },
                When = DateHelper.FormatDayStart(DateTime.UtcNow),
                IsAttended = false,
                NotesId = NoteData.SecondId,
                ForceNotify = false,
                IsPrivate = false,
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static MeetingDisplay GetFirstDisplay(bool isFav)
        {
            var source = GetFirst();

            var result = new MeetingDisplay()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                ForceNotify = source.ForceNotify,
                IsPrivate = source.IsPrivate,
                Text = source.Text,
                IsComplete = source.IsComplete,
                Participants = new List<AttendanceDisplay>() {  },
                When = DateHelper.FormatDayStart(DateTime.UtcNow),
                IsAttended = false,
                NotesId = NoteData.FirstId,
                DaysWhen = 7,
                IsRecur = false,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified,
                Favourite = isFav
            };

            return result;
        }
    }
}