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

$("#agenciaDebito").keyup(function () {

    $("#continuarPfDebito").addClass('disabled');
    console.log("Validacao agencia");
    if ($(this).val() == "" || $("#contaDebito").val() == "") {

        return;
    }

    $("#continuarPfDebito").removeClass('disabled');
});

function cadastrarConta() {
    var proposta = get("propostaPf");
    proposta.dadosBancarios.codigoBanco = $(".bancos").val();
    proposta.dadosBancarios.agencia = $("#agenciaDebito").val();
    proposta.dadosBancarios.conta = $("#contaDebito").val();

    atualizarPessoas(proposta);

    window.location.href = "compra_pf_sucesso.html";
}