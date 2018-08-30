var preenchidos = false;

$(document).ready(function () {

    localStorage.removeItem("proposta");

    $("#baixarContrato").click(function () {

        swal({
            title: "Aguarde",
            text: 'Estamos baixando o contrato',
            content: "input",
            imageUrl: "img/icon-aguarde.gif",
            showCancelButton: false,
            showConfirmButton: false,
            icon: "info",
            button: {
                text: "...",
                closeModal: false,
            },
        });

        callTokenVendas(function (dataToken) {

            if (dataToken.status != undefined) {
                swal("Ops!", "Algo deu errado no download, por favor tente novamente.", "error");
                return;
            }

            let cdEmpresa = getUrlParameter("cdEmpresa");

            downloadContratoPdf(function (dataArquivo) {

                if (dataArquivo == undefined) {

                    swal("Ops!", "Algo deu errado no download, por favor tente novamente.", "error");
                    return;

                }

                if (dataArquivo.status != undefined) {

                    swal("Ops!", "Algo deu errado no download, por favor tente novamente.", "error");
                    return;

                }
                
                var resultado = ob.salvarArquivoEGerarPush(dataArquivo.arquivoBase64, dataArquivo.nomeArquivo, dataArquivo.tipoConteudo.split("/")[1]);
                swal.close();

            }, dataToken.access_token, cdEmpresa);

        });

    });

});

function downloadContratoPdf(callback, token, cdEmpresa) {

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/arquivocontratacao/empresa/" + cdEmpresa + "/json",
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


