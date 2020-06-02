using System;
using System.Collections.Generic;
using Crux.Model.Core;
using Crux.Model.Utility;

namespace Crux.Test.TestData.Core
{
    public static class FavData
    {
        public const string FirstId = "favs-556-A";
        public const string SecondId = "favs-3456-A";
        public const string ThirdId = "favs-4456-A";
        public const string FourthId = "favs-2234-A";

        public static Fav GetFirst()
        {
            var filterKey = "user";

            return new Fav
            {
                Id = FirstId,
                FilterKey = filterKey,
                EntityIds = new List<string> {UserData.FirstId},
                UserId = UserData.FirstId,
                Name = UserData.GetFirst().Name + " -> " + filterKey,
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }
    }
}