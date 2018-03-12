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

        var valorPlanoInt = parseInt(o[0].valor);
        var valorPlanoFloat = parseFloat(o[0].centavo);
        //var valorPlano = valorPlanoInt + valorPlanoFloat;
        var totalBeneficiarios = 1 + proposta.dependentes.length;

        var valorReal = valorPlanoInt.toString() + "." + valorPlanoFloat;

        valorReal = parseFloat(valorReal);

        var valorTotal = parseFloat(valorReal) * totalBeneficiarios;

        console.log();

        if ((valorTotal % 2) == 0 || (valorTotal % 2) == 1) {
            var valorReal = valorTotal;
            var valorCent = "00";
        } else
        {
            var valorString = valorTotal.toString();
            var position = valorString.indexOf(".");
            var tamanhoString = valorTotal.toString().length;
            var valorReal = valorString.substring(0, position);
            var valorCent = valorString.substring(position + 1, position + 3);

            if (valorCent.toString().length == 1) valorCent = parseFloat(valorCent.toString() + "0");
        }

        plano = plano.replace("{TITULAR}", proposta.nome.split(' ')[0] + " " + proposta.nome.split(' ')[proposta.nome.split(' ').length - 1]);
        plano = plano.replace("{CDPLANO}", o[0].cdPlano);
        plano = plano.replace("{CDPLANO-BT}", o[0].cdPlano);
        plano = plano.replace("{NOME}", o[0].nome);
        plano = plano.replace("{DESC}", o[0].desc);
        plano = plano.replace("{VALOR}", valorReal);//o[0].valorRealDiv);
        plano = plano.replace("{CENTAVO}", valorCent);//o[0].valorFloaDiv);
        plano = plano.replace("{CSS}", o[0].css);
        plano = plano.replace("{CSSVALOR}", o[0].css);
        plano = plano.replace("{DEPENDENTES}", proposta.dependentes.length);

        $("#planos").append(plano);
    });
}

function pagarComBoleto()
{
    window.location = "compra_pf_boleto.html";
}