var preenchidos = false;

$(document).ready(function () {
    buscarPlanosSelecionados();
    carregarProposta();
});

function addDependente() {

    if ($("#cpf").val() == "") {
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if (!TestaCPF($("#cpf").val())) {
        swal("Ops!", "CPF inválido", "error");
        return;
    }

    if ($(".nome").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        return;
    }

    if ($(".email").val() == "") {
        swal("Ops!", "Preencha o E-mail", "error");
        return;
    }

    if (!validateEmail($(".email").val())) {
        swal("Ops!", "Preencha um E-mail válido", "error");
        return;
    }
    
    if ($(".celular").val() == "") {
        swal("Ops!", "Preencha o celular", "error");
        return;
    }

    if ($(".cpf").val() == "" || !TestaCPF($("#cpf").val().replace().replace(/\D/g, ''))) {

        $("#cpf").focus();
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if (!validarData($(".nascimento").val())) {
        swal("Ops!", "Preencha uma data de nascimento correta", "error");
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

    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if (menor < 18) {
        swal("Ops!", "O Titular não pode ser menor de idade", "error");
        return;
    }

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

//$("#cpf").blur(function () {
//
//    if (!TestaCPF($("#cpf").val().replace().replace(/\D/g, ''))) {
//        swal("Ops", "CPF inválido", "error");
//    }
//});

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

    if ($(".cpf").val() == "" || !TestaCPF($("#cpf").val().replace().replace(/\D/g, ''))) {

        $("#cpf").focus();
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if ( !validarData($(".nascimento").val() ) ) {
        swal("Ops!", "Preencha uma data de nascimento correta", "error");
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


    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if (menor < 18) {
        swal("Ops!", "O Titular não pode ser menor de idade", "error");
        return;
    }

   salvarRascunhoMemoria();
    window.location.href = "resumo_pf_proposta.html";
}

//$("#data").blur(function () {
//
//    var id = document.getElementById('data');
//
//    var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
//
//    if (!((id.value.match(RegExPattern)) && (id.value != ''))) {
//        console.log("data invalida");
//        id.focus();
//    }
//    else console.log("data valida");
//
//});

function salvarRascunhoMemoria() {

    var proposta = get("propostaPf");
    proposta.status = "DIGITANDO";
    proposta.nome = $(".nome").val();
    proposta.dataNascimento = $(".nascimento").val();
    proposta.cpf = $(".cpf").val();
    proposta.nomeMae = $("#nomeMae").val();
    proposta.contatoEmpresa = $("#squaredOne").is(":checked");
    proposta.telefone = $(".telefone").val();
    proposta.celular = $(".celular").val();
    proposta.email = $(".email").val();
    proposta.endereco.cep = $(".cep").val();
    proposta.endereco.logradouro = $(".endereco").val();
    proposta.endereco.numero = $(".numero").val();
    proposta.endereco.complemento = $(".complemento").val();
    proposta.endereco.bairro = $(".bairro").val();
    proposta.endereco.cidade = ($(".cidade").val());
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
    $("#nomeBeneficiario").val(proposta.nome);
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

    $("#nomeMae").val(proposta.nomeMae);
    $(".telefone").val(proposta.telefone);
    $(".nascimento").val(proposta.dataNascimento);
    $(".celular").val(proposta.celular);
    $(".email").val(proposta.email);
    $(".cep").val(proposta.endereco.cep);
    $(".endereco").val(proposta.endereco.logradouro);
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
        dep = dep.replace("{CPF}", (item.cpf == "" ? item.nome : item.cpf));
        dep = dep.replace("{CPF-BT}", (item.cpf == "" ? item.nome : item.cpf));
        dep = dep.replace("{CPF-DESC}", item.cpf);
        dep = dep.replace("{NOME}", item.nome);
        dep = dep.replace("{NOME-DEP}", item.nome);
        $("#listaDep").append(dep);
    });
}

function excluirDep(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");

    //if (container.length == 0) {
    //
    //    var container = $(".div-excluir[data-id='" + $(obj).attr("data-nome") + "']");
    //}
    var proposta = get("propostaPf");

    var propostaExcetoExcluido = proposta.dependentes.filter(function (x) { return x.cpf != container.attr("data-id")});
    proposta.dependentes = [];
    $.each(propostaExcetoExcluido, function (i, item) {
        proposta.dependentes.push(item);
    });

    put("propostaPf", JSON.stringify(proposta));
    container.remove();

    atualizarPessoas(proposta);
}


// Mantém os inputs em cache:
var inputs = $('input');

// Chama a função de verificação quando as entradas forem modificadas
// Usei o 'keyup', mas 'change' ou 'keydown' são também eventos úteis aqui
inputs.on('keyup', verificarInputs);

function verificarInputs() {
    inputs.each(function () {
        // verificar um a um e passar a false se algum falhar
        // no lugar do if pode-se usar alguma função de validação, regex ou outros
        var id = this.id;
        //console.log(id);

        if (!this.value) {
            preenchidos = false;
            //swal("Ops!", "Por Favor preencha todos os Dados");

            // parar o loop, evitando que mais inputs sejam verificados sem necessidade
            return false;
        }

    });

    preenchidos = true;  // assumir que estão preenchidos

    // Habilite, ou não, o <button>, dependendo da variável:
    $("#continuarVendaPf").removeClass('disabled'); //,
    return true;
}