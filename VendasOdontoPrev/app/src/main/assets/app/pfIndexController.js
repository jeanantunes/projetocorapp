$(document).ready(function () {
    setIdPlano();
    console.log(screen.height);
    console.log($("#divImg").height());
});

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

    ////////////////////////////// Seta id dos planos no data id do botao

    ///////////////////////DENTAL BEM ESTAR ////////

    var plano = planos.filter(function (x) {if (x.nome == "DENTAL BEM-ESTAR MENSAL"){return x.nome;}});
    $("#bemEstarMensal").attr("data-id", plano[0].cdPlano);

    var plano = planos.filter(function (x) { if (x.nome == "DENTAL BEM-ESTAR ANUAL") { return x.nome; } });
    $("#bemEstarAnual").attr("data-id", plano[0].cdPlano);

    /////////////////////// DENTAL VIP ///////////////////

    var plano = planos.filter(function (x) { if (x.nome == "DENTAL VIP MENSAL") { return x.nome; } });
    $("#vipMensal").attr("data-id", plano[0].cdPlano);

    var plano = planos.filter(function (x) { if (x.nome == "DENTAL VIP ANUAL") { return x.nome; } });
    $("#vipAnual").attr("data-id", plano[0].cdPlano);

    /////////////////////// DENTAL ESTETICA //////////////////

    var plano = planos.filter(function (x) { if (x.nome == "DENTAL ESTETICA MENSAL") { return x.nome; } });
    $("#esteticaMensal").attr("data-id", plano[0].cdPlano);

    var plano = planos.filter(function (x) { if (x.nome == "DENTAL ESTETICA ANUAL") { return x.nome; } });
    $("#esteticaAnual").attr("data-id", plano[0].cdPlano);


    /////////////////////// DENTE DE LEITE //////////////////

    //var plano = planos.filter(function (x) { if (x.nome == "DENTE DE LEITE MENSAL") { return x.nome; } });
    //$("#denteDeLeiteMensal").attr("data-id", plano[0].cdPlano);
    //
    //var plano = planos.filter(function (x) { if (x.nome == "DENTE DE LEITE ANUAL") { return x.nome; } });
    //$("#denteDeLeiteAnual").attr("data-id", plano[0].cdPlano);

    ///////////////////////// DENTAL ORTO ////////////////////////

    var plano = planos.filter(function (x) { if (x.nome == "DENTAL ORTO MENSAL") { return x.nome; } });
    $("#ortoMensal").attr("data-id", plano[0].cdPlano);

    var plano = planos.filter(function (x) { if (x.nome == "DENTAL ORTO ANUAL") { return x.nome; } });
    $("#ortoAnual").attr("data-id", plano[0].cdPlano);

    
        var plano = planos.filter(function (x) { if (x.nome == "DENTAL ORTO ANUAL S/CARENCIA") { return x.nome; } });
        $("#ortoAnualSCarencia").attr("data-id", plano[0].cdPlano);
    
        var plano = planos.filter(function (x) { if (x.nome == "DENTAL ESTETICA ANUAL S/CARENCIA") { return x.nome; } });
        $("#esteticaAnualSCarencia").attr("data-id", plano[0].cdPlano);
    
        var plano = planos.filter(function (x) { if (x.nome == "DENTAL VIP ANUAL S/CARENCIA") { return x.nome; } });
        $("#vipAnualSCarencia").attr("data-id", plano[0].cdPlano);
    
        var plano = planos.filter(function (x) { if (x.nome == "DENTAL BEM-ESTAR ANUAL S/CARENCIA") { return x.nome; } });
        $("#bemEstarAnualSCarencia").attr("data-id", plano[0].cdPlano);
    

    return;
}

function iniciarProposta(cdPlano) {

    var proposta = get("propostaPf");

    if (proposta == null)
        proposta = getRepository("propostaPf");

    plano = getRepository("plano");
    plano.cdPlano = cdPlano;

    proposta.planos = [];
    proposta.planos.push(plano);

    put("propostaPf", JSON.stringify(proposta));

    window.location.href = "venda_pf_dados_proposta.html";
    
}
