using System;
using System.Globalization;
using System.Text.RegularExpressions;

namespace Crux.Model.Utility
{
    public static class StringHelper
    {
        private static bool Invalid { get; set; }

        public static bool IsValidEmail(string email)
        {
            Invalid = false;
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }

            try
            {
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper, RegexOptions.None,
                    TimeSpan.FromMilliseconds(500));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }

            if (Invalid)
            {
                return false;
            }

            try
            {
                return Regex.IsMatch(email,
                    @"^(?("")("".+?(?<!\\)""@)|(([0-9a-z]((\.(?!\.))|[-!#\$%&'\*\+/=\?\^`\{\}\|~\w])*)(?<=[0-9a-z])@))" +
                    @"(?(\[)(\[(\d{1,3}\.){3}\d{1,3}\])|(([0-9a-z][-\w]*[0-9a-z]*\.)+[a-z0-9][\-a-z0-9]{0,22}[a-z0-9]))$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(1000));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }

        public static int IndexOfNth(string input, string character, int nth = 1)
        {
            if (nth <= 0)
            {
                throw new ArgumentException("Can not find the zeroth index of substring in string. Must start with 1");
            }

            int offset = input.IndexOf(character);
            for (int i = 1; i < nth; i++)
            {
                if (offset == -1)
                {
                    return -1;
                }

                offset = input.IndexOf(character, offset + 1);
            }

            return offset;
        }

        public static string GenerateCode(int length)
        {
            var code = Guid.NewGuid().ToString();
            code = code.Replace("-", string.Empty);
            return code.Substring(0, length).ToUpper();
        }

        private static string DomainMapper(Match match)
        {
            var idn = new IdnMapping();
            var domainName = match.Groups[2].Value;

            try
            {
                domainName = idn.GetAscii(domainName);
            }
            catch (ArgumentException)
            {
                Invalid = true;
            }

            return match.Groups[1].Value + domainName;
        }
    }
}