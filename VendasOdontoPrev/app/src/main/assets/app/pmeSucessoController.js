var preenchidos = false;

$(document).ready(function () {

    localStorage.removeItem("proposta");

    $("#baixarContrato").click(function () {

        //callTokenVendas(function (dataToken) {

            //if (dataToken.status != undefined) {
            //    swal.close("Ops!", "Tivemos um problema no download do contrato. Tente novamente mais tarde.", "error");
            //    return;
            //}

            let cdEmpresa = getUrlParameter("cdEmpresa");
            console.log(cdEmpresa);

            downloadContratoPdf(function (dataArquivo) {

                if (dataArquivo != undefined) {

                    swal("Ops!", "erro", "error");
                    return;

                }

                var resultado = ob.salvarArquivoEGerarPush(dataImage.arquivoBase64, dataImage.nomeArquivo, dataImage.tipoConteudo.split("/")[1]);
                console.log(dataArquivo);

            }, "dasdsad", cdEmpresa);

        //});

    });

});

function downloadContratoPdf(callback, token, cdEmpresa) {

    $.ajax({
        async: true,
        url: "http://localhost:8090/arquivocontratacao/empresa/" + cdEmpresa + "/json",
        //url: URLBase + "/corretorservicos/1.0/devicetoken/forcavenda/" + cdForcaVenda + "?token=" + tokenDeviceFirebase,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });

}


