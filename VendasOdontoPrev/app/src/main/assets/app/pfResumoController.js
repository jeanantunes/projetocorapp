var preenchidos = false;

$(document).ready(function () {
    buscarPlanosSelecionados();
});

function buscarPlanosSelecionados() {

    var proposta = get("propostaPf");
    var planos = get("planos");

    $.each(proposta.planos, function (i, item) {
        var o = planos.filter(function (x) { return x.cdPlano == item.cdPlano });
        var plano = getComponent("planoFixo");

        plano = plano.replace("{TITULAR}", proposta.nome);
        plano = plano.replace("{CDPLANO}", o[0].cdPlano);
        plano = plano.replace("{CDPLANO-BT}", o[0].cdPlano);
        plano = plano.replace("{NOME}", o[0].nome);
        plano = plano.replace("{DESC}", o[0].desc);
        plano = plano.replace("{VALOR}", o[0].valor);
        plano = plano.replace("{CENTAVO}", o[0].centavo);
        plano = plano.replace("{CSS}", o[0].css);
        plano = plano.replace("{CSSVALOR}", o[0].css);

        $("#planos").append(plano);
    });
}

$("#pagarComBoleto").click(function () {

    var pessoa = get("pessoas");
    console.log(pessoa);

    sincronizarPessoa(function (dataBoleto) {

        console.log(dataBoleto);
        window.location = "compra_pf_boleto.html";

    }, pessoa);

});