using System;

namespace Crux.Model.Utility
{
    public static class DateHelper
    {
        public static DateTime FormatDayStart(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day);
        }

        public static DateTime FormatDayEnd(DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 23, 59, 59);
        }

        public static DateTime FormatMonthStart(DateTime date)
        {
            return new DateTime(date.Year, date.Month, 1);
        }

        public static int FormatDateSortable(DateTime date)
        {
            var monthText = date.Month < 10 ? "0" + date.Month : date.Month.ToString();
            var dateText = date.Year.ToString() + monthText + date.Day.ToString();
            return int.Parse(dateText);
        }
    }
}