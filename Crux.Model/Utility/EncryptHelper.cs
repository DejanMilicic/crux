using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Crux.Model.Utility
{
    public static class EncryptHelper
    {
        private static Random randomizer;

        public static string GenerateFacebookSecretProof(string facebookAccessToken, string facebookAuthAppSecret)
        {
            var keyBytes = Encoding.UTF8.GetBytes(facebookAuthAppSecret);
            var messageBytes = Encoding.UTF8.GetBytes(facebookAccessToken);
            var hmacsha256 = new HMACSHA256(keyBytes);
            var hash = hmacsha256.ComputeHash(messageBytes);
            var builderHash = new StringBuilder();

            foreach (byte t in hash)
            {
                builderHash.Append(t.ToString("x2"));
            }

            return builderHash.ToString();
        }

        public static string Hash(string text)
        {
            if (string.IsNullOrEmpty(text))
            {
                throw new ArgumentNullException("The string which needs to be encrypted can not be null.");
            }

            HashAlgorithm algorithm = new SHA1CryptoServiceProvider();

            byte[] input = Encoding.UTF8.GetBytes(text);
            byte[] hash = algorithm.ComputeHash(input);

            return Encoding.UTF8.GetString(hash, 0, hash.Length);
        }

        public static string Encrypt(string text)
        {
            var salt = "df563&$%£bc.";
            var salted = Hash(text) + salt;
            return Hash(salted);
        }

        public static int Randomizer(int from, int to)
        {
            if (randomizer == null)
            {
                randomizer = new Random();
            }

            return randomizer.Next(from, to);
        }

        public static T RandomList<T>(IEnumerable<T> list)
        {
            var random = Randomizer(0, list.Count());
            return list.ElementAt(random);
        }

        public static decimal ConvertMB(long bytes)
        {
            var formatted = Convert.ToDecimal(bytes);
            formatted /= 1000000;
            return Math.Round(formatted, 2);
        }
    }
}