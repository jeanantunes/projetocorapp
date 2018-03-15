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

    if ($(".cpf").val() == "" && menor > 18) {
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if (menor >= 18) {
        if ($(".cpf").val() == "") {
            console.log("Validando cpf");
            swal("Ops!", "CPF está inválido", "error");
            return;
        }        
    }

    //if ($("#cpf").val() == "" || !TestaCPF($("#cpf").val().replace(/\D/g, ''))) {
    //    console.log("Validando cpf");
    //    swal("Ops!", "CPF está inválido", "error");
    //    return;
    //}      

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

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha o Nome da Mãe", "error");
        return;
    }

    if (!ValidaNome($("#nomeMae").val())) {
        swal("Ops!", "Nome da mãe inválido", "error");
        return false;
    }

    var proposta = get("propostaPf");

    var cpf = $(".cpf").val();
    var qtdDep = proposta.dependentes.filter(function (x) { return x.cpf == cpf }).length;
    if (qtdDep > 1) {
        swal("Ops!", "Existem dependentes com o mesmo CPF, por favor verifique.", "error");
        return;
    }

    problema = false;


    var dependente = getRepository("dependente");
    dependente.nome = $(".nome").val();
    dependente.dataNascimento = $(".nascimento").val();
    dependente.cpf = $(".cpf").val();
    dependente.email = $(".email").val();
    dependente.nomeMae = $(".nome-mae").val()
    dependente.dataNascimento = $(".nascimento").val();
    dependente.sexo = $(".sexo").val();

    if (proposta.dependentes.length == 0) {
        proposta.dependentes = [];
    }

    proposta.dependentes.push(dependente);
    put("propostaPf", JSON.stringify(proposta));

    atualizarPessoas(proposta);
}

$(".cpf").focusout(function () {
    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if (menor >= 18) {
        var stringteste = $(this).val().replace(".", "");
        stringteste = stringteste.replace("-", "");
        stringteste = stringteste.replace(".", "");

        console.log(stringteste);

        if ($(this).val() == "" || TestaCPF(stringteste) == false) {
            $(this).css({ "border-color": "#F00" });
            $(".label-cpf").css("color", "red");
            $(".cpf").css("color", "red");
        }
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