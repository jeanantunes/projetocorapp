$(document).ready(function () {
    carregarLista();
});

function carregarLista() {

    var proposta = get("proposta");

    $("#razaoSocial").html(proposta.razaoSocial);
    $("#cnpjEmpresa").html(proposta.cnpj);

}

function salvarBenef() {
    if ($("#nome-beneficiario").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        return;
    }

    if ($("#radio-1").is(":checked") == false && $("#radio-2").is(":checked") == false) {
        swal("Ops!", "Selecione o Sexo", "error");
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a Data de Nascimento", "error");
        return;
    }

    if ($(".cpf").val() == "") {
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha o Nome da Mãe", "error");
        return;
    }

    if ($(".cep").val() == "") {
        swal("Ops!", "Preencha o CEP", "error");
        return;
    }

    var proposta = get("proposta");
    var benef = getRepository("beneficiario");

    benef.nome = $("#nome-beneficiario").val();
    benef.nomeMae = $("#nome-beneficiario").val();

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
            window.history.go(-1);
        });    
}