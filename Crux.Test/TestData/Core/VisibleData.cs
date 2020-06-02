using System;
using Crux.Data.Core.Results;
using Crux.Model.Core;
using Crux.Model.Utility;
using Crux.Test.TestData.Core.Mock;
using Microsoft.AspNetCore.Http;

namespace Crux.Test.TestData.Core
{
    public static class VisibleData
    {
        public const string FirstId = "ImageFiles-6561-A";
        public const string SecondId = "ImageFiles-4442-A";
        public const string ThirdId = "ImageFiles-3453-A";
        public const string FourthId = "ImageFiles-7654-A";
        public const string FifthId = "ImageFiles-2225-A";
        public const string SixthId = "ImageFiles-5556-A";

        public static ImageFile GetFirst()
        {
            return new ImageFile
            {
                Id = FirstId,
                Name = "pupil.png",
                AuthorId = UserData.FirstId,
                ContentType = "image/png",
                Height = 400,
                Width = 400,
                Length = 2000,
                IsImage = true,
                MimeType = "image/png",
                ThumbKey = "39076abb8ed44e92a555ebfccd10ae60",
                UrlKey = "c86feac3f98441c58df28118b2b9603e",
                FullUrl = "https://cruxtest.blob.core.windows.net/ful/c86feac3f98441c58df28118b2b9603e.jpg",
                ThumbUrl = "https://cruxtest.blob.core.windows.net/thb/39076abb8ed44e92a555ebfccd10ae60.jpg",
                LoadType = "test",
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                AuthorName = UserData.FirstName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static ImageFile GetSecond()
        {
            return new ImageFile
            {
                Id = SecondId,
                Name = "organiser.png",
                AuthorId = UserData.FourthId,
                ContentType = "image/png",
                Height = 400,
                Width = 400,
                Length = 2000,
                IsImage = true,
                MimeType = "image/png",
                ThumbKey = "c7d22fab9f8b4705838ee072d83e232a",
                UrlKey = "6b766d3ea4b0449b821267f5958322ae",
                FullUrl = "https://cruxtest.blob.core.windows.net/ful/6b766d3ea4b0449b821267f5958322ae.jpg",
                ThumbUrl = "https://cruxtest.blob.core.windows.net/thb/c7d22fab9f8b4705838ee072d83e232a.jpg",
                LoadType = "test",
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                AuthorName = UserData.FourthName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static ImageFile GetThird()
        {
            return new ImageFile
            {
                Id = ThirdId,
                Name = "nontenant.png",
                AuthorId = UserData.ThirdId,
                ContentType = "image/jpg",
                Height = 400,
                Width = 400,
                Length = 2000,
                IsImage = true,
                MimeType = "image/jpg",
                ThumbKey = "1f3b51a8574a418b924c05085461c552",
                UrlKey = "aefebd91e1e445f4aea6dfb011c548da",
                FullUrl = "https://cruxtest.blob.core.windows.net/ful/aefebd91e1e445f4aea6dfb011c548da.jpg",
                ThumbUrl = "https://cruxtest.blob.core.windows.net/thb/1f3b51a8574a418b924c05085461c552.jpg",
                LoadType = "test",
                TenantId = TenantData.SecondId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.SecondName,
                AuthorName = UserData.ThirdName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static ImageFile GetFourth()
        {
            return new ImageFile
            {
                Id = FourthId,
                Name = "super.png",
                AuthorId = UserData.FourthId,
                ContentType = "image/jpg",
                Height = 400,
                Width = 400,
                Length = 2000,
                IsImage = true,
                MimeType = "image/jpg",
                ThumbKey = "e585d9b8f10f4e70885c4cccf00568f6",
                UrlKey = "6a557a438071431baffed84e19ca7593",
                FullUrl = "https://cruxtest.blob.core.windows.net/ful/6a557a438071431baffed84e19ca7593.jpg",
                ThumbUrl = "https://cruxtest.blob.core.windows.net/thb/e585d9b8f10f4e70885c4cccf00568f6.jpg",
                LoadType = "test",
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                AuthorName = UserData.FourthName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static ImageFile GetFifth()
        {
            return new ImageFile
            {
                Id = FifthId,
                Name = "mentor.png",
                AuthorId = UserData.FifthId,
                ContentType = "image/png",
                Height = 400,
                Width = 400,
                Length = 2000,
                IsImage = true,
                MimeType = "image/png",
                ThumbKey = "67d0802ef8a04d79bc633c49be5e314a",
                UrlKey = "6b9a1159256b4d81bc59f240326c90eb",
                FullUrl = "https://cruxtest.blob.core.windows.net/ful/6b9a1159256b4d81bc59f240326c90eb.jpg",
                ThumbUrl = "https://cruxtest.blob.core.windows.net/thb/67d0802ef8a04d79bc633c49be5e314a.jpg",
                LoadType = "test",
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                AuthorName = UserData.FifthName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static ImageFile GetSixth()
        {
            return new ImageFile
            {
                Id = SixthId,
                Name = "school.png",
                AuthorId = UserData.FourthId,
                ContentType = "image/png",
                Height = 400,
                Width = 400,
                Length = 2000,
                IsImage = true,
                MimeType = "image/png",
                ThumbKey = "67d0802ef8a04d79bc633c49be5e314a",
                UrlKey = "6b9a1159256b4d81bc59f240326c90eb",
                FullUrl = "https://cruxtest.blob.core.windows.net/ful/6b9a1159256b4d81bc59f240326c90eb.jpg",
                ThumbUrl = "https://cruxtest.blob.core.windows.net/thb/67d0802ef8a04d79bc633c49be5e314a.jpg",
                LoadType = "test",
                TenantId = TenantData.FirstId,
                RegionKey = TenantData.Region,
                TenantName = TenantData.FirstName,
                AuthorName = UserData.FourthName,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static VisibleDisplay GetFirstDisplay()
        {
            var source = GetFirst();

            var result = new VisibleDisplay
            {
                Id = source.Id,
                Name = source.Name,
                TenantId = source.TenantId,
                AuthorId = source.AuthorId,
                AuthorName = source.AuthorName,
                TenantName = source.TenantName,
                ContentType = source.ContentType,
                FullUrl = source.FullUrl,
                Height = source.Height,
                Length = source.Length,
                RegionKey = source.RegionKey,
                ThumbUrl = source.ThumbUrl,
                Width = source.Width,
                IsImage = true,
                IsActive = true,
                DateCreated = source.DateCreated,
                DateModified = source.DateModified
            };

            return result;
        }

        public static IFormFile GetFile()
        {
            return new FakeFile();
        }
    }
}