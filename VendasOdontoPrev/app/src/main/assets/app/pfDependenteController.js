var problema = true;

$(document).ready(function () {

    $('.nascimento').mask('00/00/0000');
    $('.cpf').mask('000.000.000-00');

    $('.cpf').off('blur').on();
});

function SalvarDependente() {

    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if ($(".nome").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        return;
    }

    if (!ValidaNome($("#nomeDependente").val())) {
        swal("Ops!", "Nome inválido", "error");
        return false;
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
        swal("Ops!", "Preencha o Celular", "error");
        return;
    }   

    if ($(".celular").val().length < 15) {
        swal("Ops!", "Preencha o Celular", "error");
        return;
    } 

    var benef = get("propostaPf");
    if (benef.cpf == $(".cpf").val() && $(".cpf").val() != "") {
        swal("Conflito!", "Você informou o mesmo CPF do titular para este dependente, por favor verifique.", "error");
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a data de nascimento", "error");
        return;
    }

    if (!validarData($(".nascimento").val())) {
        swal("Ops!", "Preencha uma data de nascimento correta", "error");
        return;
    }

    var dateNascimento = toDate($(".nascimento").val());

    if ($(".cpf").val() == "" && isMaiorDeIdade(dateNascimento)) {
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if (!TestaCPF($(".cpf").val())) {
        swal("Ops!", "CPF Inválido", "error");
        return;
    }

    var proposta = get("propostaPf");
    var planos = get("CodPlanos");
    var plano = planos.filter(function (x) { return x.cdPlano == proposta.planos[0].cdPlano });

    if (!menorQueSeteAnos(dateNascimento) && plano[0].nome.indexOf("DENTE DE LEITE") !== -1) {

        swal("Ops!", "No plano dente de leite o dependente deve ter menos que 7 anos", "error");
        return false;
    }

    if ($("#radio-1").is(":checked") != true && $("#radio-2").is(":checked") != true ) {
        swal("Ops!", "Selecione o sexo do dependente", "error");
        return false;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha o Nome da Mãe", "error");
        return;
    }

    if (!ValidaNome($("#nomeMae").val())) {
        swal("Ops!", "Nome da mãe inválido", "error");
        return false;
    }

    var proposta = get("propostaPf");

    var listBeneficiarios = listCpfPropostaPf();
    var responsavelContratual = listBeneficiarios.filter(function (x) { return x.tipo == "responsavelContratual" });
    var dependentes = listBeneficiarios.filter(function (x) { return x.tipo == "dependente" });
    var checkDependentes = dependentes.filter(function (x) { return x.cpf == $(".cpf").val() && x.cpf != "" });
    var checkDependentesSemCpf = dependentes.filter(function (x) { return x.cpf == "" && x.nome == $(".nome").val() && x.dataNascimento == $(".nascimento").val() });

    if (checkDependentes.length > 0) {

        swal("Ops!", "Ops! Não será possível adicionar um dependente com dados duplicados em uma venda", "error")
        return;

    }

    if (checkDependentesSemCpf.length > 0) {

        swal("Ops!", "Ops! Não será possível adicionar um dependente com dados duplicados em uma venda", "error")
        return;

    }

    if(responsavelContratual.length > 0){

        if (responsavelContratual[0].cpf == $(".cpf").val()) {

            if ($(".nome").val().trim() != responsavelContratual[0].nome) {

                swal("Ops!", "O nome digitado é diferente do nome do responsável contratual", "error")
                return;

            }

            if ($(".nascimento").val() != responsavelContratual[0].dataNascimento) {

                swal("Ops!", "A data de nascimento digitada é diferente do data de nascimento do responsável contratual", "error")
                return;
            }
        }
    }

    problema = false;

    var dependente = getRepository("dependente");
    dependente.nome = $(".nome").val();
    dependente.nome = dependente.nome.toUpperCase();
    dependente.dataNascimento = $(".nascimento").val();
    dependente.cpf = $(".cpf").val();
    dependente.email = $(".email").val();
    dependente.nomeMae = $(".nome-mae").val();
    dependente.nomeMae = dependente.nomeMae.toUpperCase();
    dependente.dataNascimento = $(".nascimento").val();

    if ($("#radio-1").is(":checked") == true) {
        dependente.sexo = $("#radio-1").val();
    }
    else {
        dependente.sexo = $("#radio-2").val();
    }

    dependente.celular = $("#celularDependente").val();

    if (proposta.dependentes.length == 0) {
        proposta.dependentes = [];
    }

    proposta.dependentes.push(dependente);
    put("propostaPf", JSON.stringify(proposta));

    atualizarPessoas(proposta);
}

$(".cpf").focusout(function () {

    var dataNascimento = toDate($(".nascimento").val());

    if (isMaiorDeIdade(dataNascimento)) {

        var stringCpf = $(this).val();

        if ($(this).val() == "" || !TestaCPF(stringCpf)) {

            $(this).css({ "border-color": "#F00" });
            $(".label-cpf").css("color", "red");
            $(".cpf").css("color", "red");

        }

    }
});

$(".nascimento").focusout(function () {

    var dataNascimento = toDate($(this).val());

    if (isMaiorDeIdade(dataNascimento)) {

        var stringCpf = $('.cpf').val();

        if ($('.cpf').val() == "" || !TestaCPF(stringCpf)) {

            $('.cpf').css({ "border-color": "#F00" });
            $(".label-cpf").css("color", "red");
            $(".cpf").css("color", "red");

        } else {

            $('.cpf').css({ "border-color": "#3A94FB" });
            $(".label-cpf").css("color", "#3A94FB");
            $(".cpf").css("color", "#3A94FB");
            
        }

    } else if ($('.cpf').val() == "") {

        $('.cpf').css({ "border-color": "#ACAAA5" });
        $(".label-cpf").css("color", "#ACAAA5");
        $(".cpf").css("color", "#ACAAA5");

    }
});

function salvarEVoltar() {
    SalvarDependente();

    if (problema == false)
        window.location.href = 'venda_pf_dados_proposta.html';
}

function salvarEContinuar() {
    SalvarDependente();

    if (problema == false)
        window.location.href = 'venda_pf_dados_dependentes.html';
}