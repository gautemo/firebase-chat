const db = firebase.firestore();
const messagesRef = db.collection("messages");

const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        newMessage: ''
    },
    methods: {
        addMsg: function () {
            const user = firebase.auth().currentUser;
            const message = {
                profilepic: user.photoURL ? user.photoURL : 'images/anonym.png',
                name: user.displayName,
                message: this.newMessage,
                created_at: new Date().getTime(),
                user_id: user.uid
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
        isMine: function (id) {
            return id === firebase.auth().currentUser.uid ? 'mine' : '';
        }
    }
});

function snapShotMessages() {
    messagesRef.orderBy('created_at').onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            const msg = change.doc.data();
            msg.id = change.doc.id;
            if (change.type === 'added') {
                app.messages.push(msg);
            }
            if (change.type === 'modified') {
                app.messages = app.messages.map(m => {
                    if(m.id === msg.id) return msg;
                    return m;
                })
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