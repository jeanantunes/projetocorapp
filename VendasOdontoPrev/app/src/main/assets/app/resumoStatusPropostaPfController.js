$(document).ready(function () {

    $("#btnModalBoleto").click(function () {
        //let min = Math.floor(Math.random() * (4 - 200 + 1)) + 5;
        //ob.compartilharPdf(base64, "dsadsadsad" + min.toString());
        if (possuiBoletos) {
            $("#modalBoleto").modal("show");
        } else swal("", "Este cliente não possui boletos em aberto", "success");
    });


    popularCamposProposta();

    carregarFichaFinanceira();
    $(".clickDependente").click(function () {

        $("#nomeDependente").html($(this).data("nome"));
        $("#emailDependente").html($(this).data("email"));
        $("#celularDependente").html($(this).data("celular"));
        $("#cpfDependente").html($(this).data("cpf"));
        $("#dataNascimentoDependente").html($(this).data("nasc"));
        $("#sexoDependente").html($(this).data("sexo") == "f" ? "Feminino" : "Masculino");
        $("#nomeMaeDependente").html($(this).data("mae"));

        $("#myModal").modal("show");
    });

    $("#baixarBoleto").click(function () {

        //console.log($('input[type=radio]:checked').attr("data-competencia"));
        let parcela = $('input[type=radio]:checked').attr("data-parcela");
        let dataVencimentoOriginal = $('input[type=radio]:checked').attr("data-venc");

        efetuarDownload(parcela,dataVencimentoOriginal);
    });
    
});

var possuiBoletos = false;

function carregarFichaFinanceira() {

    let resumoProposta = get("resumoStatusPropostaPf");

    if (resumoProposta.status.toUpperCase() == "PROPOSTA CONCLUÍDA COM SUCESSO" && resumoProposta.propostaDcms != undefined && resumoProposta.dadosBancarios.agencia == "" && resumoProposta.dadosBancarios.conta == "") {


        callTokenVendas(function (dataToken) {

            swal({
                title: "Aguarde",
                text: 'Estamos buscando sua proposta',
                content: "input",
                showCancelButton: false,
                showConfirmButton: false,
                imageUrl: "img/load.gif",
                icon: "info",
                button: {
                    text: "...",
                    closeModal: false,
                },
            });

            buscarFichaFinanceira(function (dataFichaFinanceira) {

                swal.close();

                if (dataFichaFinanceira.status == 500) {
                    possuiBoletos = false;
                    swal.close();
                    return;
                }

                $.each(dataFichaFinanceira.fichaFinanciera, function (i, item) {

                    possuiBoletos = true;

                    if (item.statusPagamento == "RENEGOCIADO" || item.statusPagamento == "EM ABERTO" || item.statusPagamento == "INCLUSAO DE TITULO") {


                        let dataDeRenegociacao = moment(item.dataRenegociacao);
                        let currentDate = moment();

                        if (dataDeRenegociacao.isSameOrAfter(currentDate)){
                            let competencia = item.competencia.split("/");
                            let meses = getRepository("meses");
                            let mesSelecionado = meses[competencia[0]];

                            let componenteRadioButton = getComponent("radioButtonBoleto");
                            componenteRadioButton = componenteRadioButton.replace("{CHECKED}", i == 0 ? "checked" : "");
                            componenteRadioButton = componenteRadioButton.replace("{ID}", "radio-" + i);
                            componenteRadioButton = componenteRadioButton.replace("{VENCIMENTOORIGINAL}", item.vencimentoOriginal);
                            componenteRadioButton = componenteRadioButton.replace("{PARCELA}", + item.parcela);
                            componenteRadioButton = componenteRadioButton.replace("{COMPETENCIALABEL}", mesSelecionado + " de " + competencia[1]);
                            componenteRadioButton = componenteRadioButton.replace("{ID2}", "radio-" + i);

                            $(".radio").append(componenteRadioButton);

                        }
                    }

                });

                console.log(dataFichaFinanceira);

            }, dataToken.access_token, resumoProposta.propostaDcms);

        });
    }
}

