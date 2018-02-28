var problema = true;

$(document).ready(function () {

    $('.nascimento').mask('00/00/0000');
    $('.cpf').mask('000.000.000-00');
});


function SalvarDependente() {

    if ($(".nome").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        return;
    }

    if ($(".email").val() == "") {
        swal("Ops!", "Preencha o E-mail", "error");
        return;
    }

    if ($(".celular").val() == "") {
        swal("Ops!", "Preencha o Celular", "error");
        return;
    }

    if ($(".cpf").val() == "") {
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a data de nascimento", "error");
        return;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha o Nome da Mãe", "error");
        return;
    }

    problema = false;

    var proposta = get("propostaPf");
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

$("#cpf").blur(function () {

    console.log("teste");
    if (!TestaCPF($("#cpf").val().replace().replace(/\D/g, ''))) {
        swal("Ops", "CPF inválido", "error");
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