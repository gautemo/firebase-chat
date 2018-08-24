# firebase-chat

## Step Three
Now it's time to add authentication

## TODO
* Firebase console > Authentication > Set up sign-in method
```
function snapShotMessages(){
    messagesRef.orderBy('created_at').onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            if (change.type === 'added') {
                app.messages.push(change.doc.data());
            }
        })
    })
}

const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);

auth.onAuthStateChanged(user => {
    if (user !== null) {
        document.querySelector('#firebaseui-auth-container').style.display = 'none';
        app.userIsSignedIn = true;
        snapShotMessages();
    } else {
        document.querySelector('#firebaseui-auth-container').style.display = 'block';
        app.userIsSignedIn = false;
    }
})

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            return false;
        }
    }
    // Other config options...
});

function signOut() {
    auth.signOut().then(function () {
        console.log('Signed Out');
        location.reload();
    }, function (error) {
        console.error('Sign Out Error', error);
    });
}
```
`<div id="firebaseui-auth-container"></div>`
```
    <script src="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.js"></script>
    <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.css" />
```
* Firebase console > Database > Rules `allow read, write: if request.auth.uid != null;`

## DOCS
[Firebase Authentication](https://firebase.google.com/docs/auth/web/start)