function buscarFichaFinanceira(callback, token, codigoProposta) {

    let currentTime = moment();
    currentTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    currentTime.toISOString();
    currentTime.format();

    let month = currentTime.format('MM');
    let year = currentTime.format('YYYY');

    var dataFinal = moment("01-" + month.toString() + "-" + year, "DD-MM-YYYY");
    var dataFinal = dataFinal.add(1, 'M');
    var dataFinal = dataFinal.add(1, 'Y');

    var bodyFichaFinanceira = getRepository("datasFichaFinanceira");
    bodyFichaFinanceira.codigo = codigoProposta;
    bodyFichaFinanceira.dataFinal = dataFinal.format("YYYY-MM-DD");

    $.ajax({
        async: true,
        //url: "http://172.18.203.21:8090/est-corretorboletoebs-api-rs-1.0/financeiro/obterfichafinanceira/numeroproposta",
        url: URLBase + "/corretor/boleto/1.0/financeiro/obterfichafinanceira/numeroproposta",
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache",
        },
        data: JSON.stringify(bodyFichaFinanceira),
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });


}

function popularCamposProposta() {

    let resumoProposta = get("resumoStatusPropostaPf");


    //retorno.cdVenda;
    $("#nomeTitular").html(resumoProposta.nome);
    $("#emailTitular").html(resumoProposta.email);
    $("#celularTitular").html(resumoProposta.celular);
    $("#cpfTitular").html(resumoProposta.cpf);
    $("#dataNascimentoTitular").html(resumoProposta.dataNascimento);
    $("#sexoTitular").html(resumoProposta.sexo == "f" ? "Feminino" : "Masculino");
    $("#nomeMaeTitular").html(resumoProposta.nomeMae);

    $("#cepTitular").html(resumoProposta.endereco.cep);
    $("#enderecoTitular").html(resumoProposta.endereco.logradouro);
    $("#numeroLogradouroTitular").html(resumoProposta.endereco.numero);
    $("#complementoTitular").html(resumoProposta.endereco.complemento == null ? "Não há complemento" : resumoProposta.endereco.complemento);
    $("#bairroTitular").html(resumoProposta.endereco.bairro);
    $("#cidadeTitular").html(resumoProposta.endereco.cidade);
    $("#estadoTitular").html(resumoProposta.endereco.estado);


        let componenteBoxPlano = getComponent("planoResumoStatusProposta");
        let planos = get("planos");

        let planoSelecionado = planos.filter(function (x) { return x.cdPlano == resumoProposta.planos[0].cdPlano });
        let valorDoPlano = planoSelecionado[0].valorFloat;

        if (planoSelecionado[0].desc == "Mensal") {
            var valorTotalProposta = (valorDoPlano * (resumoProposta.dependentes.length + 1));
        } else var valorTotalProposta = valorDoPlano * (resumoProposta.dependentes.length + 1);
        valorTotalProposta = valorTotalProposta.toFixed(2);



    componenteBoxPlano = componenteBoxPlano.replace("{VALOR}", planoSelecionado[0].valor);
    componenteBoxPlano = componenteBoxPlano.replace("{CENTAVO}", planoSelecionado[0].centavo);
    componenteBoxPlano = componenteBoxPlano.replace("{NOME}", planoSelecionado[0].nome.replace("Principal", ""));
    componenteBoxPlano = componenteBoxPlano.replace("{DESC}", planoSelecionado[0].desc);
    componenteBoxPlano = componenteBoxPlano.replace("{CSS}", planoSelecionado[0].css);
    componenteBoxPlano = componenteBoxPlano.replace("{CSSVALOR}", planoSelecionado[0].css);
    componenteBoxPlano = componenteBoxPlano.replace("div-excluir", "");
    componenteBoxPlano = componenteBoxPlano.replace("{QUANTBENEF}", "Total da proposta: R$ " + valorTotalProposta.replace(".", ","));

    $("#BoxPlanos").html(componenteBoxPlano);

    var dependentes = "";

    if (resumoProposta.dependentes.length == 0) {

        $("#dependentes").html('<label class="labelDadosResumoStatus">Não há dependentes</label>');
    }

    $.each(resumoProposta.dependentes, function (i, item) {

        var componente = getComponent("dependenteResumoProposta");
        componente = componente.replace("{NOME}", item.nome);
        componente = componente.replace("{NOMELABEL}", item.nome);
        componente = componente.replace("{EMAIL}", item.email);
        componente = componente.replace("{CELULAR}", item.celular);
        componente = componente.replace("{CPF}", item.cpf);
        componente = componente.replace("{NASC}", item.dataNascimento);
        componente = componente.replace("{SEXO}", item.sexo == "f" ? "Feminino" : "Masculino");
        componente = componente.replace("{MAE}", item.nomeMae);
        componente = componente.replace("{IDDEP}", i);

        $("#dependentes").append(componente);
    });

    if (resumoProposta.dadosBancarios.agencia == "" && resumoProposta.dadosBancarios.conta == "") {

        $("#formaPagamento").html("Boleto");
        if (resumoProposta.status.toUpperCase() == "PROPOSTA CONCLUÍDA COM SUCESSO") $(".btnPadBtmTop").removeClass("hide");
    } else {
        $("#formaPagamento").html("Débito em Conta");
    }

    if (resumoProposta.criticas.length > 0) {

        $("#divErros").removeClass('hide');

        $.each(resumoProposta.criticas, function (i, item) {

            if (item.nome != null) {
                $("#divErros").append('<p class="labelRedErrosFontBenef">' + item.nome.toLowerCase().capitalize() + ':</p>');
            }

            var erros = item.dsErroRegistro.split('.');

            $.each(erros, function (indErro, erroSplit) {

                if (erroSplit == "") return;

                var capitalize = erroSplit.trim().split(" ");

                $("#divErros").append('<p class="labelRedErrosFont">. ' + erroSplit.trim().toLowerCase().replace(capitalize[0].toLowerCase(), capitalize[0].toLowerCase().capitalize()) + '</p>');

            });

            $("#divErros").append("<br/>");

        });
    }
}

