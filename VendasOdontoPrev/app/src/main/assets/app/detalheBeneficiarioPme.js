$(document).ready(function () {

    popularCamposProposta();

    $(".clickDependente").click(function () {

        let cdVida = $(this).attr("data-cdvida");

        callTokenVendas(function (dataToken) {

            if (dataToken.status != undefined) {

                swal("Ops!", "Erro no carregamento do beneficiário, tente novamente.", "error");
                return;
            }

            callDetalheBeneficiario(function (dataDetalheBeneficiario) {


                if (dataDetalheBeneficiario.status != undefined) {

                    swal("Ops!", "Erro no carregamento do beneficiário, tente novamente.", "error");
                    return;
                }

                console.log(dataDetalheBeneficiario);

                $("#nomeDependente").html(dataDetalheBeneficiario.nome);
                $("#cpfDependente").html(dataDetalheBeneficiario.cpf == undefined ? "" : dataDetalheBeneficiario.cpf);
                $("#dataNascimentoDependente").html(dataDetalheBeneficiario.dataNascimento);
                $("#sexoDependente").html(dataDetalheBeneficiario.sexo == "f" ? "Feminino" : "Masculino");
                $("#nomeMaeDependente").html(dataDetalheBeneficiario.nomeMae);


            }, dataToken.access_token, cdVida); //TO DO: retirar cd vida fixo 5609 5605



        });

        $("#modalDependente").modal("show");

    });

});

function popularCamposProposta() {

    let detalheBeneficiario = get("detalheBeneficiario");

    if (detalheBeneficiario == undefined) return;

    $("#nomeTitular").html(detalheBeneficiario.nome);
    $("#sexoTitular").html(detalheBeneficiario.sexo == "f" ? "Feminino" : "Masculino");
    $("#dataNascimentoTitular").html(detalheBeneficiario.dataNascimento);
    $("#cpfTitular").html(detalheBeneficiario.cpf);
    $("#nomeMaeTitular").html(detalheBeneficiario.nomeMae);
    $("#cepTitular").html(detalheBeneficiario.endereco.cep);
    $("#planoTitular").html(detalheBeneficiario.nomeMae);

    if (detalheBeneficiario.qtdDependentes == 0) {

        $("#dependentes").html('<label class="labelDadosResumoStatus">Não há dependentes</label>');
    }

    $.each(detalheBeneficiario.dependentes, function (i, item) {

        var componente = getComponent("dependenteResumoProposta");
        componente = componente.replace("{NOMELABEL}", item.nome);
        componente = componente.replace("{CDVIDA}", item.cdVida);

        $("#dependentes").append(componente);
    });


}

function callDetalheBeneficiario(callback, token, cdVida) {

    $.ajax({
        async: true,
        url: "https://api-it3.odontoprev.com.br:8243/corretorservicos/1.0/beneficiario/" + cdVida,
        //url: "http://localhost:8090/beneficiario/" + cdVida,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });


}