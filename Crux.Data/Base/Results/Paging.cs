namespace Crux.Data.Base.Results
{
    public class Paging
    {
        public int Skip { get; set; }
        public int Intervals { get; set; }
        public int Total { get; set; }
        public bool Loadable { get; set; }
    }
}