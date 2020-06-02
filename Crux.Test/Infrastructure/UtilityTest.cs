using System;
using System.Collections.Generic;
using FluentAssertions;
using Crux.Model.Utility;
using NUnit.Framework;

namespace Crux.Test.Infrastructure
{
    [TestFixture]
    public class UtilityTest
    {
        [Test(Description = "Tests the EncryptTest")]
        public void EncryptTest()
        {
            var input = "xyz";
            var result = EncryptHelper.Encrypt(input);
            result.Should().NotBe(input);
        }

        [Test(Description = "Tests the EncryptTest")]
        public void EncryptNullTest()
        {
            var input = "";
            Assert.Throws<ArgumentNullException>(() => EncryptHelper.Hash(input));
        }

        [Test(Description = "Tests the FacebookSecretTest")]
        public void FacebookSecretTest()
        {
            var result =
                EncryptHelper.GenerateFacebookSecretProof("738972172901573", "70164659cc4684343c3764aad1d63157");
            result.Should().NotBeNull();
        }

        [Test(Description = "Tests the EmailValidTest")]
        public void EmailValidTest()
        {
            var result = StringHelper.IsValidEmail("test@test.com");
            result.Should().BeTrue();
        }

        [Test(Description = "Tests the EmailInValidTest")]
        public void EmailInValidTest()
        {
            var result = StringHelper.IsValidEmail("testtest...com");
            result.Should().BeFalse();
        }

        [Test(Description = "Tests the EmailNullTest")]
        public void EmailNullTest()
        {
            var result = StringHelper.IsValidEmail(string.Empty);
            result.Should().BeFalse();
        }

        [Test(Description = "Tests the EmailMadnessTest")]
        public void EmailMadnessTest()
        {
            var result =
                StringHelper.IsValidEmail(
                    @"^$%^$%^$%^$&^&$%^$^&%$^&%%^^&*&*%&^*%^&$%£$@@@$£$!£!£$!£$%£%£%^^&*^*/-*/-*/--+@@");
            result.Should().BeFalse();
        }

        [Test(Description = "Tests the GenerateCodeTest")]
        public void GenerateCodeTest()
        {
            var result = StringHelper.GenerateCode(20);
            result.Length.Should().Be(20);
        }

        [Test(Description = "Tests the IndexOfNthTest")]
        public void IndexOfNthTest()
        {
            var result = StringHelper.IndexOfNth("gjhgjhghjgjhgjhgjhgjgjgh", "h");
            result.Should().Be(2);
        }

        [Test(Description = "Tests the IndexOfNthTest Over")]
        public void IndexOfNthTestOver()
        {
            var result = StringHelper.IndexOfNth("gjhgjhghjgjhgjhgjhgjgjgh", "h", 3);
            result.Should().Be(7);
        }

        [Test(Description = "Tests the IndexOfNthTest Under")]
        public void IndexOfNthTestUnder()
        {
            Assert.That(() => StringHelper.IndexOfNth("gjhgjhghjgjhgjhgjhgjgjgh", "h", -1),
                Throws.TypeOf<ArgumentException>());
        }

        [Test(Description = "Tests the RandomList")]
        public void RandomListTest()
        {
            var result = EncryptHelper.RandomList(new List<int>() { 0, 1, 2});
            result.Should().BeLessThan(3);
        }

        [Test(Description = "Tests the FormatMonthStart")]
        public void FormatMonthStartTest()
        {
            var input = DateTime.UtcNow;
            var result = DateHelper.FormatMonthStart(input);
            result.Should().NotBe(input);
        }

        [Test(Description = "Tests the FormatDayStart")]
        public void FormatDayStartTest()
        {
            var input = DateTime.UtcNow;
            var result = DateHelper.FormatDayStart(input);
            result.Should().NotBe(input);
        }

        [Test(Description = "Tests the FormatDayEnd")]
        public void FormatDayEndTest()
        {
            var input = DateTime.UtcNow;
            var result = DateHelper.FormatDayEnd(input);
            result.Should().NotBe(input);
        }

        [Test(Description = "Tests the FormatDateSortable")]
        public void FormatDateSortableTest()
        {
            var input = DateTime.UtcNow;
            var result = DateHelper.FormatDateSortable(input);
            result.Should().NotBe(0);
        }

    }
}