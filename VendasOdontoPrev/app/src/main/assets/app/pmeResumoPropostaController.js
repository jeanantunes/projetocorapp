emRequisicao = false;

$(document).ready(function () {

    carregarDadosProposta();
    buscarPlanosSelecionados();
    carregarLista();
    setTotalProposta();
    isEffectiveDate();

    $("#enviarPropostaPme").click(function () {

        if (emRequisicao) return;

        $("#enviarPropostaPme").prop('disabled', true);
        emRequisicao = true;

        enviarPropostaPme();

    });

});

function carregarDadosProposta() {
    var proposta = get("proposta");
    $("#cnpjResumo").val(proposta.cnpj);
    $("#razaoSocialResumo").val(proposta.razaoSocial);
    $("#nomeFantasiaResumo").val(proposta.nomeFantasia);
    $("#ramoAtividadeResumo").val(proposta.ramoAtividade);
    $("#representanteLegalResumo").val(proposta.representanteLegal);
    $("#cpfResumo").val(proposta.cpfRepresentante);
    $("#telefoneResumo").val(proposta.telefone);
    $("#celularResumo").val(proposta.celular);
    $("#emailResumo").val(proposta.email);
    $("#cepResumo").val(proposta.enderecoEmpresa.cep);
    $("#enderecoResumo").val(proposta.enderecoEmpresa.logradouro);
    $("#numeroResumo").val(proposta.enderecoEmpresa.numero);
    $("#complementoResumo").val(proposta.enderecoEmpresa.complemento);
    $("#bairroResumo").val(proposta.enderecoEmpresa.bairro);
    $("#cidadeResumo").val(proposta.enderecoEmpresa.cidade);
    $("#estadoResumo").val(proposta.enderecoEmpresa.estado);
}

function adicionarBenef() {
    localStorage.removeItem("beneficiario");
    window.location.href = "venda_pme_beneficiarios.html";
}

function carregarLista() {

    var proposta = get("proposta");


    $("#razaoSocial").html(proposta.razaoSocial);
    $("#cnpjEmpresa").html(proposta.cnpj);

    var beneficiarios = get("beneficiarios");
    beneficiarios = beneficiarios.filter(function (x) { return x.cnpj == proposta.cnpj });

    if (beneficiarios != null) {
        $("#lista").html("");
    }

    $.each(beneficiarios, function (i, item) {
        var benef = getComponent("beneficiario");
        benef = benef.replace("{CPF}", item.cpf);
        benef = benef.replace("{CPF-BT}", item.cpf);
        benef = benef.replace("{CPF-BTNEXCLUIR}", item.cpf);
        benef = benef.replace("{NASCIMENTO-EDITAR}", item.dataNascimento);
        benef = benef.replace("{NOME}", item.nome);
        benef = benef.replace("{DEPENDENTES}", item.dependentes.length);
        benef = benef.replace("{NOME-BENEF}", item.nome);

        $("#lista").append(benef);
    });

    $(".lista").css('margin-left', '15px');
    $(".lista").css('margin-right', '15px');
    //$(".lista").css('margin-top', '0px');
    if (beneficiarios.length == 0) {
        $("#lista").html("Você ainda não possui beneficiários cadastrados");
    }

}

function excluirBenef(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");
    var beneficiarios = get("beneficiarios");

    var quantidadeBeneficiarios = 0;

    var beneficiariosExcetoExcluido = beneficiarios.filter(function (x) { return x.cpf != container.attr("data-id") });
    var beneficiarioSelecionado = beneficiarios.filter(function (x) { return x.cpf == container.attr("data-id") });
    var beneficiariosDaProposta = beneficiarios.filter(function (x) { return x.cnpj == beneficiarioSelecionado[0].cnpj });

    beneficiarios = [];
    $.each(beneficiariosExcetoExcluido, function (i, item) {

        beneficiarios.push(item);
    });


    $.each(beneficiariosDaProposta, function (i, item) {
        quantidadeBeneficiarios++;
        quantidadeBeneficiarios += item.dependentes.length;
    });


    if (quantidadeBeneficiarios <= 3) {

        swal("Ops!", "Uma proposta pme não pode haver menos que 3 dependentes", "error");
        return;

    }

    put("beneficiarios", JSON.stringify(beneficiarios));
    container.remove();

    $("#planos").html("");
    buscarPlanosSelecionados();
    setTotalProposta();

    //if ($("#lista").length == 0) {
    //    $("#lista").html("Você ainda não possui beneficiários cadastrados");
    //}
    //
    //if (beneficiarios.length == 0) {
    //    $("#lista").html("Você ainda não possui beneficiários cadastrados");
    //}
}

