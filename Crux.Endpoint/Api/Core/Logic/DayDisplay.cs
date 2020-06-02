using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Crux.Endpoint.Api.Base;
using Crux.Endpoint.ViewModel.Core;
using Crux.Model.Base.Interface;

namespace Crux.Endpoint.Api.Core.Logic
{
    public class DayDisplay<T> : LogicCommand where T : IDated
    {
        public DateTime DateFrom { get; set; }
        public int Days { get; set; }
        public IEnumerable<T> Source { get; set; }
        public IList<DayViewModel<T>> Result { get; set; } = new List<DayViewModel<T>>();

        public override async Task Execute()
        {
            for (var i = 0; i < Days; i++)
            {
                var when = DateFrom.AddDays(i);
                var model = new DayViewModel<T>();
                model.SetDate(when);
                model.Data = Source.Where(s => model.IsBetween(s.When));
                model.Total = model.Data.Count();
                Result.Add(model);
            }

            await Task.CompletedTask;
        }
    }
}