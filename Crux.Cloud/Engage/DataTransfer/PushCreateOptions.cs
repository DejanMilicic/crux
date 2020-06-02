using Crux.Cloud.Engage.Interface;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Crux.Cloud.Engage.DataTransfer
{
    public class PushCreateOptions
    {
        public PushCreateOptions()
        {
            Contents = new Dictionary<string, string>();
            Headings = new Dictionary<string, string>();
        }

        [JsonProperty("app_id")] public Guid AppId { get; set; }
        [JsonProperty("contents")] public IDictionary<string, string> Contents { get; set; }
        [JsonProperty("headings")] public IDictionary<string, string> Headings { get; set; }
        [JsonProperty("data")] public IDictionary<string, string> Data { get; set; }
        [JsonProperty("filters")] public IList<IPushFilter> Filters { get; set; }
        [JsonProperty("include_player_ids")] public IList<string> IncludePlayerIds { get; set; }
        [JsonProperty("included_segments")] public IList<string> IncludedSegments { get; set; }
        [JsonProperty("chrome_web_icon")] public string ChromeWebIcon { get; set; }
        [JsonProperty("subtitle")] public IDictionary<string, string> Subtitle { get; set; }
        [JsonProperty("template_id")] public string TemplateId { get; set; }
        [JsonProperty("content_available")] public bool? ContentAvailable { get; set; }
        [JsonProperty("mutable_content")] public bool? MutableContent { get; set; }
        [JsonProperty("url")] public string Url { get; set; }
        [JsonProperty("ios_attachments")] public IDictionary<string, string> IosAttachments { get; set; }
        [JsonProperty("big_picture")] public string BigPictureForAndroid { get; set; }
        [JsonProperty("adm_big_picture")] public string BigPictureForAmazon { get; set; }
        [JsonProperty("chrome_big_picture")] public string BigPictureForChrome { get; set; }
        [JsonProperty("buttons")] public IList<ActionButtonField> ActionButtons { get; set; }
        [JsonProperty("web_buttons")] public IList<WebButtonField> WebButtons { get; set; }
        [JsonProperty("ios_category")] public string IosCategory { get; set; }

        [JsonProperty("android_background_layout")]
        public IList<AndroidBackgroundLayoutField> AndroidBackgroundLayout { get; set; }

        [JsonProperty("small_icon")] public string SmallAndroidIcon { get; set; }
        [JsonProperty("large_icon")] public string LargeAndroidIcon { get; set; }
        [JsonProperty("adm_small_icon")] public string SmallAmazonIcon { get; set; }
        [JsonProperty("adm_large_icon")] public string LargeAmazonIcon { get; set; }
        [JsonProperty("chrome_icon")] public string ChromeIcon { get; set; }
        [JsonProperty("ios_sound")] public string IosSound { get; set; }
        [JsonProperty("android_sound")] public string AndroidSound { get; set; }
        [JsonProperty("adm_sound")] public string AmazonSound { get; set; }
        [JsonProperty("wp_sound")] public string WindowsPhoneSound { get; set; }
        [JsonProperty("wp_wns_sound")] public string WindowsRtPhoneSound { get; set; }
        [JsonProperty("android_led_color")] public string AndroidLedColor { get; set; }
        [JsonProperty("android_accent_color")] public string AndroidAccentColor { get; set; }
        [JsonProperty("android_visibility")] public string AndroidVisibility { get; set; }
        [JsonProperty("ios_badgeType")] public string IosBadgeType { get; set; }
        [JsonProperty("ios_badgeCount")] public int? IosBadgeCount { get; set; }
        [JsonProperty("collapse_id")] public string CollapseId { get; set; }

        [JsonProperty("send_after")]
        [JsonConverter(typeof(CustomDateTimeConverter))]
        public DateTime? SendAfter { get; set; }

        [JsonProperty("delayed_option")] public string DelayedOption { get; set; }
        [JsonProperty("delivery_time_of_day")] public string DeliveryTimeOfDay { get; set; }
        [JsonProperty("ttl")] public int? TimeToLive { get; set; }
        [JsonProperty("priority")] public int? Priority { get; set; }
        [JsonProperty("android_group")] public string AndroidGroup { get; set; }

        [JsonProperty("android_group_message")]
        public string AndroidGroupMessage { get; set; }

        [JsonProperty("adm_group")] public string AmazonGroup { get; set; }
        [JsonProperty("adm_group_message")] public string AmazonGroupMessage { get; set; }
        [JsonProperty("isIos")] public bool? DeliverToIos { get; set; }
        [JsonProperty("isAndroid")] public bool? DeliverToAndroid { get; set; }
        [JsonProperty("isAnyWeb")] public bool? DeliverToAnyWeb { get; set; }
        [JsonProperty("isChromeWeb")] public bool? DeliverToChromeWeb { get; set; }
        [JsonProperty("isFirefox")] public bool? DeliverToFirefox { get; set; }
        [JsonProperty("isSafari")] public bool? DeliverToSafari { get; set; }
        [JsonProperty("isWP")] public bool? DeliverToWindowsPhone { get; set; }
        [JsonProperty("isWP_WNS")] public bool? DeliverToWindowsRtPhone { get; set; }
        [JsonProperty("isAdm")] public bool? DeliverToAmazon { get; set; }
        [JsonProperty("isChrome")] public bool? DeliverToChrome { get; set; }
    }
}