/**
 * usage:
 *      let socket = new WebSocketService(socketLink);
 *      socket.setFrom(from);
 *      socket.setTo(to);
 *
 *      $('#send').click(function() {
 *          socket.send('jololo');
 *      })
 */
class WebSocketService
{
    constructor(connectLink) {
        if (! ("WebSocket" in window)) {
            alert("WebSocket NOT supported by your Browser!");
            return false;
        }
        this.isOpen = false;
        this.isRoom = false;
        this.connectLink = connectLink;
        this.ws = new WebSocket(connectLink);
        this.wsInit();
    }

    setChannelBuilder (channelBuilder) {
        this.channelBuilder = channelBuilder;
    }

    reconnect () {
        this.ws = new WebSocket(this.connectLink);
        this.wsInit();
    }

    wsInit () {
        let that = this;
        this.ws.onopen = function () {
            that.wsOnOpen();
        };
        this.ws.onmessage = function (evt) {
            that.wsOnMessage(evt);
        };
        this.ws.onclose = function () {
            that.wsOnClose();
        };
    }

    setIsRoom (isRoom) {
        this.isRoom = isRoom;
    }

    getWs () {
        return this.ws;
    }

    setFrom (userId) {
        this.from = userId;
    }

    setTo (userId) {
        this.to = userId;
    }

    setFromUserName (userName) {
        this.fromUserName = userName;
    }

    setToUserName (userName) {
        this.toUserName = userName;
    }

    wsOnOpen () {
        this.isOpen = true;
    }

    wsOnMessage (evt) {
        let received_msg = evt.data;
        let obj = JSON.parse(received_msg);
        console.log(obj);
        if ((obj.to==this.from && obj.from==this.to)
            || (obj.from==this.from && obj.to==this.to)
            //|| (obj.from==this.from && obj.to==this.from) //powiadomienia systemowe
        ) {
            let isMyMessage = obj.from==this.from;
            if (! isMyMessage && ("Notification" in window) && Notification.permission === "granted") {
                // jeżeli są tworzymy powiadomienie
                var notification = new Notification(obj.content);
            }
            this.channelBuilder.appendRow(obj, isMyMessage);
        }
    }

    wsOnClose () {
        this.isOpen = false;
        alert("Connection is closed...");
    }

    send (message) {
        if (!this.isOpen) {
            alert("Connection is closed.");
            return;
        }
        let obj = {
            from: this.from,
            fromUserName: this.fromUserName,
            to: this.to,
            toUserName: this.toUserName,
            content: message,
            isRoom: this.isRoom
        };
        if (message!='' && message!='undefined') {
            let json = JSON.stringify(obj);
            console.log(json);
            this.ws.send(json);
        }
    }
}