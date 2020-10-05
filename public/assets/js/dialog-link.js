let dialogContent = "";

function openDialogWithDynamicContent(id, elem) {
    let link = elem.attr('href');
    let title = elem.attr('title');
    if(title == ''){
        title = elem.attr('data-original-title');
    }
    let html = elem.attr('data-dialog-content-as-html');

    dialogContent = "";
    $('#file-manager-file-content-grep').val("");
    $.ajax({
        type: "GET",
        url: link,
        async: true,
        success: function(msg) {
            dialogContent = msg;
            if (html==1) {
                $('#file-manager-file-content-grep').hide();
                $('#' + id + '-content').html(msg);
            } else {
                $('#file-manager-file-content-grep').show();
                $('#' + id + '-content').text(msg);
            }
            $('#'+id).dialog('open');
            $('#'+id).dialog( "option", "title", title );
        },
        error: function() {
            // błąd
            alert ('ERROR');
        }
    });
}

$(document).ready(function(){

    /* uruchamia dialog */
    $(document).on("click", "a.link-dialog" , function() {
        openDialogWithDynamicContent('dialog-simple',$(this));
        return false;
    });

    $('#file-manager-file-content-grep').keypress(function (e) {
        if (e.which == 13) {
            let match = $('#file-manager-file-content-grep').val();
            console.log(match);
            if (match==='') {
                $('#dialog-simple-content').text(dialogContent);
                return;
            }
            let t = [...dialogContent.matchAll(RegExp('.*'+match+'.*','ig'))].join(["\n"]);
            console.log(t);
            $('#dialog-simple-content').text(
                t
            );
        }
    });

});