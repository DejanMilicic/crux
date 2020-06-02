using System;
using System.Collections.Generic;
using Crux.Data.Base.Results;
using Crux.Data.Interact.Result;
using Crux.Model.Interact;
using Crux.Model.Utility;
using Crux.Test.TestData.Core;

namespace Crux.Test.TestData.Interact
{
    public static class MsgData
    {
        public const string FirstId = "Msgs-151-A";
        public const string SecondId = "Msgs-262-A";

        public static Msg GetFirst()
        {
            return new Msg
            {
                Id = FirstId,
                Name = "Standard Meeting",
                RegionKey = "GLA",
                AuthorId = UserData.FirstId,
                AuthorName = UserData.FirstName,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                Text = "message text",
                Recipients = new List<string>() { UserData.FirstId, UserData.SecondId },
                ForceNotify = false,
                IsPrivate = false,
                Files = new List<string>(),
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static Msg GetSecond()
        {
            return new Msg
            {
                Id = SecondId,
                Name = "Recur Meeting",
                RegionKey = "GLA",
                AuthorId = UserData.SecondId,
                AuthorName = UserData.SecondName,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                Text = "second message text",
                Recipients = new List<string>() { UserData.FirstId, UserData.SecondId },
                ForceNotify = false,
                ReplyId = FirstId,
                IsPrivate = false,
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static MsgDisplay GetFirstDisplay(bool isFav)
        {
            var source = GetFirst();

            var result = new MsgDisplay()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                ForceNotify = source.ForceNotify,
                IsPrivate = source.IsPrivate,
                AuthorProfileThumbUrl = UserData.GetFirst().ProfileThumbUrl,
                Recipients = new List<ResultProfile>() { UserData.GetFirstProfile()},
                Text = source.Text,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified,
                Files = new List<ResultProfile>(),
                Favourite = isFav
            };

            return result;
        }
    }
}