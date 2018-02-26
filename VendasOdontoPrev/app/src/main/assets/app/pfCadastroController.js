var preenchidos = false;

$(document).ready(function () {
    buscarPlanosSelecionados();
    carregarProposta();
});

function addDependente() {
    salvarRascunhoMemoria();
    window.location = "venda_pf_dados_dependentes.html";
}

function buscarPlanosSelecionados() {

    var proposta = get("propostaPf");
    var planos = get("planos");

    if (proposta == null) {
        window.location.href = "venda_index_pf.html";
    }

    $.each(proposta.planos, function (i, item) {
        var o = planos.filter(function (x) { return x.cdPlano == item.cdPlano });
        var plano = getComponent("plano");

        plano = plano.replace("{CDPLANO}", o[0].cdPlano);
        plano = plano.replace("{CDPLANO-BT}", o[0].cdPlano);
        plano = plano.replace("{NOME}", o[0].nome);
        plano = plano.replace("{DESC}", o[0].desc);
        plano = plano.replace("{VALOR}", o[0].valor);
        plano = plano.replace("{CENTAVO}", o[0].centavo);
        plano = plano.replace("{CSS}", o[0].css);
        plano = plano.replace("{CSSVALOR}", o[0].css);

        $("#planos").append(plano);
    });
}

function excluirPlano(obj) {

    var container = $(".div-excluir[data-id=" + $(obj).attr("data-id") + "]");
    var proposta = get("propostaPf");

    if (proposta == null) {
        proposta = getRepository("proposta");
    }

    var planosExcetoExcluido = proposta.planos.filter(function (x) { return x.cdPlano != container.attr("data-id") });
    proposta.planos = [];
    $.each(planosExcetoExcluido, function (i, item) {
        proposta.planos.push(item);
    });

    put("propostaPf", JSON.stringify(proposta));
    container.remove();

    swal({
        title: "Exclusão de Plano",
        text: "Você precisa escolher outro plano.",
        type: "info",
        showCancelButton: false,
        confirmButtonText: 'OK',
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            salvarRascunhoMemoria();
            window.location.href = "venda_index_pf.html";
        });
}

function salvarRascunho() {

    if ($(".nome").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        return;
    }

    if ($(".email").val() == "") {
        swal("Ops!", "Preencha o E-mail", "error");
        return;
    }

    if ($(".celular").val() == "") {
        swal("Ops!", "Preencha o celular", "error");
        return;
    }

    if ($(".cpf").val() == "") {
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a Data de Nascimento", "error");
        return;
    }

    if ($("#radio-1").is(":checked") == false && $("#radio-2").is(":checked") == false) {
        swal("Ops!", "Selecione o Sexo", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha Nome da Mãe", "error");
        return;
    }

    if ($(".cep").val() == "") {
        swal("Ops!", "Preencha o cep", "error");
        return;
    }

    if ($(".rua").val() == "") {
        swal("Ops!", "Preencha o endereço", "error");
        return;
    }

    if ($(".numeroEndereco").val() == "") {
        swal("Ops!", "Preencha o número do endereço", "error");
        return;
    }

    if ($(".complemento").val() == "") {
        swal("Ops!", "Preencha o complemento", "error");
        return;
    }

    if ($(".bairro").val() == "") {
        swal("Ops!", "Preencha o bairro", "error");
        return;
    }

    if ($(".cidade").val() == "") {
        swal("Ops!", "Preencha o cidade", "error");
        return;
    }

    if ($(".estado").val() == "") {
        swal("Ops!", "Preencha o estado", "error");
        return;
    }

    salvarRascunhoMemoria();
    window.location.href = "resumo_pf_proposta.html";
}

function salvarRascunhoMemoria() {
    var proposta = get("propostaPf");
    proposta.status = "DIGITANDO";
    proposta.nome = $(".nome").val();
    proposta.nascimento = $(".nascimento").val();
    proposta.cpf = $(".cpf").val();
    proposta.contatoEmpresa = $("#squaredOne").is(":checked");
    proposta.telefone = $(".telefone").val();
    proposta.celular = $(".celular").val();
    proposta.email = $(".email").val();
    proposta.endereco.cep = $(".cep").val();
    proposta.endereco.endereco = $(".endereco").val();
    proposta.endereco.numero = $(".numero").val();
    proposta.endereco.complemento = $(".complemento").val();
    proposta.endereco.bairro = $(".bairro").val();
    proposta.endereco.cidade = $(".cidade").val();
    proposta.endereco.estado = $(".estado").val();

    if ($("#radio-1").is(":checked") == true) {
        proposta.sexo = $("#radio-1").val();
    }
    else {
        proposta.sexo = $("#radio-2").val();
    }

    var pessoas = get("pessoas");

    if (pessoas == null) {
        pessoas = [];
        pessoas.push(proposta);
    }
    else {
        var propostas = pessoas.filter(function (x) { return x.cpf != proposta.cpf });
        pessoas = []; //limpar

        $.each(propostas, function (i, item) {
            pessoas.push(item);
        });

        pessoas.push(proposta);
    }

    put("pessoas", JSON.stringify(pessoas));
    put("propostaPf", JSON.stringify(proposta));
}

function carregarProposta() {
    var proposta = get("propostaPf");
    $(".nome").val(proposta.nome);
    $(".cpf").val(proposta.cpf);

    if (proposta.contatoEmpresa) {
        $("#squaredOne").attr("checked", true);
    }
    else {
        $("#squaredOne").attr("checked", false);
    }

    if (proposta.sexo == "m") {
        $("#radio-1").attr("checked", true);
    }
    else {
        $("#radio-2").attr("checked", true);
    }

    $(".telefone").val(proposta.telefone);
    $(".nascimento").val(proposta.nascimento);
    $(".celular").val(proposta.celular);
    $(".email").val(proposta.email);
    $(".cep").val(proposta.endereco.cep);
    $(".endereco").val(proposta.endereco.endereco);
    $(".numero").val(proposta.endereco.numero);
    $(".complemento").val(proposta.endereco.complemento);
    $(".bairro").val(proposta.endereco.bairro);
    $(".cidade").val(proposta.endereco.cidade);
    $(".estado").val(proposta.endereco.estado);

    listarDependentes();
}

function listarDependentes() {
    var proposta = get("propostaPf");

    $.each(proposta.dependentes, function (i, item) {
        var dep = getComponent("dependente");
        dep = dep.replace("{CPF}", item.cpf);
        dep = dep.replace("{CPF-BT}", item.cpf);
        dep = dep.replace("{CPF-DESC}", item.cpf);
        dep = dep.replace("{NOME}", item.nome);

        $("#listaDep").append(dep);
    });
}

function excluirDep(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");
    var proposta = get("propostaPf");

    var propostaExcetoExcluido = proposta.dependentes.filter(function (x) { return x.cpf != container.attr("data-id") });
    proposta.dependentes = [];
    $.each(propostaExcetoExcluido, function (i, item) {
        proposta.dependentes.push(item);
    });

    put("propostaPf", JSON.stringify(proposta));
    container.remove();

    atualizarPessoas(proposta);
}