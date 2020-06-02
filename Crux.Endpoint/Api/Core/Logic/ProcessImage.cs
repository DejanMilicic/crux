using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Crux.Cloud.Blob;
using Crux.Cloud.Core.Interface;
using Crux.Data.Base;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Model.Core.Confirm;
using Crux.Model.Core;
using Microsoft.AspNetCore.Http;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace Crux.Endpoint.Api.Core.Logic
{
    public class ProcessImage : LogicCommand, IProcessCommand
    {
        public ICloudHandler CloudHandler { get; set; }
        public User CurrentUser { get; set; }
        public string ExistingId { get; set; }
        public string LoadType { get; set; }
        public IFormFile Source { get; set; }
        public ImageFile Model { get; set; }
        public ActionConfirm Result { get; set; }

        public override async Task Execute()
        {
            try
            {
                var thumbKey = Guid.NewGuid().ToString().Replace("-", string.Empty).ToLower() +
                               Path.GetExtension(Source.FileName).ToLower();
                var fullKey = Guid.NewGuid().ToString().Replace("-", string.Empty).ToLower() +
                              Path.GetExtension(Source.FileName).ToLower();

                Model = new ImageFile
                {
                    TenantId = CurrentUser.TenantId,
                    TenantName = CurrentUser.TenantName,
                    AuthorId = CurrentUser.Id,
                    AuthorName = CurrentUser.Name,
                    RegionKey = CurrentUser.RegionKey,
                    ContentType = Source.ContentType,
                    LoadType = LoadType,
                    Name = Source.FileName,
                    Extension = Path.GetExtension(Source.FileName).ToLower(),
                    FullUrl = CloudHandler.Settings.Value.MediaRoot + "ful/" + fullKey,
                    ThumbUrl = CloudHandler.Settings.Value.MediaRoot + "thb/" + thumbKey,
                    ThumbKey = thumbKey,
                    UrlKey = fullKey
                };

                if (!string.IsNullOrEmpty(ExistingId))
                {
                    var existing = new Loader<ImageFile> {Id = ExistingId};
                    await DataHandler.Execute(existing);

                    if (existing.Result != null)
                    {
                        Model = existing.Result;

                        if (!string.IsNullOrEmpty(Model.ThumbKey))
                        {
                            thumbKey = Model.ThumbKey;
                        }
                        else
                        {
                            Model.ThumbKey = new Uri(Model.ThumbUrl).Segments.Last();
                        }

                        if (!string.IsNullOrEmpty(Model.UrlKey))
                        {
                            fullKey = Model.UrlKey;
                        }
                        else
                        {
                            Model.UrlKey = new Uri(Model.ThumbUrl).Segments.Last();
                        }
                    }
                }

                var mainUpload = new UploadCmd {Key = fullKey, ContainerName = "ful"};
                var thumbUpload = new UploadCmd {Key = thumbKey, ContainerName = "thb"};

                using (var stream = Source.OpenReadStream())
                {
                    var format = Image.DetectFormat(stream);
                    var image = Image.Load(stream, out format);

                    Model.Width = image.Width;
                    Model.Height = image.Height;
                    Model.MimeType = Source.ContentType;

                    if (image.Width > 1920)
                    {
                        image = ResizeImageToWidth(image, 1920);
                    }

                    if (image.Height > 1920)
                    {
                        image = ResizeImageToHeight(image, 1920);
                    }

                    image.Save(mainUpload.Data, format);
                    image = ResizeImageToWidth(image);
                    image.Save(thumbUpload.Data, format);

                    image.Dispose();
                }

                await CloudHandler.Execute(mainUpload);
                await CloudHandler.Execute(thumbUpload);

                Model.Length = mainUpload.Length;

                var persist = new Persist<ImageFile> {Model = Model};
                await DataHandler.Execute(persist);

                Result = ActionConfirm.CreateSuccess("File " + Model.Name + " Loaded");
                Result.Value = persist.Model;
            }
            catch (Exception exception)
            {
                Result = ActionConfirm.CreateFailure(exception.Message);
            }
        }

        private Image<Rgba32> ResizeImageToHeight(Image<Rgba32> image, int maxHeight = 320)
        {
            if (image.Height > maxHeight)
            {
                var ratioX = (double) maxHeight / image.Height;
                var ratioY = (double) image.Width;
                var ratio = Math.Min(ratioX, ratioY);

                var newWidth = (int) (image.Width * ratio);
                var newHeight = (int) (image.Height * ratio);

                image.Mutate(x => x.Resize(newWidth, newHeight));
                return image;
            }

            return image;
        }

        private Image<Rgba32> ResizeImageToWidth(Image<Rgba32> image, int maxWidth = 320)
        {
            if (image.Width > maxWidth)
            {
                var ratioX = (double) image.Height;
                var ratioY = (double) maxWidth / image.Width;
                var ratio = Math.Min(ratioX, ratioY);

                var newWidth = (int) (image.Width * ratio);
                var newHeight = (int) (image.Height * ratio);

                image.Mutate(x => x.Resize(newWidth, newHeight));
                return image;
            }

            return image;
        }
    }
}