function editarBeneficiario(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");
    var beneficiarios = get("beneficiarios");
    var beneficiarioSelecionado = beneficiarios.filter(function (x) { return x.cpf == container.attr("data-id") });


    put("cpfEmEdicaoPME", JSON.stringify(beneficiarioSelecionado[0].cpf));
    put("beneficiario", JSON.stringify(beneficiarioSelecionado[0]));

    window.location.href = "venda_pme_beneficiarios.html";
}

function buscarPlanosSelecionados() {

    var proposta = get("proposta");
    var planos = get("planos");
    var beneficiarios = get("beneficiarios");

    var benefDaPropostaBuscaPlanos = beneficiarios.filter(function (x) {
        return x.cnpj == proposta.cnpj;
    });

    $.each(proposta.planos, function (i, item) {

        var o = planos.filter(function (x) { return x.cdPlano == item.cdPlano });
        var plano = getComponent("plano");

        var beneficiariosDessePlano = benefDaPropostaBuscaPlanos.filter(function (x) {
            return x.cdPlano == o[0].cdPlano;
        });

        var quantidadeBeneficiarios = 0;

        $.each(beneficiariosDessePlano, function (i, item) {

            quantidadeBeneficiarios += item.dependentes.length + 1;

        });

        plano = plano.replace("{CDPLANO}", o[0].cdPlano);
        plano = plano.replace("{CDPLANO-BT}", o[0].cdPlano);
        plano = plano.replace("{NOME}", o[0].nome);
        plano = plano.replace("{DESC}", o[0].desc);
        plano = plano.replace("{VALOR}", o[0].valor);
        plano = plano.replace("{CENTAVO}", o[0].centavo);
        plano = plano.replace("{CSS}", o[0].css);
        plano = plano.replace("{CSSVALOR}", o[0].css);
        if (quantidadeBeneficiarios > 1 || quantidadeBeneficiarios == 0) {
            plano = plano.replace("{QUANTBENEF}", quantidadeBeneficiarios + " Beneficiários");
        } else plano = plano.replace("{QUANTBENEF}", quantidadeBeneficiarios + " Beneficiário");


        $("#planos").append(plano);

        $(".btnExcluirPlano").addClass('hide');
    });
}

function setTotalProposta() {
    var planos = get("planos");
    var proposta = get("proposta");
    var beneficiarios = get("beneficiarios");
    var valorProposta = 0;

    var beneficiariosDaProposta = beneficiarios.filter(function (x) {
        return x.cnpj == proposta.cnpj;
    });

    $.each(beneficiariosDaProposta, function (i, item) {

        var plano = planos.filter(function (x) {
            return x.cdPlano == item.cdPlano;
        });

        var quantidadeBeneficiarios = item.dependentes.length + 1;

        valorProposta += quantidadeBeneficiarios * plano[0].valorFloat;

    });

    var valorTotal = valorProposta.toFixed(2);

    if ((valorTotal % 2) == 0 || (valorTotal % 2) == 1) {
        var valorReal = valorTotal;
        var valorCent = "00";
    } else {
        var valorString = valorTotal.toString();
        var position = valorString.indexOf(".");
        var tamanhoString = valorTotal.toString().length;

        var valorReal = valorString.substring(0, position);
        var valorCent = valorString.substring(position + 1, position + 3);

        if (valorCent.toString().length == 1) valorCent = parseFloat(valorCent.toString() + "0");
    }

    $("#valorTotalResumoPropostaPme").html("R$ " + valorReal + "," + valorCent);

}

