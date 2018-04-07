$(document).ready(function () {

    carregarDadosProposta();
    buscarPlanosSelecionados();
    carregarLista();   
    setTotalProposta();
    isEffectiveDate();
});

function carregarDadosProposta()
{
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

function setTotalProposta()
{
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

    var valorTotal = valorProposta;

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

    var currentTime = new Date();
    currentTime.setHours(0, 0, 0, 0);

    var dateCurt = new Date();
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();

    //data vencimento
    var DueDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);

    //data movimento
    var movingDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);
    // vigencia
    var effectiveDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);

    var addMonth = 1;

    switch (dayDueDate) {
        case "05":
            effectiveDate = new Date(year, month, 5, 0, 0, 0, 0);
            movingDate = new Date(year, month, 25, 0, 0, 0, 0);
            dateCurt = new Date(movingDate);
            //year, month, 24, 0, 0, 0, 0
            break;

        case "15":
            effectiveDate = new Date(year, month, 15, 0, 0, 0, 0);
            movingDate = new Date(year, month, 5, 0, 0, 0, 0);
            dateCurt = new Date(year, month, 4, 0, 0, 0, 0);
            break;

        case "25":
            effectiveDate = new Date(year, month, 25, 0, 0, 0, 0);
            movingDate = new Date(year, month, 15, 0, 0, 0, 0);
            dateCurt = new Date(year, month, 14, 0, 0, 0, 0);
            break;
    }

    if (DueDate <= currentTime || currentTime > dateCurt) {
        DueDate.setMonth(DueDate.getMonth() + addMonth);
    }

    if (effectiveDate <= currentTime || effectiveDate <= DueDate) {
        effectiveDate.setMonth(effectiveDate.getMonth() + addMonth);
    }

    if (movingDate <= currentTime && currentTime > dateCurt) {
        movingDate.setMonth(movingDate.getMonth() + addMonth);
    }

    //console.log('Data Atual: ' + currentTime);
    //console.log('Data de corte: ' + dateCurt);
    //console.log('Data Vencimento: ' + DueDate);
    //console.log('Data de vigencia: ' + effectiveDate);
    //console.log('Data de movimentação: ' + movingDate);

    var newdate = new Date(DueDate);

    newdate.setDate(newdate.getDate() - 11); // minus the date

    var newDateCurt = new Date(newdate);

    $("#divProximoMes").addClass('hide');
    $("#vencimento").html(DueDate.toLocaleDateString());
    $("#corte").html(newDateCurt.toLocaleDateString());
    $("#vigencia").html(effectiveDate.toLocaleDateString());

    //$("#movimentacao").html('Data de movimentação <br>' + movingDate.toLocaleDateString());

    if (movingDate < currentTime) {
        //$("#divProximoMes").removeClass('hide');
        //$("#proximoMes").html('Para o vencimento escolhido, a vigência deste contrato ficará para o próximo mês.');
        //console.log('Para o vencimento escolhido, a vigência deste contrato ficará para o próximo mês.');
        return false;
    }
    return true;
}