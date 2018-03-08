$(document).ready(function () {

});

$("#EditDados").click(function () {

    $("#salvarEditDados").removeClass('disabled');
    $("#divEditarEmailSuccess").addClass('hide');
    $("#divEditarNumeroSuccess").addClass('hide');

    $("#salvarEditDados").removeClass('hide');
    $("#emailCorretorEditar").val($("#emailCorretor").val());
    $("#numeroCorretorEditar").val($("#numeroCorretor").val());

    $("#divEditarEmail").removeClass('hide');
    $("#divEditarNumero").removeClass('hide');
    $("#EditDados").addClass('hide');

});

$("#salvarEditDados").click(function () {





});