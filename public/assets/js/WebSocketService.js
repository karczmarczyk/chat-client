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
        this.connectLink = connectLink;
        this.ws = new WebSocket(connectLink);
        this.wsInit();
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

    getWs () {
        return this.ws;
    }

    setFrom (userId) {
        this.from = userId;
    }

    setTo (userId) {
        this.to = userId;
    }

    wsOnOpen () {
        this.isOpen = true;
    }

    wsOnMessage (evt) {
        let received_msg = evt.data;
        let obj = JSON.parse(received_msg);
        if (obj.to==this.from || obj.from==this.from) {
            let txt = obj.from+": "+obj.content;
            let node = document.createElement("LI");
            let textnode = document.createTextNode(txt);
            node.appendChild(textnode);
            document.getElementById("message").appendChild(node);
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
            to: this.to,
            content: message
        };
        if (message!='' && message!='undefined') {
            this.ws.send(JSON.stringify(obj));
        }
    }
}