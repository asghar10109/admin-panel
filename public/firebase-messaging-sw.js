importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

const firebaseConfig = {
    apiKey: "AIzaSyB_YpUPhI90N2TL2QpW9jEP7UWGtj-nfO8",
    authDomain: "push-notification-6e93d.firebaseapp.com",
    projectId: "push-notification-6e93d",
    storageBucket: "push-notification-6e93d.appspot.com",
    messagingSenderId: "779345314410",
    appId: "1:779345314410:web:0e59a15dde604bc7460013"
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload)
    
    const notification = payload.data
    if (!notification) {
        return
    }

    const notificationOptions = {
        body: payload.notification.body,
    };

    return self.registration.showNotification(notificationOptions)
});



