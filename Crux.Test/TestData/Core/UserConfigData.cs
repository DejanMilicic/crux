using System;
using Crux.Model.Core;
using Crux.Model.Utility;

namespace Crux.Test.TestData.Core
{
    public static class UserConfigData
    {
        public const string FirstId = "UserConfigs-551-A";
        public const string SecondId = "UserConfigs-234-A";
        public const string ThirdId = "UserConfigs-673-A";
        public const string FourthId = "UserConfigs-554-A";
        public const string FifthId = "UserConfigs-2345-A";

        public static UserConfig GetFirst()
        {
            return new UserConfig
            {
                Id = FirstId,
                Name = "Config for " + UserData.FirstName,
                UserId = UserData.FirstId,
                TemplateView = "wall",
                Take = 10,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                AuthorId = UserData.FirstId,
                AuthorName = UserData.FirstName,
                RegionKey = TenantData.Region,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow),
                EmailNotify = true,
                PushNotify = true,
                SmsNotify = false
            };
        }

        public static UserConfig GetSecond()
        {
            return new UserConfig
            {
                Id = SecondId,
                Name = "Config for " + UserData.SecondName,
                UserId = UserData.SecondId,
                TemplateView = "table",
                Take = 10,
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                AuthorId = UserData.SecondId,
                AuthorName = UserData.SecondName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static UserConfig GetThird()
        {
            return new UserConfig
            {
                Id = ThirdId,
                Name = "Config for " + UserData.ThirdName,
                UserId = UserData.ThirdId,
                TemplateView = "table",
                Take = 10,
                TenantId = TenantData.SecondId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.SecondName,
                AuthorId = UserData.ThirdId,
                AuthorName = UserData.ThirdName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static UserConfig GetFourth()
        {
            return new UserConfig
            {
                Id = FourthId,
                Name = "Config for " + UserData.FourthName,
                UserId = UserData.FourthId,
                TemplateView = "table",
                Take = 10,
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                AuthorId = UserData.FourthId,
                AuthorName = UserData.FourthName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static UserConfig GetFifth()
        {
            return new UserConfig
            {
                Id = FifthId,
                Name = "Config for " + UserData.FifthName,
                UserId = UserData.FifthId,
                TemplateView = "table",
                Take = 10,
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                AuthorId = UserData.FifthId,
                AuthorName = UserData.FifthName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }
    }
}