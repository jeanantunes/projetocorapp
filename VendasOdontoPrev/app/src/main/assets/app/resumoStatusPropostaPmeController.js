$(document).ready(function () {

    let carregarPrimeiraPag = 0;
    $("#mostrarMais").attr("data-contador", carregarPrimeiraPag);
    popularCamposProposta();
    localStorage.removeItem('detalheBeneficiario');

    $("#baixarContrato").click(function () {

        var cdEmpresa = getUrlParameter("cdEmpresa");

        downloadContratoPdf(function (dataArquivo) {

            if (dataArquivo == undefined) {

                swal("Ops!", "erro", "error");
                return;

            }

            if (dataArquivo.status != undefined) {

                swal("Ops!", "erro", "error");
                return;

            }

            var resultado = ob.salvarArquivoEGerarPush(dataArquivo.arquivoBase64, dataArquivo.nomeArquivo, dataArquivo.tipoConteudo.split("/")[1]);
            console.log(dataArquivo);

        }, "dasdsad", cdEmpresa);

    });

    $('#mostrarMais').bind('click', function () {

        callTokenVendas(function (dataToken) {

            if (dataToken.status != undefined) {

                swal({
                    title: "Ops",
                    text: "Erro no carregamento da página, tente novamente.",
                    type: "error",
                    closeOnConfirm: false
                }, function () {
                    window.location = "logado.html";
                });

                return;
            }

            swal({
                title: "Aguarde",
                text: 'Estamos carregando mais beneficiários',
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

            let cdEmpresa = getUrlParameter("cdEmpresa");
            let tamanhoDaPagina = getRepository("paginacaoBeneficiarios").pageSize;
            let contadorDePaginas = parseInt($("#mostrarMais").attr("data-contador")) + 1;

            callBeneficiariosList(function (dataListBeneficiarios) {


                if (dataListBeneficiarios.status != undefined) {

                    swal("Ops!", "Erro no carregamento de beneficiarios, tente novamente.");
                    return;

                }

                $.each(dataListBeneficiarios.titulares, function (i, item) {

                    var componentBoxBeneficiarios = getComponent("boxBeneficiarios");
                    var componentBoxBeneficiarios = componentBoxBeneficiarios.replace("{NOME-TITULAR}", item.nome);
                    var componentBoxBeneficiarios = componentBoxBeneficiarios.replace("{NUMERO}", item.qtdDependentes);
                    var componentBoxBeneficiarios = componentBoxBeneficiarios.replace("{PLANO}", item.descPlano);
                    var componentBoxBeneficiarios = componentBoxBeneficiarios.replace("{JSONBENEF}", JSON.stringify(item));
                    
                    $("#boxBeneficiarios").append(componentBoxBeneficiarios);

                });

                let numeroDaPagina = dataListBeneficiarios.numPagina;
                let quantidadeDePaginas = dataListBeneficiarios.qtdPaginas;


                $("#mostrarMais").attr("data-contador", dataListBeneficiarios.numPagina);
                $("#mostrarMais").attr("data-ultima-pagina", dataListBeneficiarios.qtdPaginas);

                if (numeroDaPagina === quantidadeDePaginas) {

                    $("#mostrarMais").addClass('hide');
                }

                $('html, body').animate({ scrollTop: $('#fimDaPagina').offset().top }, 1000);

                swal.close();

            }, dataToken.access_token, cdEmpresa, contadorDePaginas, tamanhoDaPagina)

        });

    });


});

function popularCamposProposta() {

    let cdEmpresa = getUrlParameter("cdEmpresa");

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

    callTokenVendas(function (dataToken) {

        if (dataToken.status != undefined) {

            swal({
                title: "Ops",
                text: "Erro no carregamento da página, tente novamente.",
                type: "error",
                closeOnConfirm: false
            }, function () {
                window.location = "logado.html";
            });

            return;
        }

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

                $("#nomeContatoEmpresa").html(dataEmpresa.contactEmpresa.nome);
                $("#telefoneContatoEmpresa").html(dataEmpresa.contactEmpresa.telefone);
                $("#celularContatoEmpresa").html(dataEmpresa.contactEmpresa.celular);
                $("#emailContatoEmpresa").html(dataEmpresa.contactEmpresa.email);
                $("#divSegundoContatoEmpresa").removeClass('hide');

            }

            // Preenchimento do endereço da empresa
            $("#cepEmpresa").html(dataEmpresa.enderecoEmpresa.cep);
            $("#enderecoEmpresa").html(dataEmpresa.enderecoEmpresa.logradouro);
            $("#complementoEmpresa").html(dataEmpresa.enderecoEmpresa.complemento);
            $("#numeroEmpresa").html(dataEmpresa.enderecoEmpresa.numero);
            $("#bairroEmpresa").html(dataEmpresa.enderecoEmpresa.bairro);
            $("#cidadeEmpresa").html(dataEmpresa.enderecoEmpresa.cidade);
            $("#estadoEmpresa").html(dataEmpresa.enderecoEmpresa.estado);

            //Preenchimento das datas operacionais
            $("#vencimentoEmpresa").html(dataEmpresa.vencimentoFatura);

            if (dataEmpresa.cdStatusVenda == 5) {

                $("#labelDataVigencia").html("Previsão de Início da Vigência:");

            } else {

                $("#labelDataVigencia").html("Data de Vigência:");

            }

            $("#dataMovimentacaoEmpresa").html(dataEmpresa.dataMovimentacao);
            $("#dataVigenciaEmpresa").html(dataEmpresa.dataVigencia);

            let tamanhoDaPagina = getRepository("paginacaoBeneficiarios").pageSize;

            let contadorDePaginas = parseInt($("#mostrarMais").attr("data-contador")) + 1;

            callBeneficiariosList(function (dataListBeneficiarios) {


                if (dataListBeneficiarios.status != undefined) {

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

                $.each(dataListBeneficiarios.titulares, function (i, item) {

                    var componentBoxBeneficiarios = getComponent("boxBeneficiarios");
                    var componentBoxBeneficiarios = componentBoxBeneficiarios.replace("{NOME-TITULAR}", item.nome);
                    var componentBoxBeneficiarios = componentBoxBeneficiarios.replace("{NUMERO}", item.qtdDependentes);
                    var componentBoxBeneficiarios = componentBoxBeneficiarios.replace("{PLANO}", item.descPlano);
                    var componentBoxBeneficiarios = componentBoxBeneficiarios.replace("{JSONBENEF}", JSON.stringify(item));

                    $("#boxBeneficiarios").append(componentBoxBeneficiarios);

                });

                let numeroDaPagina = dataListBeneficiarios.numPagina;
                let quantidadeDePaginas = dataListBeneficiarios.qtdPaginas;

                
                $("#mostrarMais").attr("data-contador", dataListBeneficiarios.numPagina);
                $("#mostrarMais").attr("data-ultima-pagina", dataListBeneficiarios.qtdPaginas);

                if (numeroDaPagina === quantidadeDePaginas) {

                    $("#mostrarMais").addClass('hide');
                }

                swal.close();

            }, dataToken.access_token, cdEmpresa, contadorDePaginas, tamanhoDaPagina)

        }, dataToken.access_token, cdEmpresa);


    });



}

function callDadosEmpresa(callback, token, cdEmpresa) {

    $.ajax({
        async: true,
        //url: "https://6a428f33-b87b-43d0-92ef-7fdc244530ea.mock.pstmn.io" + "/empresa/" + cdEmpresa,
        url: URLBase + "/corretorservicos/1.0/empresa/" + cdEmpresa,
        //url: "http://localhost:8090/empresa/" + cdEmpresa,
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

function callBeneficiariosList(callback, token, cdEmpresa, numeroDaPagina, tamanhoDaPagina) {

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/beneficiarios/empresa/" + cdEmpresa + "?tampag=" + tamanhoDaPagina + "&numpag=" + numeroDaPagina,
        //url: "http://localhost:8090/beneficiarios/empresa/" + cdEmpresa + "?tampag=" + tamanhoDaPagina + "&numpag=" + numeroDaPagina,
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

function getBeneficiario(jsonBeneficiario) {

    put('detalheBeneficiario', jsonBeneficiario);
    window.location.href = "detalheBeneficiarioPme.html";

}

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