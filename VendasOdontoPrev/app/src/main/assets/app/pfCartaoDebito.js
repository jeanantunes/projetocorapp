$(document).ready(function () {
    $(".bancos").change(function () {
        if ($(this).val() == "341") {
            swal("Atenção!", "Lembre o seu cliente de que o Itaú exige liberação para o débito em conta.", "info");
        }
    });
});

$("#contaDebito").keyup(function () {

    $("#continuarPfDebito").addClass('disabled');
    console.log("Validacao conta");
    if ($(this).val() == "" || $("#agenciaDebito").val() == "") {
        return;
    }

    $("#continuarPfDebito").removeClass('disabled');
});

$(function () {
    var regex = new RegExp('[^0-9]', 'g');
    // repare a flag "g" de global, para substituir todas as ocorrências
    $('.agencia').bind('input', function () {
        $(this).val($(this).val().replace(regex, ''));
    });
});

$(function () {
    var regex = new RegExp('[^a-zA-Z0-9]', 'g');
    // repare a flag "g" de global, para substituir todas as ocorrências
    $('.conta-corrente').bind('input', function () {
        $(this).val($(this).val().replace(regex, ''));
    });
});

$("#agenciaDebito").keyup(function () {

    $("#continuarPfDebito").addClass('disabled');
    console.log("Validacao agencia");
    if ($(this).val() == "" || $("#contaDebito").val() == "") {

        return;
    }

    $("#continuarPfDebito").removeClass('disabled');
});

function cadastrarConta() {

    if ($(".bancos").val() == "Selecione...") {
        swal("Ops!", "Selecione o banco", "error");
        return;
    }

    if ($(".agencia").val() == "") {
        swal("Ops!", "Preencha a agencia", "error");
        return;
    }

    if ($(".conta-corrente").val() == "") {
        swal("Ops!", "Preencha a conta corrente", "error");
        return;
    }

    var proposta = get("propostaPf");
    proposta.dadosBancarios.codigoBanco = $(".bancos").val();
    proposta.dadosBancarios.agencia = $("#agenciaDebito").val();
    proposta.dadosBancarios.conta = $("#contaDebito").val();
    proposta.dadosBancarios.tipoConta = "CC";
    proposta.status = "PRONTA";
    atualizarPessoas(proposta);
    put("propostaPf", JSON.stringify(proposta));
    enviarPropostaPf();
}