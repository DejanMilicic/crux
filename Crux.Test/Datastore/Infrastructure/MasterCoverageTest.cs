using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Crux.Data.Core.Results;
using Crux.Data.Interact.Result;
using Crux.Model.Base;
using Crux.Model.Core;
using Crux.Model.Interact;
using Crux.Test.Base;
using Crux.Test.TestData.Core;
using Crux.Test.TestData.Interact;
using FluentAssertions;
using NUnit.Framework;

namespace Crux.Test.Datastore.Infrastructure
{
    [TestFixture]
    public class MasterCoverageTest : ControllerTest
    {
        [Test(Description = "Tests the TenantMaster for coverage")]
        public void TenantMasterTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Tenant, TenantMaster>();
                cfg.CreateMap<TenantMaster, Tenant>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<TenantMaster>(TenantData.GetFirst());
            var document = mapper.Map<Tenant>(master);

            master.Should().NotBeNull();
            document.Should().NotBeNull();
        }

        [Test(Description = "Tests the TenantStat for coverage")]
        public void TenantStatTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Tenant, TenantStat>();
                cfg.CreateMap<TenantStat, Tenant>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<TenantStat>(TenantData.GetFirst());
            var document = mapper.Map<Tenant>(master);

            master.FileCount = 1;
            master.FileSize = 1;
            master.UserCount = 1;
            master.FileCount.Should().Be(1);
            master.FileSize.Should().Be(1);
            master.UserCount.Should().Be(1);

            master.Should().NotBeNull();
            document.Should().NotBeNull();
        }

        [Test(Description = "Tests the FavMaster for coverage")]
        public void FavMasterTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Fav, FavMaster>();
                cfg.CreateMap<FavMaster, Fav>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<FavMaster>(FavData.GetFirst());
            var document = mapper.Map<Fav>(master);

            master.Should().NotBeNull();
            document.Should().NotBeNull();
        }

        [Test(Description = "Tests the NotesMaster for coverage")]
        public void NotesMasterTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Notes, NotesMaster>();
                cfg.CreateMap<NotesMaster, Notes>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<NotesMaster>(NoteData.GetFirst());
            var document = mapper.Map<Notes>(master);

            master.Should().NotBeNull();
            document.Should().NotBeNull();

            master.Authors = new List<string>();
            master.Authors.Count().Should().Be(0);
        }

        [Test(Description = "Tests the UserMaster for coverage")]
        public void UserMasterTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, UserMaster>();
                cfg.CreateMap<UserMaster, User>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<UserMaster>(UserData.GetFirst());
            var document = mapper.Map<User>(master);

            master.Should().NotBeNull();
            document.Should().NotBeNull();

            master.HasPhone = true;
            master.HasPhone.Should().BeTrue();
            master.CanAdmin = true;
            master.CanAdmin.Should().BeTrue();
            master.CanSuperuser = true;
            master.CanSuperuser.Should().BeTrue();
            master.CanAuth = true;
            master.CanAuth.Should().BeTrue();
            master.CanFavourite = true;
            master.CanFavourite.Should().BeTrue();
            master.ProfileThumbUrl = "test";
            master.ProfileThumbUrl.Should().Be("test");
        }

        [Test(Description = "Tests the VisibleMaster for coverage")]
        public void VisibleMasterTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<VisibleFile, VisibleMaster>();
                cfg.CreateMap<VisibleMaster, VisibleFile>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<VisibleMaster>(VisibleData.GetFirst());
            var document = mapper.Map<VisibleFile>(master);

            master.Should().NotBeNull();
            document.Should().NotBeNull();
            document.IsImage.Should().BeTrue();
            document.IsVideo.Should().BeFalse();
            document.IsDocument.Should().BeFalse();
        }

        [Test(Description = "Tests the MsgMaster for coverage")]
        public void MsgMasterTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Msg, MsgMaster>();
                cfg.CreateMap<MsgMaster, Msg>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<MsgMaster>(MsgData.GetFirst());
            var document = mapper.Map<Msg>(master);

            master.Should().NotBeNull();
            document.Should().NotBeNull();
        }

        [Test(Description = "Tests the MeetingMaster for coverage")]
        public void MeetingMasterTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Meeting, MeetingMaster>();
                cfg.CreateMap<MeetingMaster, Meeting>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<MeetingMaster>(MeetingData.GetFirst());
            var document = mapper.Map<Meeting>(master);

            master.Should().NotBeNull();
            document.Should().NotBeNull();
        }

        [Test(Description = "Tests the AttendanceMaster for coverage")]
        public void AttendanceMasterTest()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Attendance, AttendanceMaster>();
                cfg.CreateMap<AttendanceMaster, Attendance>();
            });

            var mapper = new Mapper(config);
            var master = mapper.Map<AttendanceMaster>(AttendanceData.GetFirst());
            var document = mapper.Map<Attendance>(master);

            master.Should().NotBeNull();
            document.Should().NotBeNull();
        }

    }
}