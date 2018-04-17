$(document).ready(function () {
    setIdPlano();
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

function setIdPlano() {

    var planos = get("CodPlanos");

    $.ajax({
        url: "config/connection.json",
        type: "get",
        async: false,
        success: function (result) {
            conexao = JSON.parse(result);
        },
        error: function () {

        }
    });

    var plano = planos.filter(function (x) { if (x.nome == "INTEGRAL DOC LE") { return x.nome; } });
    $("#btnIntegral").attr("data-id", plano[0].cdPlano);


    var plano = planos.filter(function (x) { if (x.nome == "MASTER LE") { return x.nome; } });
    $("#btnMaster").attr("data-id", plano[0].cdPlano);
}