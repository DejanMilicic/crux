import React, { Fragment, useEffect } from "react";

export function Push({ user, children }) {
  useEffect(() => {
    var OneSignal = window.OneSignal || [];
    OneSignal.push(function() {
      OneSignal.init({
        appId: "6b2df6f0-c32e-4fda-b719-efbbac2bf365",
        notifyButton: {
          enable: true
        },
        promptOptions: {
          actionMessage: "We'd like to show you notifications when something happens on Yatter.",
          acceptButtonText: "ALLOW",
          cancelButtonText: "NO THANKS"
        },
        welcomeNotification: {
          title: "Notifications enabled",
          message: "Thanks for subscribing"
        }
      });
    });

    setTimeout(function() {
      OneSignal.push(function() {
        OneSignal.getTags().then(function(tags) {
          if (!tags || !tags.userId) {
            OneSignal.push(function() {
              OneSignal.sendTags({
                userId: user.id,
                tenantId: user.tenantId
              });
            });
          } else if (tags.userId !== user.id) {
            OneSignal.push(function() {
              OneSignal.deleteTags(["userId", "tenantId"], function(deleted) {
                OneSignal.sendTags({
                  userId: user.id,
                  tenantId: user.tenantId
                });
              });
            });
          }
        });
      });
    }, 4000);
  }, [user]);

  return <Fragment>{children}</Fragment>;
}
