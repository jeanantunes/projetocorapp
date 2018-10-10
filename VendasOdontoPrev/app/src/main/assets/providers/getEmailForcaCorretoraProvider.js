var metodoApi = "/forcavenda/{cdForcaVenda}/email";

function getEmailForcaCorretora(accessToken, cdForcaVenda, callbackSuccess, callbackError) {

    var url = URLBase + apiGateway + metodoApi.replace("{cdForcaVenda}", cdForcaVenda);

    $.ajax({
        async: true,
        url: url,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        success: function (resp) {
            callbackSuccess(resp);
        },
        error: function (xhr) {
            callbackError(xhr);
        }
    });

}