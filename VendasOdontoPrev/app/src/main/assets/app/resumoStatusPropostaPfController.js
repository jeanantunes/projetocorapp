$(document).ready(function () {

    popularCamposProposta();

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
});

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

    //if ((valorTotalProposta % 2) == 0 || (valorTotalProposta % 2) == 1) {
    //    var valorReal = valorTotalProposta;
    //    var valorCent = "00";
    //} else {
    //    
    //    var valorString = valorTotalProposta.toString();
    //    console.log(valorTotalProposta.indexOf("."));
    //    var position = valorTotalProposta.indexOf(".");
    //    var tamanhoString = valorTotalProposta.toString().length;
    //
    //    var valorReal = valorTotalProposta.substring(0, position);
    //    var valorCent = valorTotalProposta.substring(position + 1, position + 3);
    //
    //    if (valorCent.toString().length == 1) valorCent = parseFloat(valorCent.toString() + "0");
    //}

    componenteBoxPlano = componenteBoxPlano.replace("{VALOR}", planoSelecionado[0].valor);
    componenteBoxPlano = componenteBoxPlano.replace("{CENTAVO}", planoSelecionado[0].centavo);
    componenteBoxPlano = componenteBoxPlano.replace("{NOME}", planoSelecionado[0].nome);
    componenteBoxPlano = componenteBoxPlano.replace("{DESC}", planoSelecionado[0].desc);
    componenteBoxPlano = componenteBoxPlano.replace("{CSS}", planoSelecionado[0].css);
    componenteBoxPlano = componenteBoxPlano.replace("{CSSVALOR}", planoSelecionado[0].css);
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