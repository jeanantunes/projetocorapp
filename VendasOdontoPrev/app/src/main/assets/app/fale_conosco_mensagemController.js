$(document).ready(function ()
{ });

function callToken(callback) {

    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/token/",
        method: "POST",
        headers: {
            "Authorization": "Basic ZWp3c0pfVGN6YXdObUdDYlN3dW1PRnVXTXQ0YTozM3pyVjJoRXo3TkN3WElpejNfcnlnbzNZZjRh",
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            "grant_type": "client_credentials"
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr)
        {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });
}

function callEmail(callback, token)
{
    var faleConosco = get("faleConosco");
    var emailFaleConosco = "falecom@odontoprev.com.br";
    var recepientName = "Fale Conosco";


    var json = {

        "sender": faleConosco.emailRemetente,

        "senderName": faleConosco.nomeRemetente,

        "recepients": [

            emailFaleConosco

        ],

        "recepientName": recepientName,

        "subject": faleConosco.subject,

        "type": "text/html",

        "body": faleConosco.textoEnviado
    }
    console.log(json);

    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/sendemail/1.0/send",
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        success: function (resp) {
            callback(resp);

        },
        data: JSON.stringify(json),
        //data:"{\r\n\r\n  \"sender\": \"" + faleConosco.emailRemetente + "\",\r\n\r\n\"senderName\": \"" + faleConosco.nomeRemetente + "\",\r\n\r\n\"recepients\": [\r\n\r\n    \"" + emailFaleConosco + "\"\r\n\r\n  ],\r\n\r\n  \"recepientName\": \"Fernando S.\",\r\n\r\n\"subject\": \"" + faleConosco.subject + "\",\r\n\r\n\"type\": \"text/html\",\r\n\r\n\"body\": \"" + faleConosco.textoEnviado + "\"\r\n\r\n}",

        error: function (xhr) {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });

}

$("#enviar").click(function () {

    var faleConosco = get("faleConosco");

    faleConosco.textoEnviado = $("#faleConoscoMsg").val();

    put("faleConosco", JSON.stringify(faleConosco));

    callToken(function (dataToken) {
    
        callEmail(function (dataEmail) {

            localStorage.removeItem("faleConosco");

            swal({
                title: "Feito!",
                text: "Obrigado pela mensagem",
                type: "success"
            }, function (isConfirm) {
                window.location.href = "logado.html";
            });         

         }, dataToken.access_token);
    });
});

$(".mensagem").keyup(function () {

    if ($(this).val() != "") {
        $("#enviar").removeClass("disabled");
        return;
    }

    $("#enviar").addClass("disabled");

});
