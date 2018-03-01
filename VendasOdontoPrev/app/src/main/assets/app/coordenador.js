var token = "";
var jsonName = "";
var pdata = "";
var compName = "";

$(document).ready(function () {
    setPlanos();
    carregarDadosUsuario();

    $("#logout").click(function () {
        logout.removerRegistroLogin();
    });
});

$(function () {
    var regex = new RegExp('[^ a-zA-ZÁÉÍÓÚÀÈÌÒÙàèìòùáéíóúâêîôûãõ\b]', 'g');
    // repare a flag "g" de global, para substituir todas as ocorrências
    $('.nome').bind('input', function () {
        $(this).val($(this).val().replace(regex, ''));
    });
});

//$("#data").blur(function () {
//
//    var id = document.getElementById('data');
//
//    var RegExPattern = /^((((0?[1-9]|[12]\d|3[01])[\.\-\/](0?[13578]|1[02])      [\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|[12]\d|30)[\.\-\/](0?[13456789]|1[012])[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|((0?[1-9]|1\d|2[0-8])[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?\d{2}))|(29[\.\-\/]0?2[\.\-\/]((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00)))|(((0[1-9]|[12]\d|3[01])(0[13578]|1[02])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|[12]\d|30)(0[13456789]|1[012])((1[6-9]|[2-9]\d)?\d{2}))|((0[1-9]|1\d|2[0-8])02((1[6-9]|[2-9]\d)?\d{2}))|(2902((1[6-9]|[2-9]\d)?(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00)|00))))$/;
//
//    if (!((id.value.match(RegExPattern)) && (id.value != ''))) {
//        console.log("data invalida");
//        id.focus();
//    }
//    else console.log("data valida");
//
//});

function setPlanos() {
    planos = [];

    plano = getRepository("plano");
    plano.cdPlano = 5936;
    plano.nome = "Integral DOC LALE";
    plano.valor = "37";
    plano.centavo = "82";
    plano.desc = "Modalidade Livre Adesão";
    plano.css = "colorSlick3";
    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6198;
    plano.nome = "Master LALE";
    plano.valor = "119";
    plano.centavo = "48";
    plano.desc = "Modalidade Livre Adesão";
    plano.css = "colorSlick2";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6122;
    plano.nome = "DENTAL BEM-ESTAR";
    plano.valor = "45";
    plano.centavo = "60";
    plano.desc = "Mensal";
    plano.css = "colorSlick3";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6123;
    plano.nome = "DENTAL BEM-ESTAR";
    plano.valor = "456";
    plano.centavo = "00";
    plano.desc = "Anual";
    plano.css = "colorSlick3";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 5;
    plano.nome = "DENTAL BEM-ESTAR";
    plano.valor = "547";
    plano.centavo = "20";
    plano.desc = "Anual";
    plano.css = "colorSlick3";

    planos.push(plano);

    //plano = getRepository("plano");
    //plano.cdPlano = 6;
    //plano.nome = "DENTE DE LEITE DE 0 A 7 ANOS";
    //plano.valor = "14";
    //plano.centavo = "98";
    //plano.desc = "Mensal";
    //plano.css = "colorSlick2";
    //
    //planos.push(plano);
    //
    //plano = getRepository("plano");
    //plano.cdPlano = 7;
    //plano.nome = "DENTE DE LEITE DE 0 A 7 ANOS";
    //plano.valor = "149";
    //plano.centavo = "80";
    //plano.desc = "Anual";
    //plano.css = "colorSlick2";
    //
    //planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6114;
    plano.nome = "DENTAL ESTÉTICA";
    plano.valor = "115";
    plano.centavo = "00";
    plano.desc = "Mensal";
    plano.css = "colorSlick3";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6115;
    plano.nome = "DENTAL ESTÉTICA";
    plano.valor = "1150";
    plano.centavo = "00";
    plano.desc = "Anual";
    plano.css = "colorSlick3";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 10;
    plano.nome = "DENTAL ESTÉTICA";
    plano.valor = "1380";
    plano.centavo = "00";
    plano.desc = "Anual";
    plano.css = "colorSlick3";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6120;
    plano.nome = "DENTAL ORTO";
    plano.valor = "147";
    plano.centavo = "00";
    plano.desc = "Mensal";
    plano.css = "colorSlick4";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6121;
    plano.nome = "DENTAL ORTO";
    plano.valor = "1470";
    plano.centavo = "00";
    plano.desc = "Anual";
    plano.css = "colorSlick4";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 13;
    plano.nome = "DENTAL ORTO";
    plano.valor = "1764";
    plano.centavo = "00";
    plano.desc = "Anual";
    plano.css = "colorSlick4";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6116;
    plano.nome = "DENTAL VIP";
    plano.valor = "220";
    plano.centavo = "35";
    plano.desc = "Mensal";
    plano.css = "colorSlick5";

    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 6117;
    plano.nome = "DENTAL VIP";
    plano.valor = "2203";
    plano.centavo = "50";
    plano.desc = "Anual";
    plano.css = "colorSlick5";

    planos.push(plano);

    put("planos", JSON.stringify(planos));
}

function getComponent(pCompName) {
    compName = pCompName;

    $.ajax({
        url: "componente/" + compName + ".html",
        type: "get",
        async: false,
        success: function (result) {
            pdata = result;
        },
        error: function () {

        }
    });

    return pdata;
}

function getRepository(pJsonName) {

    jsonName = pJsonName;

    $.ajax({
        url: "repositorio/" + jsonName + ".json",
        type: "get",
        async: false,
        success: function (result) {
            pdata = result;
        },
        error: function () {

        }
    });

    return JSON.parse(pdata);
}

