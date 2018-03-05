﻿var problema = true;

$(document).ready(function () {
    carregarLista();
    carregarBenef();
    carregarBoxPlanos();

    $(".dependentes").change(function () {

        adicionarBenefMemoria();

        if (problema)
            return;

        var proposta = get("proposta");
        var benef = get("beneficiario");

        benef.dependentes = [];
        proposta.dependentes = [];
        atualizarEmpresas(proposta);

        put("proposta", JSON.stringify(proposta));
        put("beneficiario", JSON.stringify(benef));

        window.location.href = "venda_pme_dependentes.html";

        put("numeroDependentes", $(".dependentes").val());
    });
});

function carregarBoxPlanos() {
    console.log("Executou");
    var propostaPlanos = get("proposta");

    var sel = document.getElementById('planosPme');

    var planos = get("planos");

    console.log(planos);

    for (var i = 0; i < propostaPlanos.planos.length; i++) {

        console.log(propostaPlanos.planos[i].cdPlano);

        var plano = planos[i].nome;
        var codigo = planos[i].cdPlano;

        var opt = document.createElement('option');
        ////console.log(dataEspecialidades[i].descricao);
        opt.setAttribute('value', codigo);
        ////console.log(dataEspecialidades[i].codigo);
        opt.appendChild(document.createTextNode(plano));
        sel.appendChild(opt);
    }

}

function carregarLista() {

    var proposta = get("proposta");

    $("#razaoSocial").html(proposta.razaoSocial);
    $("#cnpjEmpresa").html(proposta.cnpj);

}

function salvarBenef() {

    adicionarBenefMemoria();

    if (problema)
        return;

    var benef = get("beneficiario");
    var beneficiarios = get("beneficiarios");

    if (beneficiarios == null) {
        beneficiarios = [];
    }

    beneficiarios.push(benef);

    put("beneficiarios", JSON.stringify(beneficiarios));

    swal({
        title: "Feito!",
        text: "Beneficiário cadastrado com sucesso.",
        type: "success",
        showCancelButton: false,
        confirmButtonText: 'OK',
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            window.location.href = "venda_pme_beneficiarios_lista.html";
        });
}

//$("#cpf").blur(function () {
//
//    if (!TestaCPF($("#cpf").val().replace(/\D/g, ''))) {
//        swal("Ops", "CPF inválido", "error");
//    }
//});

function carregarBenef() {
    var benef = get("beneficiario");

    if (benef == null) {
        return;
    }

    $("#nome-beneficiario").val(benef.nome);
    $(".nome-mae").val(benef.nomeMae);

    $(".dependentes").val(benef.dependentes.length);

    if (benef.sexo == "m") {
        $("#radio-1").attr("checked", true);
    }
    else {
        $("#radio-2").attr("checked", true);
    }

    $(".nascimento").val(benef.dataNascimento);
    $(".cpf").val(benef.cpf);
    $(".cep").val(benef.endereco.cep);
    $(".plano").val(benef.cdPlano);
}

function adicionarBenefMemoria() {
    var proposta = get("proposta");
    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade;


    if ($("#nome-beneficiario").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($("#radio-1").is(":checked") == false && $("#radio-2").is(":checked") == false) {
        swal("Ops!", "Selecione o Sexo", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a Data de Nascimento", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".cpf").val() == "" || !TestaCPF($(".cpf").val().replace(/\D/g, ''))) {
        console.log("Validando cpf");
        swal("Ops!", "CPF está inválido", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha o Nome da Mãe", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".cep").val() == "") {
        swal("Ops!", "Preencha o CEP", "error");
        $(".dependentes").val(0);
        return;
    }

    if (!validarData($(".nascimento").val())) {
        swal("Ops!", "Preencha uma data de nascimento correta", "error");
        return;
    }

    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if (menor < 18) {
        swal("Ops!", "O Titular não pode ser menor de idade", "error");
        $(".dependentes").val(0);
        return;
    }

    var benef = getRepository("beneficiario");
    var benefMemoria = get("beneficiario");
    var benefTodos = get("beneficiarios");

    if (benefTodos != null) {
        var existe = benefTodos.filter(function (x) { return x.cpf == $("#cpf").val() });

        if (existe.length > 0) {
            swal("Conflito!", "Já existe um Beneficiário com este CPF", "error");
            $(".dependentes").val(0);
            return;
        }
    }

    if (benefMemoria != null) {
        benef.dependentes = benefMemoria.dependentes;
    }

    problema = false;

    benef.nome = $("#nome-beneficiario").val();
    benef.nomeMae = $(".nome-mae").val();

    if ($("#radio-1").is(":checked") == true) {
        benef.sexo = $("#radio-1").val();
    }
    else {
        benef.sexo = $("#radio-2").val();
    }

    benef.dataNascimento = $(".nascimento").val();
    benef.cpf = $(".cpf").val();
    benef.cnpj = proposta.cnpj;
    benef.endereco.cep = $(".cep").val();
    benef.cdPlano = $(".plano").val();

    put("beneficiario", JSON.stringify(benef));



    return benef;
}

