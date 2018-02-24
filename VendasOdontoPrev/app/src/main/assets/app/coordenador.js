var jsonName = "";
var pdata = "";
var compName = "";

$(document).ready(function () {
    setPlanos();
});


function setPlanos() {
    planos = [];

    plano = getRepository("plano");
    plano.cdPlano = 1;
    plano.nome = "Integral DOC LALE";
    plano.valor = "37";
    plano.centavo = "82";
    plano.desc = "Modalidade Livre Adesão";
    plano.css = "colorSlick3";
    planos.push(plano);

    plano = getRepository("plano");
    plano.cdPlano = 2;
    plano.nome = "Master LALE";
    plano.valor = "14";
    plano.centavo = "98";
    plano.desc = "Modalidade TODO";
    plano.css = "colorSlick2";

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

function put(localName, obj)
{
    localStorage.setItem(localName, obj);
}

function get(localName, obj) {
    var o = localStorage.getItem(localName);

    if (o == null)
        return null;

    return JSON.parse(o);
}