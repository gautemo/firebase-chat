const db = firebase.firestore();
const messagesRef = db.collection("messages");

const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        newMessage: '',
        userIsSignedIn: false
    },
    methods: {
        addMsg: function () {
            if (!this.userIsSignedIn) return;
            const user = firebase.auth().currentUser;
            const message = {
                profilepic: user.photoURL ? user.photoURL : 'images/anonym.png',
                name: user.displayName,
                message: this.newMessage,
                created_at: new Date().getTime()
            }
            messagesRef.add(message)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
            this.newMessage = '';
        },
        isMine: function (name) {
            return name === firebase.auth().currentUser.displayName ? 'mine' : '';
        }
    }
});

function snapShotMessages() {
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
        app.userIsSignedIn = true;
        snapShotMessages();
    } else {
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