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

$(function () {
    var regex = new RegExp('[^0-9\]', 'g');
    // repare a flag "g" de global, para substituir todas as ocorrências
    $('.numero').bind('input', function () {
        $(this).val($(this).val().replace(regex, ''));
    });
});

function validarData(data)
{
    var bits = data.split('/');

    var y = bits[2],
        m = bits[1],
        d = bits[0];

    var anoAtual = new Date().getFullYear();

    if (anoAtual < y || y < 1890) return false;

    // Assume not leap year by default (note zero index for Jan)
    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // If evenly divisible by 4 and not evenly divisible by 100,
    // or is evenly divisible by 400, then a leap year
    if ((!(y % 4) && y % 100) || !(y % 400)) {
        daysInMonth[1] = 29;
    }
    return !(/\D/.test(String(d))) && d > 0 && d <= daysInMonth[--m];
}


//function validarData() {
//    var currentDate = new Date().toLocaleDateString();
//
//    if (currentDate < $(".data").val()) {
//        console.log("Data maior");
//
//        $(".data").css({ "border-color": "red" });
//        $(".nascimento").css("color", "red");
//        $(".label-nascimento").css("color", "red");
//    }
//
//    //var date = $(".data").val().replace("/", "-").replace("/", "-");
//    //var date = new Date($(".data").val());
//
//    console.log($(".data").val());
//
//    console.log(currentDate === $(".data").val());
//
//
//
//    //if (currentDate < )
//    //{
//    //    console.log("Teste data");
//    //}
//
//
//    //console.log(inputTime);
//
//}

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

$(".data").blur(function () {

    if (validarData($(".data").val())) {

        $(this).css({ "border-color": "#3A94FB" });
        $(".nascimento").css("color", "#3A94FB");
        $(".label-nascimento").css("color", "#3A94FB");
        return;
    }

    $(".data").css({ "border-color": "red" });
    $(".nascimento").css("color", "red");
    $(".label-nascimento").css("color", "red");

    //var dataNascimento = parseDate($(".data").val().replace("/", "-").replace("/", "-"));
    //var currentDate = new Date().toLocaleDateString();
    //currentDate = new Date(currentDate.replace("/", "-").replace("/", "-"));
    //
    //
    //console.log(dataNascimento);
    //console.log(currentDate);
    //
    //if (dataNascimento < currentDate)
    //{
    //    console.log("Maior de idade");
    //}
})


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

function removerAcentos(newStringComAcento) {
    var string = newStringComAcento;
    var mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g,
        n: /\xF1/g
    };

    for (var letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string.replace(expressaoRegular, letra);
    }

    return string;
}

function sincronizarPessoa(callback, pessoa) {

    //var pessoa = JSON.parse(pessoaString);
    var forcaVenda = get("dadosUsuario");

    console.log(pessoa[0].planos[0].cdPlano);

    var cdPlano = pessoa[0].planos[0].cdPlano;

    var pdata = [];

    //var json = "{ \"cdForcaVenda\": \"" + forcaVenda.codigo + "\", \"cdPlano\": \"" + cdPlano + "\", \"titulares\": " + JSON.stringify(pessoa) + "}";

    var json = {
        "cdForcaVenda": forcaVenda.codigo,
        "cdPlano": 4,
        "titulares": [
            {
                "celular": pessoa[0].celular,
                "contatoEmpresa": pessoa[0].contatoEmpresa,
                "cpf": pessoa[0].cpf,
                "dadosBancarios": {
                    "agencia": pessoa[0].dadosBancarios.agencia,
                    "codigoBanco": pessoa[0].dadosBancarios.codigoBanco,
                    "conta": pessoa[0].dadosBancarios.conta,
                    "tipoConta": pessoa[0].dadosBancarios.tipoConta
                },
                "dependentes": [

                ],
                "email": pessoa[0].email,
                "endereco": {
                    "bairro": pessoa[0].endereco.bairro,
                    "cep": pessoa[0].endereco.cep,
                    "cidade": removerAcentos(pessoa[0].endereco.cidade),
                    "complemento": pessoa[0].endereco.complemento,
                    "logradouro": pessoa[0].endereco.logradouro,
                    "estado": pessoa[0].endereco.estado,
                    "numero": pessoa[0].endereco.numero
                },
                "dataNascimento": pessoa[0].dataNascimento,
                "nomeMae": pessoa[0].nomeMae,
                "nome": pessoa[0].nome,
                "sexo": pessoa[0].sexo,
                "status": pessoa[0].status,
                "titular": pessoa[0].titular
            }
        ]
    };

    json = JSON.stringify(json);

    swal({
        title: "Aguarde",
        text: 'Estamos enviando a sua proposta',
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

    $.ajax({
        async: true,
        url: "http://www.corretorvendaodonto.com.br:7001/portal-corretor-servico-0.0.1-SNAPSHOT/vendapf",
        method: "POST",
        data: json,
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        //data: "{ \r\n   \"cdForcaVenda\":\"" + forcaVenda.codigo + "\",\r\n   \"cdPlano\":\"" + 4 + "\",\r\n   \"titulares\":[ \r\n      { \r\n         \"celular\":\"" + pessoa[0].celular + "\",\r\n         \"contatoEmpresa\":" + pessoa[0].contatoEmpresa + ",\r\n         \"cpf\":\"" + pessoa[0].cpf + "\",\r\n         \"dadosBancarios\":{ \r\n            \"agencia\":\"" + pessoa[0].dadosBancarios.agencia + "\",\r\n            \"codigoBanco\":\"" + pessoa[0].dadosBancarios.codigoBanco + "\",\r\n            \"conta\":\"" + pessoa[0].dadosBancarios.conta + "\",\r\n            \"tipoConta\":\"" + pessoa[0].dadosBancarios.tipoConta + "\"\r\n         },\r\n         \"dependentes\":[ \r\n \r\n         ],\r\n         \"email\":\"" + pessoa[0].email + "\",\r\n         \"endereco\":{ \r\n            \"bairro\":\"" + pessoa[0].endereco.bairro + "\",\r\n            \"cep\":\"" + pessoa[0].endereco.cep + "\",\r\n            \"cidade\":\"" + pessoa[0].endereco.cidade + "\",\r\n            \"complemento\":\"" + pessoa[0].endereco.complemento + "\",\r\n            \"logradouro\":\"" + pessoa[0].endereco.logradouro + "\",\r\n            \"estado\":\"" + pessoa[0].endereco.estado + "\",\r\n            \"numero\":\"" + pessoa[0].endereco.numero + "\"\r\n         },\r\n         \"dataNascimento\":\"" + pessoa[0].dataNascimento + "\",\r\n         \"nomeMae\":\"" + pessoa[0].nomeMae + "\",\r\n         \"nome\":\"" + pessoa[0].nome + "\",\r\n         \"sexo\":\"" + pessoa[0].sexo +"\",\r\n         \"status\":\"PRONTA\",\r\n         \"titular\":true\r\n      }\r\n   ]\r\n}\r\n",

        processData: false,
        success: function (result) {

            swal.close();

            callback(result);
            
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
        error: function (resp) {
            swal.close();
            console.log(resp);
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