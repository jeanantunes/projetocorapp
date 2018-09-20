emRequisicao = false;

$(document).ready(function () {
    $(".bancos").change(function () {
        if ($(this).val() == "341") {
            swal("Atenção!", "Lembre o seu cliente de que o Itaú exige liberação para o débito em conta.", "info");
        }
    });

    $("#contaDebito").keyup(function () {

        $("#continuarPfDebito").prop('disabled', true);

        if ($(this).val() == "" || $("#agenciaDebito").val() == "") {
            return;
        }

        $("#continuarPfDebito").prop('disabled', false);
    });

    $(function () {
        var regex = new RegExp('[^0-9]', 'g');
        // repare a flag "g" de global, para substituir todas as ocorrências
        $('.agencia').bind('input', function () {
            $(this).val($(this).val().replace(regex, ''));
        });
    });

    $(function () {
        var regex = new RegExp('[^a-zA-Z0-9]', 'g');
        // repare a flag "g" de global, para substituir todas as ocorrências
        $('.conta-corrente').bind('input', function () {
            $(this).val($(this).val().replace(regex, ''));
        });
    });

    $("#agenciaDebito").keyup(function () {

        $("#continuarPfDebito").prop('disabled', true);
        console.log("Validacao agencia");
        if ($(this).val() == "" || $("#contaDebito").val() == "") {

            return;
        }

        $("#continuarPfDebito").prop('disabled', false);
    });


    $("#continuarPfDebito").click(function () {

        if (emRequisicao) return;

        emRequisicao = true;

        $("#continuarPfDebito").prop('disabled', true);

        cadastrarConta();

    });

});

function cadastrarConta() {

    if ($(".bancos").val() == "Selecione...") {
        swal("Ops!", "Selecione o banco", "error");
        emRequisicao = false;
        $("#continuarPfDebito").prop('disabled', true);
        return;
    }

    if ($(".agencia").val() == "") {
        swal("Ops!", "Preencha a agência", "error");
        emRequisicao = false;
        $("#continuarPfDebito").prop('disabled', true);
        return;
    }

    if ($(".conta-corrente").val() == "") {
        swal("Ops!", "Preencha a conta corrente", "error");
        emRequisicao = false;
        $("#continuarPfDebito").prop('disabled', true);
        return;
    }

    var proposta = get("propostaPf");
    var cdBanco = $(".bancos").val();
    var agencia = $("#agenciaDebito").val();

    while (agencia.length < 4) {
        agencia = "0" + agencia;
    }

    proposta.dadosBancarios.codigoBanco = cdBanco;
    proposta.dadosBancarios.agencia = agencia;
    proposta.dadosBancarios.conta = $("#contaDebito").val();
    proposta.dadosBancarios.tipoConta = "CC";
    proposta.status = "PRONTA";
    atualizarPessoas(proposta);
    put("propostaPf", JSON.stringify(proposta));

    validarForcaVenda(function (retornoForcaVenda) {

        if (retornoForcaVenda != 403) {

            enviarPropostaPf();

        } else {

            var fraseCorretoraBloqueada = getRepository("fraseCorretoraBloqueada");

            swal(fraseCorretoraBloqueada.title, fraseCorretoraBloqueada.descricao, fraseCorretoraBloqueada.tipo);
            $("#continuarPfDebito").prop('disabled', false);
            emRequisicao = false;
            return;
        }


    });

}