function isEffectiveDate() {

    var proposta = get("proposta");
    var dayDueDate = proposta.vencimentoFatura;

    if (!dayDueDate) {
        console.log('dia informado invalido');
        return false;
    }

    var currentTime = moment();
    currentTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    currentTime.toISOString();
    currentTime.format();

    var month = currentTime.format('MM');
    var day = currentTime.format('DD');
    var year = currentTime.format('YYYY');

    $("#divProximoMes").addClass('hide');

    switch (dayDueDate) {

        case "05":

            var vencimento;
            var dataVencimento = moment("05-" + month.toString() + "-" + year, "DD-MM-YYYY");
            var dataVencimento = dataVencimento.add(1, 'M');

            var olderDate = moment(dataVencimento).add(-12, "days");

            if (currentTime.isAfter(olderDate)) vencimento = dataVencimento.add(1, 'M');
            else vencimento = dataVencimento;

            var dataDeCorteDeMovimentacao = moment(dataVencimento).add(-11, "days");

            $("#divProximoMes").addClass('hide');
            $("#vencimento").html(vencimento.format("DD/MM/YYYY"));
            $("#corte").html(dataDeCorteDeMovimentacao.format("DD/MM/YYYY"));
            $("#vigencia").html(vencimento.format("DD/MM/YYYY"));
            return vencimento;

        case "15":

            var vencimento;
            var dataVencimento = moment("15-" + month.toString() + "-" + year, "DD-MM-YYYY");
            var olderDate = moment(dataVencimento).add(-12, "days");

            if (currentTime.isAfter(olderDate)) vencimento = dataVencimento.add(1, 'M');
            else vencimento = dataVencimento;

            var dataDeCorteDeMovimentacao = moment(dataVencimento).add(-11, "days");

            $("#divProximoMes").addClass('hide');
            $("#vencimento").html(vencimento.format("DD/MM/YYYY"));
            $("#corte").html(dataDeCorteDeMovimentacao.format("DD/MM/YYYY"));
            $("#vigencia").html(vencimento.format("DD/MM/YYYY"));
            return vencimento;

        case "25":

            var vencimento;
            var dataVencimento = moment("25-" + month.toString() + "-" + year, "DD-MM-YYYY");
            var olderDate = moment(dataVencimento).add(-12, "days");

            if (currentTime.isAfter(olderDate)) vencimento = dataVencimento.add(1, 'M');
            else vencimento = dataVencimento;

            var dataDeCorteDeMovimentacao = moment(dataVencimento).add(-11, "days");

            $("#divProximoMes").addClass('hide');
            $("#vencimento").html(vencimento.format("DD/MM/YYYY"));
            $("#corte").html(dataDeCorteDeMovimentacao.format("DD/MM/YYYY"));
            $("#vigencia").html(vencimento.format("DD/MM/YYYY"));
            return vencimento;

    }
}

function enviarPropostaPme() {

    if (!navigator.onLine) {
        swal("Você está sem Internet", "Não se preocupe, você pode acessar a tela inicial e enviar esta proposta depois.", "info");
        emRequisicao = false;
        $("#enviarPropostaPme").prop('disabled', false);
        return;
    }

    setTimeout(function () {

        swal({
            title: "Aguarde",
            text: 'Estamos enviando a sua proposta',
            content: "input",
            imageUrl: "img/icon-aguarde.gif",
            showCancelButton: false,
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            icon: "info",
            button: {
                text: "...",
                closeModal: false,
            },
        });

    }, 250);

    var proposta = get("proposta");
    var empresas = get("empresas");
    var beneficiarios = get("beneficiarios");

    proposta.status = "PRONTA";
    atualizarEmpresas(proposta);
    put("proposta", JSON.stringify(proposta));

    var beneficiarios = beneficiarios.filter(function (x) { return x.cnpj == proposta.cnpj });
    var todosExcetoExclusao = empresas.filter(function (x) { return x.cnpj != proposta.cnpj });

    proposta.status = "SYNC";
    proposta.horaSync = new Date();

    todosExcetoExclusao.push(proposta);

    put("empresas", JSON.stringify(todosExcetoExclusao));



    consultarSerasa(function (dataProposta) {


        if (dataProposta == "error") {

            setTimeout(function () {
                swal("Ops!", "Erro na consulta do CNPJ, mas sua proposta está salva.\n\nTente envia-la mais tarde.", "error");
                proposta.status = "PRONTA";
                put("proposta", JSON.stringify(proposta));
                atualizarEmpresas(proposta);
                emRequisicao = false;
                $("#enviarPropostaPme").prop('disabled', false);
                
            }, 250);

            return;
        };

        proposta = dataProposta;

        var parametroEmpresa = [];
        parametroEmpresa.push(proposta);

        sincronizarPME(function (dataVendaPme) {

            if (dataVendaPme.id != undefined) {

                if (dataVendaPme.id == 0) {

                    proposta.status = "CRITICADA";
                    atualizarEmpresas(proposta);

                    emRequisicao = false;
                    $("#enviarPropostaPme").prop('disabled', false);

                }
                else {

                    var empresas = get("empresas");
                    var todosExcetoExclusao = empresas.filter(function (x) { return x.cnpj != proposta.cnpj });

                    proposta.status = "ENVIADA";

                    todosExcetoExclusao.push(proposta);

                    put("empresas", JSON.stringify(todosExcetoExclusao));

                    atualizarDashBoard();
                    swal.close();

                    window.location.href = "proposta_pme_enviada.html?cdEmpresa=" + dataVendaPme.cdEmpresa;

                }

            } else {

                let atualizarProposta = get("proposta");
                atualizarProposta.status = "PRONTA";
                put("proposta", JSON.stringify(atualizarProposta));
                atualizarEmpresas(atualizarProposta);

                setTimeout(function () {

                    swal("Ops!", "Algo deu errado. Por favor, tente enviar outra vez a proposta.", "error");
                    emRequisicao = false;
                    $("#enviarPropostaPme").prop('disabled', false);

                }, 250);

            }

        }, parametroEmpresa, beneficiarios);

    }, proposta);
}