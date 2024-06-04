
import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { firebaseConfig } from "../utils/app-constants"

const app = initializeApp(firebaseConfig)
const messaging = getMessaging(app);

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: 'BBpv9rTpo-ZVYTfI2hKehtLHkz465LlPjOHV4hOu7PwNlx20gpCu68Z2ZEKZFcl-_GNnq0brtjtfIRe3j6nmmZI' })
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken)
            } else {
                console.log('No registration token available. Request permission to generate one.')
            }
        })
        .catch((err) => {
            console.log('An error occurred while retrieving token. ', err)
        });
}

requestForToken()

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            console.log("payload", payload)
            resolve(payload)
        });
    });

