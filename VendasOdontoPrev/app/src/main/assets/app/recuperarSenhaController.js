$(document).ready(function () {

});

$("#continuarRecuperacaoDeSenha").click(function () {

    if (!TestaCPF($("#cpf").val())) {

        swal("Ops!", "CPF inválido", "error");
        return;
    }

    $("#loadingRecuperacaoSenha").addClass('hide');
    $("#senhaEnviada").removeClass('hide');

});