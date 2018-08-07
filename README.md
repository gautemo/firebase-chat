# firebase-chat

## Step Two
Time to add messages to Cloud Firestore

## TODO
* Firebase console > Database > Create database
* Initialize firebase. Firebase console > Project overview > Add Firebase to your web app
*
```
const db = firebase.firestore();
const messagesRef = db.collection("messages");
```
*
```
messagesRef.add(message)
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
});
```
*
```
messagesRef.orderBy('created_at').onSnapshot(function (snapshot){
    snapshot.docChanges().forEach(function(change){
        if(change.type === 'added'){
            app.messages.push(change.doc.data());
        }
    })
})
```

## DOCS
[Firebase Cloud Firestore](https://firebase.google.com/docs/firestore/quickstart)

## Firebase Realtime database
Alternativly you could check out Firebase Realtime database. There are some [differences](https://firebase.google.com/docs/database/rtdb-vs-firestore). But Cloud Firestore is Firebase's new flagship database.
