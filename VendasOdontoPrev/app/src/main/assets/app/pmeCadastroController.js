$(document).ready(function () {
    buscarPlanosSelecionados();
});

function buscarPlanosSelecionados() {

    var proposta = get("proposta");
    var planos = get("planos");

    $.each(proposta.planos, function (i, item) {
        var o = planos.filter(function (x) { return x.cdPlano == 1 });
        var plano = getComponent("plano");

        plano = plano.replace("{CDPLANO}", o.cdPlano);
        plano = plano.replace("{NOME}", o.cdPlano);
        plano = plano.replace("{DESC}", o.cdPlano);
        plano = plano.replace("{VALOR}", o.cdPlano);



    });    
}