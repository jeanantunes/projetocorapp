$(document).ready(function () { });

function callToken(callback) {

    $.ajax({
        async: true,
        url: URLBase + "/token/",
        method: "POST",
        headers: {
            "Authorization": "Basic " + Token,
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            "grant_type": "client_credentials"
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });
}

function callEmail(callback, token) {

    var faleConosco = get("faleConosco");
    var emailFaleConosco = "falecom@odontoprev.com.br";
    var recepientName = "Fale Conosco";
    var subject = "[LOGIN]";

    var json = {

        "sender": $("#emailSuporteLogin").val(),

        "senderName": $("#nomeSuporteLogin").val(),

        "recepients": [

            emailFaleConosco

        ],

        "recepientName": recepientName,

        "subject": subject,

        "type": "text/html",

        "body": $("#faleConoscoMsg").val()
    }

    console.log(json);
    console.log(json);

    $.ajax({
        async: true,
        url: URLBase + "/sendemail/1.0/send",
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        success: function (resp) {
            callback(resp);

        },
        //data: "{\r\n\r\n  \"sender\": \"" + faleConosco.emailRemetente + "\",\r\n\r\n  \"senderName\": \"" + faleConosco.nomeRemetente + "\",\r\n\r\n  \"recepients\": [\r\n\r\n    \"" + emailFaleConosco + "\"\r\n\r\n  ],\r\n\r\n  \"recepientName\": \"Fernando S.\",\r\n\r\n  \"subject\": \"" + faleConosco.subject + "\",\r\n\r\n  \"type\": \"text/html\",\r\n\r\n  \"body\": \"" + faleConosco.textoEnviado + "\"\r\n\r\n}",
        data: JSON.stringify(json),
        error: function (xhr) {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });

}

$(".mensagem").keyup(function () {

    if ($(this).val() != "" && $("#nomeSuporteLogin").val() != "" && ($("#emailSuporteLogin").val() != "" && validateEmail($("#emailSuporteLogin").val() ) ) ) {
        $("#enviar").removeClass("disabled");
        return;
    }

    $("#enviar").addClass("disabled");

});

$("#emailSuporteLogin").keyup(function () {

    if ( ( $(this).val() != "" && validateEmail( $(this).val() ) ) && $("#faleConoscoMsg").val() != "" && $("#nomeSuporteLogin").val() != "") {
        $("#enviar").removeClass("disabled");
        return;
    }

    $("#enviar").addClass("disabled");

});

$("#nomeSuporteLogin").keyup(function () {

    if ($(this).val() != "" && ($("#emailSuporteLogin").val() != "" && validateEmail($("#emailSuporteLogin").val() )) && $("#faleConoscoMsg").val() != "") {
        $("#enviar").removeClass("disabled");
        return;
    }

    $("#enviar").addClass("disabled");

});


$("#enviar").click(function () {

    callToken(function (dataToken) {

        callEmail(function (dataEmail) {

            swal({
                title: "Feito!",
                text: "Obrigado pela mensagem",
                type: "success"
            },
            function (isConfirm) {
                window.location.href = "index.html";
            });  

        }, dataToken.access_token);
    });
});