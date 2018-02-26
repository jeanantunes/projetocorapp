var preenchidos = false;

$(document).ready(function () {
    var proposta = get("proposta");
    var empresas = get("empresas");
    proposta.status = "PRONTA";
    atualizarEmpresas(proposta);

    localStorage.removeItem("proposta");
});
