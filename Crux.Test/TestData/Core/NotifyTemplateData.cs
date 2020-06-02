using System;
using Crux.Model.Core;
using Crux.Model.Utility;

namespace Crux.Test.TestData.Core
{
    public static class NotifyTemplateData
    {
        public const string FirstId = "NotifyTemplates-454-A";
        public const string SecondId = "NotifyTemplates-457-A";
        public const string ThirdId = "NotifyTemplates-345-A";
        public const string FourthId = "NotifyTemplates-7878-A";
        public const string FifthId = "NotifyTemplates-4454-A";
        public const string SixthId = "NotifyTemplates-3455-A";
        public const string SeventhId = "NotifyTemplates-223-A";

        public static NotifyTemplate GetFirst()
        {
            return new NotifyTemplate
            {
                Id = FirstId,
                Name = "welcomeuser",
                EmailTitle = "Welcome User",
                EmailSubject = "Test Welcome User",
                EmailHtml = "Test Welcome User Email HTML User=[[User.Name]] Tenant=[[Tenant.Name]]",
                EmailText = "Test Welcome User Email Plain User=[[User.Name]] Tenant=[[Tenant.Name]]",
                PushTitle = "Test Welcome User",
                PushAction = "Test Welcome",
                PushMessage = "Test Welcome User Message",
                SmsMessage = "Welcome Test User",
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static NotifyTemplate GetSecond()
        {
            return new NotifyTemplate
            {
                Id = SecondId,
                Name = "welcometenant",
                EmailTitle = "Welcome Org",
                EmailSubject = "Test Welcome Org",
                EmailHtml = "Test Welcome Org Email HTML User=[[User.Name]] Tenant=[[Tenant.Name]]",
                EmailText = "Test Welcome Org Email Plain User=[[User.Name]] Tenant=[[Tenant.Name]]",
                PushTitle = "Test Welcome Org",
                PushAction = "Test Welcome",
                PushMessage = "Test Welcome Org Message",
                SmsMessage = "Welcome Test Org",
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static NotifyTemplate GetThird()
        {
            return new NotifyTemplate
            {
                Id = ThirdId,
                Name = "message",
                EmailTitle = "New Test Message",
                EmailSubject = "Test Message Email",
                EmailHtml = "Test Message HTML User=[[User.Name]] Tenant=[[Tenant.Name]]",
                EmailText = "Test Message Plain User=[[User.Name]] Tenant=[[Tenant.Name]]",
                PushTitle = "Test Message Ping",
                PushAction = "Message",
                PushMessage = "Test Message",
                SmsMessage = "Test Message",
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static NotifyTemplate GetFourth()
        {
            return new NotifyTemplate
            {
                Id = FourthId,
                Name = "twofactor",
                EmailTitle = "Two Factor Email",
                EmailSubject = "Two Factor Email",
                EmailHtml = "Two Factor Email HTML Code=[[UserConfig.TwoFactorAuth]]",
                EmailText = "Two Factor Email Plain Code=[[UserConfig.TwoFactorAuth]]",
                PushTitle = "Two Factor",
                PushAction = "Two Factor",
                PushMessage = "Two Factor [[UserConfig.TwoFactorAuth]]",
                SmsMessage = "Two Factor [[UserConfig.TwoFactorAuth]]",
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static NotifyTemplate GetFifth()
        {
            return new NotifyTemplate
            {
                Id = FifthId,
                Name = "attendance",
                EmailTitle = "Attendance",
                EmailSubject = "Test Attendance Email",
                EmailHtml = "Attendance Test HTML User=[[User.Name]] Tenant=[[Tenant.Name]]",
                EmailText = "Attendance Test Plain User=[[User.Name]] Tenant=[[Tenant.Name]]",
                PushTitle = "Test Attendance",
                PushAction = "Attendance",
                PushMessage = "Test Attended",
                SmsMessage = "Test Attendance",
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }

        public static NotifyTemplate GetSixth()
        {
            return new NotifyTemplate
            {
                Id = SixthId,
                Name = "forgot",
                EmailTitle = "Forgot",
                EmailSubject = "Test Forgot Email",
                EmailHtml = "Test Forgot HTML User=[[User.Name]] Tenant=[[Tenant.Name]]",
                EmailText = "Test Forgot Plain User=[[User.Name]] Tenant=[[Tenant.Name]]",
                PushTitle = "Forgot",
                PushAction = "Forgot",
                PushMessage = "Forgot",
                SmsMessage = "Forgot",
                IsActive = true,
                DateCreated = DateHelper.FormatDayStart(DateTime.UtcNow),
                DateModified = DateHelper.FormatDayStart(DateTime.UtcNow)
            };
        }
    }
}