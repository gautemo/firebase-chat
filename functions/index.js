const functions = require('firebase-functions');

exports.createMessage = functions.firestore
    .document('messages/{msg}')
    .onCreate((snap, context) => {
        const msgObj = snap.data();
        msgObj.message = msgObj.message.replace(new RegExp('fuck|idiot','gi'), '🤬');
        msgObj.message = msgObj.message.replace(new RegExp('shit','gi'), '💩');
        return snap.ref.update({message: msgObj.message});
    });