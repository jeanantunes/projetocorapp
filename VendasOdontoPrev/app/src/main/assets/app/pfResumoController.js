var preenchidos = false;
emRequisicao = false;

$(document).ready(function () {

    buscarPlanosSelecionados();

    $("#pagarComBoleto").click(function () {

        if (emRequisicao) return;

        emRequisicao = true;

        if ($(this).is(":disabled")) return;

        $('#irParaDebito').prop('disabled', true);
        $('#pagarComBoleto').prop('disabled', true);

        pagarComBoleto();

    });

    $("#irParaDebito").click(function () {

        window.location.href = "cartao_pf_debito.html";

    });

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
        plano = plano.replace("{NOME}", o[0].nome.replace("Principal", ""));
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
    let atualizarPropostaParaPronta = get("propostaPf");

    atualizarPropostaParaPronta.dadosBancarios.agencia = "";
    atualizarPropostaParaPronta.dadosBancarios.codigoBanco = "";
    atualizarPropostaParaPronta.dadosBancarios.conta = "";
    atualizarPropostaParaPronta.dadosBancarios.tipoConta = "";
    atualizarPropostaParaPronta.status = "PRONTA";
    atualizarPropostasPfById(atualizarPropostaParaPronta);

    validarForcaVenda(function (retornoForcaVenda) {

        if (retornoForcaVenda != 403) {

            enviarPropostaPf();

        } else {

            var fraseCorretoraBloqueada = getRepository("fraseCorretoraBloqueada");

            swal(fraseCorretoraBloqueada.title, fraseCorretoraBloqueada.descricao, fraseCorretoraBloqueada.tipo);
            $('#irParaDebito').prop('disabled', false);
            $('#pagarComBoleto').prop('disabled', false);
            emRequisicao = false;
            return;
        }


    });

    
}