function put(localName, obj) {
    localStorage.setItem(localName, obj);
}

function get(localName, obj) {
    var o = localStorage.getItem(localName);

    if (o == null)
        return null;

    return JSON.parse(o);
}

function carregarDadosUsuario() {
    var carregarDados = get("dadosUsuario");

    if (carregarDados == null)
        return;

    $("#nomeCorretorMenu").html(carregarDados.nome);
    $("#nomeCorretoraMenu").html(carregarDados.nomeEmpresa);
    $("#nomeCorretor").html(carregarDados.nome);
    $("#nomeCorretora").html(carregarDados.nomeEmpresa);
    $("#emailCorretor").val(carregarDados.email);
    $("#numeroCorretor").val(carregarDados.telefone);
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function atualizarPessoas(proposta) {
    var pessoas = get("pessoas");
    var propostas = pessoas.filter(function (x) { return x.cpf != proposta.cpf });
    pessoas = []; //limpar

    $.each(propostas, function (i, item) {
        pessoas.push(item);
    });

    pessoas.push(proposta);
    put("pessoas", JSON.stringify(pessoas));
    put("propostaPf", JSON.stringify(proposta));
}

function atualizarEmpresas(proposta) {
    var empresas = get("empresas");
    var propostas = empresas.filter(function (x) { return x.cnpj != proposta.cnpj });
    empresas = []; //limpar

    $.each(propostas, function (i, item) {
        empresas.push(item);
    });

    empresas.push(proposta);
    put("empresas", JSON.stringify(empresas));
}


function sincronizar() {

    //$.ajax({
    //    async: false,
    //    url: "https://api.odontoprev.com.br:8243/token/",
    //    method: "POST",
    //    headers: {
    //        "Authorization": "Basic Y3hHZXBoTzFkcERDd3U0VHlfRExWTWxXQ0R3YTp0WlJtSUN1eUJWajJZRVczRjdaNXdWM2E0YVlh",
    //        "Cache-Control": "no-cache",
    //        "Content-Type": "application/x-www-form-urlencoded"
    //    },
    //    data: {
    //        "grant_type": "client_credentials"
    //    },
    //    success: function (resp) {
    //        token = resp;
    //    },
    //    error: function (xhr) {
    //        //swal("Ops!", "Erro na conexão, tente mais tarde", "error");
    //    }
    //});

    var empresas = get("empresas");
    var pessoas = get("pessoas");
    var beneficiarios = get("beneficiarios");

    if (empresas != null) {
        $.each(empresas, function (i, item) {
            if (item.status == "PRONTA") {
                var o = empresas.filter(function (x) { return x.cnpj == item.cnpj });
                var b = beneficiarios.filter(function (x) { return x.cnpj == item.cnpj });
                sincronizarEmpresa(o, b);
            }
        });
    }

    if (pessoas != null) {
        $.each(pessoas, function (i, item) {
            if (item.status == "PRONTA") {
                var o = pessoas.filter(function (x) { return x.cpf == item.cpf });
                sincronizarPessoa(o);
            }
        });
    }

    swal({
        title: "Aguarde",
        text: 'Estamos enviando as suas propostas',
        content: "input",
        imageUrl: "img/load.gif",
        showCancelButton: false,
        showConfirmButton: false,
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    });

    setTimeout(function () {
        window.location.href = "logado.html";
    }, 4000);
    
}

function sincronizarPessoa(pessoa) {

    var forcaVenda = get("dadosUsuario");
    var cdPlano = pessoa[0].planos[0].cdPlano;

    var pdata = [];
    var json = "{ \"cdForcaVenda\": \"" + forcaVenda.codigo + "\", \"cdPlano\": \"" + cdPlano + "\", \"titulares\": " + JSON.stringify(pessoa) + "}";

    $.ajax({
        url: "http://www.corretorvendaodonto.com.br:7001/portal-corretor-servico-0.0.1-SNAPSHOT/vendapf",
        type: "POST",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.id == 0) {
                pessoa[0].status = "CRITICADA";
                atualizarPessoas(pessoa[0]);
            }
            else {
                var pessoas = get("pessoas");
                var todosExcetoExclusao = pessoas.filter(function (x) { return x.cpf == pessoa[0].cpf });

                put("pessoas", JSON.stringify(todosExcetoExclusao
                ));
            }
        },
        error: function () {

        }
    });
}

function sincronizarEmpresa(proposta, beneficiarios) {

    var pdata = [];
    var json = "{ \"empresas\": " + JSON.stringify(proposta) + ", \"titulares\":" + JSON.stringify(beneficiarios) + "}";

    $.ajax({
        url: "http://www.corretorvendaodonto.com.br:7001/portal-corretor-servico-0.0.1-SNAPSHOT/vendapme",
        type: "POST",
        data: json,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.id == 0) {
                proposta[0].status = "CRITICADA";
                atualizarEmpresas(proposta[0]);
            }
            else {
                var empresas = get("empresas");
                var todosExcetoExclusao = empresas.filter(function (x) { return x.cnpj != proposta[0].cnpj });

                put("empresas", JSON.stringify(todosExcetoExclusao));
            }
        },
        error: function () {

        }
    });
}

function isValidDate(date) {
    var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec(date);
    if (matches == null) return false;
    var d = matches[2];
    var m = matches[1] - 1;
    var y = matches[3];
    var composedDate = new Date(y, m, d);
    return composedDate.getDate() == d &&
        composedDate.getMonth() == m &&
        composedDate.getFullYear() == y;
}