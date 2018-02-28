$(document).ready(function ()
{ });

function callToken(callback) {

    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/token/",
        method: "POST",
        headers: {
            "Authorization": "Basic Y3hHZXBoTzFkcERDd3U0VHlfRExWTWxXQ0R3YTp0WlJtSUN1eUJWajJZRVczRjdaNXdWM2E0YVlh",
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            "grant_type": "client_credentials"
        },
        success: function (resp) {
            callback(resp);
        },
    });
}

function callEmail(callback, token)
{
    var faleConosco = get("faleConosco");

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
        data: "{\r\n\r\n  \"sender\": \"" + faleConosco.emailRemetente + "\",\r\n\r\n  \"senderName\": \"" + faleConosco.nomeRemetente + "\",\r\n\r\n  \"recepients\": [\r\n\r\n    \"fernando.mota@odontoprev.com.br\"\r\n\r\n  ],\r\n\r\n  \"recepientName\": \"Fernando S.\",\r\n\r\n  \"subject\": \"" + faleConosco.subject + "\",\r\n\r\n  \"type\": \"text/html\",\r\n\r\n  \"body\": \"" + faleConosco.textoEnviado + "\"\r\n\r\n}",
        error: function (xhr) {

        }
    });

}


$("#enviar").click(function () {

    var faleConosco = get("faleConosco");

    faleConosco.textoEnviado = $("#faleConoscoMsg").val();

    put("faleConosco", JSON.stringify(faleConosco));

    callToken(function (dataToken) {
    
        callEmail(function (dataEmail) {

            swal({
                title: "Feito!",
                text: "Obrigado pela mensagem",
                type: "success"
            }, function () {
                window.location = "logado.html";
            });

            localStorage.removeItem("faleConosco");

         }, dataToken.access_token);
    });

});