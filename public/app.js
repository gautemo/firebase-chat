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
                message: this.newMessage
            }
            this.messages.push(message);
            this.newMessage = '';
        }
    }
})