$(document).ready(function () {

    popularCamposProposta();

});

function popularCamposProposta() {

    let cdEmpresa = getUrlParameter("cdEmpresa");

    // callTokenVendas(function (dataToken) {
    //
    //     if (dataToken.status != undefined) {
    //
    //         swal({
    //             title: "Ops",
    //             text: "Erro no carregamento da página, tente novamente.",
    //             type: "error",
    //             closeOnConfirm: false
    //         }, function () {
    //             window.location = "logado.html";
    //         });
    //
    //         return;
    //
    //     }

    swal({
        title: "Aguarde",
        text: 'Estamos carregando a proposta',
        content: "input",
        imageUrl: "img/load.gif",
        showCancelButton: false,
        showConfirmButton: false,
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    });

    callDadosEmpresa(function (dataEmpresa) {

        if (dataEmpresa.status != undefined) {

            swal({
                title: "Ops",
                text: "Erro no carregamento da página, tente novamente.",
                type: "error",
                closeOnConfirm: false
            }, function () {
                window.location = "lista_proposta.html";
            });

            return;
        }

        //var dataEmpresa = JSON.parse(dataEmpresa);

        console.log(dataEmpresa);

        // Preenchimento dos dados da empresa
        $("#cnpjEmpresa").html(dataEmpresa.cnpj);
        $("#razaoSocialEmpresa").html(dataEmpresa.razaoSocial);
        $("#nomeFantasiaEmpresa").html(dataEmpresa.nomeFantasia);
        $("#ramosAtividadeEmpresa").html(dataEmpresa.ramoAtividade);
        $("#representanteLegalEmpresa").html(dataEmpresa.representanteLegal);
        $("#telefoneEmpresa").html(dataEmpresa.telefone);
        $("#celularEmpresa").html(dataEmpresa.celular);
        $("#emailEmpresa").html(dataEmpresa.email);

        if (!dataEmpresa.contatoEmpresa) {

            $("#divSegundoContatoEmpresa").removeClass('hide');

        }

        // Preenchimento do cep
        $("#cepEmpresa").html(dataEmpresa.enderecoEmpresa.cep);
        $("#enderecoEmpresa").html(dataEmpresa.enderecoEmpresa.logradouro);
        $("#complementoEmpresa").html(dataEmpresa.enderecoEmpresa.complemento);
        $("#numeroEmpresa").html(dataEmpresa.enderecoEmpresa.numero);
        $("#bairroEmpresa").html(dataEmpresa.enderecoEmpresa.bairro);
        $("#cidadeEmpresa").html(dataEmpresa.enderecoEmpresa.cidade);
        $("#estadoEmpresa").html(dataEmpresa.enderecoEmpresa.estado);

        swal.close();

    }, "dasdasdsada", cdEmpresa);


    //});



}

function callDadosEmpresa(callback, token, cdEmpresa) {

    $.ajax({
        async: true,
        //url: "https://6a428f33-b87b-43d0-92ef-7fdc244530ea.mock.pstmn.io" + "/empresa/" + cdEmpresa,
        url: "http://172.16.244.160:8090/empresa/" + cdEmpresa,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });

}