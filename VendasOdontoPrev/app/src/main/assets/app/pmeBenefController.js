var problema = true;

$(document).ready(function () {
    carregarLista();
    carregarBenef();

    $(".dependentes").change(function () {
        adicionarBenefMemoria();
        window.location.href = "venda_pme_dependentes.html";

        put("numeroDependentes", $(".dependentes").val());
    });
});

function carregarLista() {

    var proposta = get("proposta");

    $("#razaoSocial").html(proposta.razaoSocial);
    $("#cnpjEmpresa").html(proposta.cnpj);

}

function salvarBenef() {
   
    adicionarBenefMemoria();

    if (problema)
        return;

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

function carregarBenef() {
    var benef = get("beneficiario");

    if (benef == null)
    {
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

    if ($(".cpf").val() == "") {
        swal("Ops!", "Preencha o CPF", "error");
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

    var benef = getRepository("beneficiario");
    var benefMemoria = get("beneficiario");

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

    var beneficiarios = get("beneficiarios");

    if (beneficiarios == null) {
        beneficiarios = [];
    }

    beneficiarios.push(benef);

    put("beneficiarios", JSON.stringify(beneficiarios));

    return benef;
}