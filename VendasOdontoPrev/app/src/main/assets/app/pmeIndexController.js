$(document).ready(function () {

});

function iniciarProposta(cdPlano) {

    var proposta = getRepository("proposta");

    plano = getRepository("plano");
    plano.cdPlano = cdPlano;

    proposta.planos = [];
    proposta.planos.push(plano);

    put("proposta", JSON.stringify(proposta));

    window.location.href = "venda_pme_dados_proposta.html";
}
