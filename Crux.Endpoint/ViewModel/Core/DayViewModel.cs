using Crux.Model.Base.Interface;
using Crux.Model.Utility;
using System;
using System.Collections.Generic;

namespace Crux.Endpoint.ViewModel.Core
{
    public class DayViewModel<T> where T : IDated
    {
        public int DayCode { get; set; }
        public int Total { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public DateTime When { get; set; }
        public IEnumerable<T> Data { get; set; }

        public int SetDate(DateTime when)
        {
            When = when;
            Start = DateHelper.FormatDayStart(when);
            End = DateHelper.FormatDayEnd(when);

            var code = Convert.ToString(when.Year);

            if (when.DayOfYear < 10)
            {
                code = code + "00" + when.DayOfYear;
            }
            else if (when.DayOfYear < 100)
            {
                code = code + "0" + when.DayOfYear;
            }
            else
            {
                code += when.DayOfYear;
            }

            DayCode = int.Parse(code);
            return DayCode;
        }

        public bool IsBetween(DateTime when)
        {
            return when >= Start && when <= End;
        }
    }
}