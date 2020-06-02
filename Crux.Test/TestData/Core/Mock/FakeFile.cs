using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Crux.Test.TestData.Core.Mock
{
    public class FakeFile : IFormFile
    {
        public string ImagePath { get; set; } = @"C:\Develop\Crux\Crux.Test\TestData\Asset\";
        public string ContentType { get; set; } = "image/png";
        public string ContentDisposition => throw new NotImplementedException();
        public IHeaderDictionary Headers => throw new NotImplementedException();
        public long Length => 500;

        public string Name
        {
            get => FileName;
            set => FileName = value;
        }

        public string FileName { get; set; } = "400-square.png";

        public void CopyTo(Stream target)
        {
            throw new NotImplementedException();
        }

        public Task CopyToAsync(Stream target, CancellationToken cancellationToken = default)
        {
            throw new NotImplementedException();
        }

        public Stream OpenReadStream()
        {
            return File.OpenRead(ImagePath + FileName);
        }
    }
}