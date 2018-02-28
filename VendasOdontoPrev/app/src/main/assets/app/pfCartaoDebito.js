$("#contaDebito").keyup(function () {

    $("#continuarPfDebito").addClass('disabled');
    console.log("Validacao conta");
    if ($(this).val() == "" || $("#agenciaDebito").val() == "")
    {
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