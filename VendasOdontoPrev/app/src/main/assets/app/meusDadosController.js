$(document).ready(function () {
    $('.celular').mask('(00) 00000-0000');
});

$("#EditDados").click(function () {

    $("#divEditarEmailSuccess").addClass('hide');
    $("#divEditarNumeroSuccess").addClass('hide');

    $("#salvarEditDados").removeClass('hide');
    $("#emailCorretorEditar").val($("#emailCorretor").val());
    $("#numeroCorretorEditar").val($("#numeroCorretor").val());

    $("#divEditarEmail").removeClass('hide');
    $("#divEditarNumero").removeClass('hide');
    $("#EditDados").addClass('hide');
    $("#salvarEditDados").removeClass('disabled');

});

//$("#emailCorretorEditar").keyup(function () {
//
//    if ($("#emailCorretorEditar").val() != $("#emailCorretor").val() || $("#numeroCorretorEditar").val().replace(/\D/g, '') != $("#numeroCorretor").val().replace(/\D/g, ''))
//    {
//        $("#salvarEditDados").removeClass('disabled');
//        return;
//    }
//
//    $("#salvarEditDados").addClass('disabled');
//
//});
//
//$("#numeroCorretorEditar").keyup(function () {
//
//    if ($("#emailCorretorEditar").val() != $("#emailCorretor").val() || $("#numeroCorretorEditar").val().replace(/\D/g, '') != $("#numeroCorretor").val().replace(/\D/g, '')) {
//        $("#salvarEditDados").removeClass('disabled');
//        return;
//    }
//
//    $("#salvarEditDados").addClass('disabled');
//
//});

$("#").blur(function () {




});

$("#salvarEditDados").click(function () {





});