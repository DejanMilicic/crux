using System;
using Crux.Data.Base.Results;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Crux.Model.Utility;

namespace Crux.Test.TestData.Core
{
    public static class UserData
    {
        public const string FirstId = "users-656-A";
        public const string SecondId = "users-332-A";
        public const string ThirdId = "users-673-A";
        public const string FourthId = "users-334-A";
        public const string FifthId = "users-8895-A";
        public const string FirstName = "Test Simple";
        public const string SecondName = "Test Admin";
        public const string ThirdName = "NonTenant User";
        public const string FourthName = "Test Super User";
        public const string FifthName = "Test Authoriser";
        public const string FirstPwd = "simple";

        public static User GetFirst()
        {
            return new User
            {
                Id = FirstId,
                ConfigId = UserConfigData.FirstId,
                Email = "simple@lobsterfs.co.uk",
                Right = new UserRight {CanAdmin = false, CanAuth = false, CanSuperuser = false},
                EncryptedPwd = EncryptHelper.Encrypt("simple"),
                Name = UserData.FirstName,
                HasProfile = true,
                ProfileId = VisibleData.FirstId,
                ProfileThumbUrl = VisibleData.GetFirst().ThumbUrl,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                AuthorId = UserData.SecondId,
                AuthorName = UserData.SecondName,
                RegionKey = TenantData.Region,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static User GetSecond()
        {
            return new User
            {
                Id = SecondId,
                ConfigId = UserConfigData.SecondId,
                Name = SecondName,
                Email = "organiser@lobsterfs.co.uk",
                Right = new UserRight {CanAdmin = true, CanAuth = true, CanSuperuser = false},
                EncryptedPwd = EncryptHelper.Encrypt("organiser"),
                ProfileId = VisibleData.SecondId,
                ProfileThumbUrl = VisibleData.GetSecond().ThumbUrl,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                AuthorId = UserData.FourthId,
                AuthorName = UserData.FourthName,
                RegionKey = TenantData.Region,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static User GetThird()
        {
            return new User
            {
                Id = ThirdId,
                ConfigId = UserConfigData.ThirdId,
                Name = ThirdName,
                Email = "other@lobsterfs.co.uk",
                Right = new UserRight {CanAdmin = true, CanAuth = true, CanSuperuser = false},
                EncryptedPwd = EncryptHelper.Encrypt("other"),
                HasProfile = true,
                ProfileId = VisibleData.ThirdId,
                ProfileThumbUrl = VisibleData.GetThird().ThumbUrl,
                TenantId = TenantData.SecondId,
                TenantName = TenantData.SecondName,
                AuthorId = UserData.ThirdId,
                AuthorName = UserData.ThirdName,
                RegionKey = TenantData.Region,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static User GetFourth()
        {
            return new User
            {
                Id = FourthId,
                ConfigId = UserConfigData.FourthId,
                Name = FourthName,
                Email = "super@lobsterfs.co.uk",
                Right = new UserRight {CanAdmin = true, CanAuth = true, CanSuperuser = true},
                EncryptedPwd = EncryptHelper.Encrypt("super"),
                HasProfile = true,
                ProfileId = VisibleData.ThirdId,
                ProfileThumbUrl = VisibleData.GetThird().ThumbUrl,
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                AuthorId = UserData.ThirdId,
                AuthorName = UserData.ThirdName,
                RegionKey = TenantData.Region,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static User GetFifth()
        {
            return new User
            {
                Id = FifthId,
                ConfigId = UserConfigData.FifthId,
                Name = FifthName,
                Email = "auth@lobsterfs.co.uk",
                Right = new UserRight {CanAdmin = false, CanAuth = true, CanSuperuser = false},
                EncryptedPwd = EncryptHelper.Encrypt("auth"),
                TenantId = TenantData.FirstId,
                TenantName = TenantData.FirstName,
                AuthorId = UserData.FourthId,
                AuthorName = UserData.FourthName,
                HasProfile = false,
                ProfileId = VisibleData.FourthId,
                ProfileThumbUrl = VisibleData.GetFourth().ThumbUrl,
                RegionKey = TenantData.Region,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static UserDisplay GetFirstDisplay(bool isFav)
        {
            var source = GetFirst();
            var config = UserConfigData.GetFirst();

            var result = new UserDisplay()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                HasProfile = source.HasProfile,
                ProfileId = source.ProfileId,
                ProfileThumbUrl = source.ProfileThumbUrl,
                Email = source.Email,
                EmailNotify = config.EmailNotify,
                PushNotify = config.PushNotify,
                SmsNotify = config.SmsNotify,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                CanAdmin = source.Right.CanAdmin,
                CanAuth = source.Right.CanAuth,
                CanSuperuser = source.Right.CanSuperuser,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified,
                Favourite = isFav
            };

            return result;
        }

        public static ResultProfile GetFirstProfile()
        {
            var source = GetFirst();

            var result = new ResultProfile()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                ProfileThumbUrl = source.ProfileThumbUrl,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified
            };

            return result;
        }

        public static ResultProfile GetSecondProfile()
        {
            var source = GetSecond();

            var result = new ResultProfile()
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                TenantName = source.TenantName,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                ProfileThumbUrl = source.ProfileThumbUrl,
                RegionKey = source.RegionKey,
                IsActive = source.IsActive,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified
            };

            return result;
        }
    }
}