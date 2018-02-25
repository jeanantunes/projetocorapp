$(document).ready(function () {

});

function adicionarPlano(cdPlano) {

    var proposta = get("proposta");

    if (proposta == null)
    {
        proposta = getRepository("proposta");
    }

    plano = getRepository("plano");
    plano.cdPlano = cdPlano;

    var o = proposta.planos.filter(function (x) { return x.cdPlano == cdPlano });
    if (o.length >=1) {
        window.location.href = "venda_pme_dados_proposta.html";
        return;
    }

    proposta.planos.push(plano);

    put("proposta", JSON.stringify(proposta));

    window.location.href = "venda_pme_dados_proposta.html";
}