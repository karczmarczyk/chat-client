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
        if ((obj.to==this.from && obj.from==this.to)
            || (obj.from==this.from && obj.to==this.to)
            || (obj.from==this.from && obj.to==this.from) //powiadomienia systemowe
        ) {
            let txtHtml = '<div>'+obj.fromUserName+' '+obj.dateCreated+'</div>'
                    + '<div>'+this.contentParser(obj.content)+'</div>';
            let node = document.createElement("LI");
            let className = 'my-message';
            if (obj.from!=this.from) {
                className = 'other-message';
            }
            node.setAttribute('class', className)
            node.innerHTML = txtHtml;
            document.getElementById("message").appendChild(node);
        }
    }

    contentParser (content) {
        return content.replace(/\n/g, "<br />");
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
            this.ws.send(JSON.stringify(obj));
        }
    }
}