var preenchidos = false;

$(document).ready(function () {
    var proposta = get("proposta");
    var empresas = get("empresas");


    console.log(proposta);

    proposta.status = "PRONTA";

    atualizarEmpresas(proposta);

    localStorage.removeItem("proposta");

    sincronizar();
});


