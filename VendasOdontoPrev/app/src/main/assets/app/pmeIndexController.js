$(document).ready(function () {

});

function iniciarProposta(cdPlano) {

    var proposta = JSON.parse(getRepository("proposta"));

    plano = JSON.parse(getRepository("plano"));
    plano.cdPlano = cdPlano;

    proposta.planos.push(plano);

    put("proposta", JSON.stringify(proposta));

    window.location.href = "venda_pme_dados_proposta.html";
}