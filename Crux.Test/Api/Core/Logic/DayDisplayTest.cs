using System.Threading.Tasks;
using FluentAssertions;
using Crux.Endpoint.Api.Core.Logic;
using Crux.Test.Base;
using NUnit.Framework;
using Crux.Data.Interact.Result;
using System;
using System.Collections.Generic;

namespace Crux.Test.Api.Core.Logic
{
    [TestFixture]
    public class DayDisplayTest : ControllerTest
    {
        [Test(Description = "Tests the DayDisplay Logic Command")]
        public async Task DayDisplayLogicSimple()
        {
            var command = new DayDisplay<MeetingDisplay>
            {
                DateFrom = DateTime.UtcNow.AddHours(-50),
                Days = 5,
                Source = new List<MeetingDisplay>()
            };

            command.Result.Count.Should().Be(0);

            await command.Execute();

            command.Result.Count.Should().Be(5);
        }
    }
}