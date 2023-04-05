import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// init firebase admin
admin.initializeApp();

// export a function [every 1 minutes]
// that will be called when a new message is created
export const scheduleNotification = functions.pubsub.schedule("every 1 minutes")
  .onRun((context) => {
    return pushNotification();
  });

// push notification
function pushNotification() {
  // notification payload
  const payload = {
    notification: {
      title: "Hello World!",
      body: "This is a notification from Firebase Cloud Functions",
      priority: "high",
    },
  };

  // device token
  const token = "YOUR_FCM_TOKEN";

  // send notification to device
  return admin.messaging().sendToDevice(token, payload);
}