var cdEmpresa = "";
var memoriaInputEmail = "";
var dadosUsuario;

$(document).ready(function () {

    dadosUsuario = get("dadosUsuario");

    cdEmpresa = getUrlParameter("cdEmpresa");
    let carregarPrimeiraPag = 0;
    $("#mostrarMais").attr("data-contador", carregarPrimeiraPag);
    popularCamposProposta();
    localStorage.removeItem('detalheBeneficiario');

    $("#baixarContrato").click(function () {

        var cdEmpresa = getUrlParameter("cdEmpresa");

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

    //201809271803 - esert/yalm - COR-832 : APP - Adicionar Botao Reenvio
    $("#reenviarEmailAceitePME").click(function () {

        var cdEmpresa = getUrlParameter("cdEmpresa");

        swal({
            title: "Aguarde",
            text: 'Estamos reen viado o e-mail de azeite',
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
                swal("Ops!", "Algo deu errado no reenvio do email de aceite, por favor tente novamente.", "error");
                return;
            }

            postEmailVenda(
                dataToken.access_token
                ,function (dataEmailAceiteSuccess) {

                    if (dataEmailAceiteSuccess == undefined) {
                        swal("Ops!", "Algo deu errado no reenvio do email de aceite, por favor tente novamente.", "error");
                        return;
                    } else if (dataEmailAceiteSuccess.status != undefined) {
                        swal("Ops!", "Algo deu errado no reenvio do email de aceite, por favor tente novamente.", "error");
                        return;
                    } else {
                        swal("Sucesso", "E-mail de aceite reenvio com sucesso.", "success");
                    }

                    // swal.close();
                }
                ,function (dataEmailAceiteError){
                    swal("Ops!", "Algo deu errado no reenvio do email de aceite, por favor tente novamente.", "error");
                    return;
                }
                
            );

        });

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
                imageUrl: "img/icon-aguarde.gif",
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

                    swal("Ops!", "Erro no carregamento de beneficiarios, tente novamente.", "error");
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

    $("#btnEditarEmail").click(function () {

        memoriaInputEmail = $("#inputEmail").val();
        $(this).hide();
        $("#inputEmail").removeAttr('disabled');
        $("#inputEmail").removeClass("input-email-gray");
        $("#inputEmail").removeClass("input-email-red");
        $("#inputEmail").addClass("input-email-blue");
        $("#btnConfirmarVerde").hide();
        $("#btnConfirmarCinza").show();
        $("#btnCancelar").show();
        $("#divErroEmail").hide();
    });

    $("#inputEmail").blur(function () {

        if ($(this).val() == dadosUsuario.email) {
            $("#inputEmail").removeAttr('disabled');
            $("#inputEmail").removeClass("input-email-gray");
            $("#inputEmail").removeClass("input-email-red");
            $("#inputEmail").addClass("input-email-blue");
            $("#btnConfirmarVerde").hide();
            $("#btnConfirmarCinza").show();
            $("#btnCancelar").show();
            $("#divErroEmail").hide();
            return;
        }
        
        if ($(this).val() == memoriaInputEmail) {
            $("#inputEmail").removeAttr('disabled');
            $("#inputEmail").removeClass("input-email-gray");
            $("#inputEmail").removeClass("input-email-red");
            $("#inputEmail").addClass("input-email-blue");
            $("#btnConfirmarVerde").hide();
            $("#btnConfirmarCinza").show();
            $("#btnCancelar").show();
            $("#divErroEmail").hide();
            return;
        }

        if (validateEmail($(this).val())
        ) {
            $(this).removeClass("input-email-red");
            $(this).removeClass("input-email-gray");
            $(this).addClass("input-email-blue");
            $("#btnConfirmarCinza").hide();
            $("#btnConfirmarVerde").show();
            $("#divErroEmail").hide();
        } else {

            $(this).removeClass("input-email-gray");
            $(this).removeClass("input-email-blue");
            $(this).addClass("input-email-red");
            $("#btnConfirmarVerde").hide();
            $("#btnConfirmarCinza").show();
            $("#divErroEmail").show();
        }

    });

    $("#inputEmail").keyup(function () {

        if ($(this).val() == dadosUsuario.email) {
            $("#inputEmail").removeAttr('disabled');
            $("#inputEmail").removeClass("input-email-gray");
            $("#inputEmail").removeClass("input-email-red");
            $("#inputEmail").addClass("input-email-blue");
            $("#btnConfirmarVerde").hide();
            $("#btnConfirmarCinza").show();
            $("#btnCancelar").show();
            $("#divErroEmail").hide();
            return;
        }

        if ($(this).val() == memoriaInputEmail) {
            $("#inputEmail").removeAttr('disabled');
            $("#inputEmail").removeClass("input-email-gray");
            $("#inputEmail").removeClass("input-email-red");
            $("#inputEmail").addClass("input-email-blue");
            $("#btnConfirmarVerde").hide();
            $("#btnConfirmarCinza").show();
            $("#btnCancelar").show();
            $("#divErroEmail").hide();
            return;
        }

        if (validateEmail($(this).val())) {

            $(this).removeClass("input-email-red");
            $(this).removeClass("input-email-gray");
            $(this).addClass("input-email-blue");
            $("#btnConfirmarCinza").hide();
            $("#btnConfirmarVerde").show();
            $("#divErroEmail").hide();
        } else {

            $("#btnConfirmarVerde").hide();
            $("#btnConfirmarCinza").show();

        }

    });

    $("#inputEmail").focus(function () {
        $(this).removeClass("input-email-gray");
        $(this).removeClass("input-email-red");
        $(this).addClass("input-email-blue");
        $("#divErroEmail").hide();
    });

    $("#btnCancelar").click(function () {

        $("#inputEmail").val(memoriaInputEmail);
        $("#inputEmail").removeClass("input-email-blue");
        $("#inputEmail").removeClass("input-email-red");
        $("#inputEmail").addClass("input-email-gray");
        $("#btnConfirmarVerde").hide();
        $("#btnConfirmarCinza").hide();
        $(this).hide();
        $("#btnEditarEmail").show();
        $("#inputEmail").attr('disabled', 'disabled');
        $("#divErroEmail").hide();
    });

    $("#btnConfirmarVerde").click(function () {

        swal({
            title: "Aguarde",
            text: 'Estamos atualizando o email da venda',
            content: "input",
            showCancelButton: false,
            showConfirmButton: false,
            imageUrl: "img/icon-aguarde.gif",
            allowEscapeKey: false,
            allowOutsideClick: false,
            icon: "info",
            button: {
                text: "...",
                closeModal: false,
            },
        });

        callTokenVendas(function (dataToken) { 

            if (dataToken.status != undefined) { 

                swal("Ops!", "Erro na atualização do email", "error");
                return;
            }

            putEmailVenda(dataToken.access_token,

                function (dataEmailSuccess) { 

                    if (dataEmailSuccess == undefined) {

                        swal("Ops!", "Erro na atualização do email", "error");
                        return;

                    }

                    swal({ 
                        title: "Email alterado com sucesso",
                        text: "Deseja reenviar o email de aceite?",
                        type: "success",
                        confirmButtonClass: "btn-danger",
                        confirmButtonColor: "#1974CE",
                        confirmButtonText: "Sim",
                        cancelButtonText: "Não",
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showCancelButton: true,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function (isConfirm) { 

                        if (isConfirm) { 

                            swal({
                                title: "Aguarde",
                                text: 'Estamos enviando o email da venda',
                                content: "input",
                                showCancelButton: false,
                                showConfirmButton: false,
                                imageUrl: "img/icon-aguarde.gif",
                                allowEscapeKey: false,
                                allowOutsideClick: false,
                                icon: "info",
                                button: {
                                    text: "...",
                                    closeModal: false,
                                },
                            });

                            callTokenVendas(function (dataToken) { 

                                if (dataToken.status != undefined) { 

                                    swal("Ops!", "Erro no reenvio do email", "error");
                                    return;
                                }

                                postEmailVenda(dataToken.access_token,

                                    function (dataReenvioEmailSucess) { 

                                        if (dataReenvioEmailSucess == undefined) {

                                            swal("Ops!", "Erro no reenvio do email", "error");
                                            return;
                                        }

                                        swal("Email enviado com sucesso", "", "success");

                                        memoriaInputEmail = $("#inputEmail").val();
                                        $("#inputEmail").val(memoriaInputEmail);
                                        $("#inputEmail").removeClass("input-email-blue");
                                        $("#inputEmail").removeClass("input-email-red");
                                        $("#inputEmail").addClass("input-email-gray");
                                        $("#btnConfirmarVerde").hide();
                                        $("#btnConfirmarCinza").hide();
                                        $("#btnCancelar").hide();
                                        $("#btnEditarEmail").show();
                                        $("#inputEmail").attr('disabled', 'disabled');
                                        $("#divErroEmail").hide();

                                    },
                                    function (dataEmailError) {

                                        swal("Ops!", "Erro no reenvio do email", "error");
                                    }

                                )

                            });


                        } else {

                            memoriaInputEmail = $("#inputEmail").val();
                            $("#inputEmail").val(memoriaInputEmail);
                            $("#inputEmail").removeClass("input-email-blue");
                            $("#inputEmail").removeClass("input-email-red");
                            $("#inputEmail").addClass("input-email-gray");
                            $("#btnConfirmarVerde").hide();
                            $("#btnConfirmarCinza").hide();
                            $("#btnCancelar").hide();
                            $("#btnEditarEmail").show();
                            $("#inputEmail").attr('disabled', 'disabled');
                            $("#divErroEmail").hide();
                            swal.close(); 

                        }
                    })


                },
                function (dataEmailError) { 

                }
            )


        })


    })

});

function popularCamposProposta() {

    let cdEmpresa = getUrlParameter("cdEmpresa");

    swal({
        title: "Aguarde",
        text: 'Estamos carregando a proposta',
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
            imageUrl: "img/icon-aguarde.gif",
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

            if (dataEmpresa.cdStatusVenda == 5) { //Proposta Aguardando aceite PME

                $("#labelDataVigencia").html("Previsão de Início da Vigência:");

            } else {

                $("#labelDataVigencia").html("Data de Vigência:");

            }

            if (dataEmpresa.cdStatusVenda == 1 //Proposta enviada para a OdontoPrev
                || 
                dataEmpresa.cdStatusVenda == 4 //Proposta enviada para a OdontoPrev
            ) {

                $("#divLabelEmailEmpresa").hide();
                $("#inputEmail").val(dataEmpresa.email);

            } else {

                $("#divReenviarEmailAceitePME").hide(); //201809271752 - esert/yalm - COR-832 : APP - Adicionar Botao Reenvio
                $("#divInputEmailContatoEmpresa").hide();
                $("#emailEmpresa").val(dataEmpresa.email);

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
        url: URLBase + apiGateway + "/empresa/" + cdEmpresa,
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
        url: URLBase + apiGateway + "/beneficiarios/empresa/" + cdEmpresa + "?tampag=" + tamanhoDaPagina + "&numpag=" + numeroDaPagina,
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
        //url: "http://172.16.244.137:8090/arquivocontratacao/empresa/" + cdEmpresa + "/json",
        url: URLBase + apiGateway + "/arquivocontratacao/empresa/" + cdEmpresa + "/json",
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

function putEmailVenda(access_token, callbackSuccess, callbackError) {

    var emailVenda = $("#inputEmail").val();
    var jsonRequest = {
        "cdEmpresa": cdEmpresa,
        "email": emailVenda
    }

    $.ajax({
        async: true,
        url: URLBase + apiGateway + "/empresa",
        method: "PUT",
        data: JSON.stringify(jsonRequest),
        headers: {
            "Authorization": "Bearer " + token,
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

function postEmailVenda(access_token, callbackSuccess, callbackError) {

    var jsonRequest = {
        "cdEmpresa": cdEmpresa
    }

    $.ajax({
        async: true,
        url: URLBase + apiGateway + "/empresa-emailaceite",
        method: "POST",
        data: JSON.stringify(jsonRequest),
        headers: {
            "Authorization": "Bearer " + token,
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