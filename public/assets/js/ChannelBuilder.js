class ChannelBuilder
{
    constructor (elementId) {
        this.elementId = elementId;
        $('#'+this.elementId).html('<ul class="message-container"></ul>');
    }

    appendRow (obj, isMyMessage) {
        let txtHtml = '<div class="row">'
                + '<div class="from-user-name col-sm-6 col-6">' + obj.fromUserName + '</div>'
                + '<div class="date-created col-sm-6  col-6">' + this.dateParser(obj.dateCreated) + '</div>'
            + '</div>'
            + '<div class="row message-body"><div class="col-lg-12">'+this.contentParser(obj.content)+'</div></div>';

        let node = document.createElement("LI");
        let className = 'my-message';
        if (!isMyMessage) {
            className = 'other-message';
        }
        node.setAttribute('class', className)
        node.innerHTML = txtHtml;
        //document.getElementById("message").appendChild(node);
        $('#'+this.elementId+">ul").append(node);
    }

    contentParser (content) {
        return content.replace(/\n/g, "<br />");
    }

    dateParser (date) {
        if (date === undefined) {
            return "";
        }
        if (date.date === undefined) {
            return date.slice(0,10)+ " " +date.slice(11,19);
        } else {
            return this.dateFormat(this.dateObjParser(date))
        }
    }

    dateObjParser (date) {
        let newDate = new Date(date.date.year, date.date.month, date.date.day,
            date.time.hour, date.time.minute, date.time.second);
        return newDate;
    }

    dateFormat (date) {
        return date.toISOString().slice(0,10)+ " " +date.toISOString().slice(11,19);
    }
}