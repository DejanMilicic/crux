using Crux.Model.Base.Interface;

namespace Crux.Data.Base.Results
{
    public class ResultNamed : Result, IResultNamed
    {
        public string Name { get; set; } = string.Empty;
        public override bool CanFavourite { get; set; } = true;
    }
}