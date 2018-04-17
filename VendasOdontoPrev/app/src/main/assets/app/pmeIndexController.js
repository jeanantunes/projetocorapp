$(document).ready(function () {
    setIdPlano();
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