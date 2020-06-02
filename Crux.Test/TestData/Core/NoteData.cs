using System;
using System.Collections.Generic;
using Crux.Model.Core;
using Crux.Model.Utility;

namespace Crux.Test.TestData.Core
{
    public static class NoteData
    {
        public const string FirstId = "notes-567-A";
        public const string SecondId = "notes-568-A";
        public const string ThirdId = "notes-3999-A";
        public const string FourthId = "notes-5454-A";

        public static Notes GetFirst()
        {
            return new Notes
            {
                Id = FirstId,
                RefId = UserData.FirstId,
                Name = UserData.GetFirst().Name,
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                History = new List<Note> {GetFirstChild()},
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static Note GetFirstChild()
        {
            return new Note
            {
                AuthorId = UserData.FirstId,
                Text = "First Note Test Text",
                ForceNotify = false,
                IsPrivate = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }
    }
}