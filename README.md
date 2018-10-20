# firebase-chat

## Step Three
Now it's time to add authentication

## TODO
* Firebase console > Authentication > Set up sign-in method
```
<div id="firebaseui-auth-container"></div>
```
```
<button onclick="signOut()" class="signout signed-in-show" type="button">Sign out</button>
```
```
    <script src="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.js"></script>
    <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.css" />
```
Add `signed-in-show` class to elements that should now be shown during signed out state
```
.signout{
    float: right;
}

.hide{
    display: none;
}
```
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
        const signedInShow = document.querySelectorAll('.signed-in-show');
        signedInShow.forEach(function(el) {
            el.classList.remove('hide');
        });
        snapShotMessages();
    } else {
        document.querySelector('#firebaseui-auth-container').style.display = 'block';
        const signedInShow = document.querySelectorAll('.signed-in-show');
        signedInShow.forEach(function(el) {
            el.classList.add('hide');
        });
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
* Firebase console > Database > Rules `allow read, write: if request.auth.uid != null;`

## DOCS
[Firebase Authentication](https://firebase.google.com/docs/auth/web/start)
