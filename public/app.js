const db = firebase.firestore();
const messagesRef = db.collection("messages");

const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        newMessage: ''
    },
    methods: {
        addMsg: function(){
            const message = {
                profilepic: 'images/anonym.png',
                name: 'Unknown',
                message: this.newMessage,
                created_at: new Date().getTime()
            }
            messagesRef.add(message)
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            this.newMessage = '';
        }
    }
});

messagesRef.orderBy('created_at').onSnapshot(function (snapshot){
    snapshot.docChanges().forEach(function(change){
        if(change.type === 'added'){
            app.messages.push(change.doc.data());
        }
    })
})
