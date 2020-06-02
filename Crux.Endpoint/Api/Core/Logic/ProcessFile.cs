using System;
using System.Linq;
using System.Threading.Tasks;
using Crux.Cloud.Core.Interface;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.Api.Base.Interface;
using Crux.Model.Base;
using Crux.Model.Core;
using Crux.Model.Core.Confirm;
using Microsoft.AspNetCore.Http;

namespace Crux.Endpoint.Api.Core.Logic
{
    public class ProcessFile : LogicCommand, IProcessCommand
    {
        public ICloudHandler CloudHandler { get; set; }
        public User CurrentUser { get; set; }
        public IFormFile Source { get; set; }
        public VisibleFile Model { get; set; }
        public ActionConfirm Result { get; set; }

        public override async Task Execute()
        {
            IProcessCommand processor = null;

            if (IsImage())
            {
                processor = new ProcessImage
                {
                    Source = Source, CurrentUser = CurrentUser, LoadType = "File Upload", CloudHandler = CloudHandler,
                    DataHandler = DataHandler
                };
            }

            else if (IsVideo())
            {
            }

            else if (IsDocument())
            {
            }

            if (processor != null)
            {
                await LogicHandler.Execute(processor);
                if (processor.Result != null && processor.Result.Success)
                {
                    Model = processor.Result.Value as VisibleFile;
                    Result = processor.Result;
                }
                else
                {
                    Result = ActionConfirm.CreateFailure("File " + Source.FileName + " -> failed to load");
                }
            }
            else
            {
                Result = ActionConfirm.CreateFailure("File " + Source.FileName + " -> type not supported");
            }
        }

        private bool IsImage()
        {
            if (Source != null)
            {
                if (Source.ContentType.Contains("image"))
                {
                    return true;
                }

                string[] formats = {".jpg", ".png", ".gif", ".jpeg"};

                return formats.Any(item => Source.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase));
            }

            return false;
        }

        private bool IsVideo()
        {
            if (Source != null)
            {
                if (Source.ContentType.Contains("video"))
                {
                    return true;
                }

                string[] formats = {".avi", ".mpg", ".mpeg", ".mp4", ".mov", ".mkv"};

                return formats.Any(item => Source.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase));
            }

            return false;
        }

        private bool IsDocument()
        {
            if (Source != null)
            {
                if (Source.ContentType.Contains("word") || Source.ContentType.Contains("pdf") ||
                    Source.ContentType.Contains("powerpoint") || Source.ContentType.Contains("excel"))
                {
                    return true;
                }

                string[] formats = {".docx", ".doc", ".xls", ".xlsx", ".pdf", ".ppt", ".pptx"};

                return formats.Any(item => Source.FileName.EndsWith(item, StringComparison.OrdinalIgnoreCase));
            }

            return false;
        }
    }
}