function efetuarDownload(numeroParcela, dataVencimentoOriginal) {

    let dataVencimento = moment();
    dataVencimento.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    dataVencimento.toISOString();
    dataVencimento.add(5, 'days');

    let resumoProposta = get("resumoStatusPropostaPf");

    var request = {
        "codigoDoAssociado": resumoProposta.propostaDcms,
        "dataVencimentoOriginal": dataVencimentoOriginal,
        "numeroParcela": numeroParcela,
        "dataVencimento": dataVencimento.format().toString(),
        "tipoBoleto": "PDF",
        "codigoSistema": "0",
        "realizarRenegociacao": "N"
    }

    callTokenVendas(function (dataToken) {

        swal({
            title: "Aguarde",
            text: 'Estamos baixando o boleto',
            content: "input",
            showCancelButton: false,
            showConfirmButton: false,
            imageUrl: "img/load.gif",
            icon: "info",
            button: {
                text: "...",
                closeModal: false,
            },
        });



        gerarDownloadBoleto(function (dataBoleto) {

            if (dataBoleto.status == undefined) {

                var base64str = dataBoleto;

                // decode base64 string, remove space for IE compatibility
                var binary = btoa(dataBoleto);

                ob.gerarArquivo(binary, resumoProposta.propostaDcms + numeroParcela);

                swal.close();

            }



        }, dataToken.access_token, request);


    });

}

function gerarDownloadBoleto(callback, token, request) {

    $.ajax({
        async: true,
        //url: "http://172.16.20.30:7001/portal-corretor-servico-0.0.1-SNAPSHOT/propostaCritica/buscarPropostaCritica/" + cdVenda,
        //url: "http://172.16.244.160:8080/propostaCritica/buscarPropostaCritica/" + cdVenda,
        url: URLBase + "/corretor/boleto/1.0/financeiro/gerarboletofile",
        //url: URLBase + "/corretorservicos/1.0/proposta/dados/critica/venda/" + cdVenda,
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache",
        },
        data: JSON.stringify(request),
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });

}