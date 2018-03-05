﻿var preenchidos = false;

$(document).ready(function () {
    carregarLista();
});

function carregarLista() {

    var pessoas = get("pessoas");
    var empresas = get("empresas");

    var qtdPessoas = 0;
    var qtdEmpresas = 0;

    if (pessoas != null) {
        qtdPessoas = pessoas.length;
    }

    if (empresas != null) {
        qtdEmpresas = empresas.length;
    }

    $("#totalClientes").html(qtdPessoas);
    $("#totalEmpresas").html(qtdEmpresas);
    $("#total").html(qtdEmpresas + qtdPessoas);

    $.each(pessoas, function (i, item) {
        var itemLista = getComponent("itemLista");

        var status = "";
        var css = "";
        var acao = "";
        var link = "";

        if (item.status == "DIGITANDO") {
            status = "Proposta incompleta";
            css = "colorCirc1";
            acao = "ver detalhes";
            link = "venda_pf_editar.html?cpf=" + item.cpf;
        } else if (item.status == "PRONTA") {
            status = "Aguardando sincronismo";
            css = "colorCirc4";
            acao = "sincronizar";
            link = "logado.html";
        } else if (item.status == "CRITICADA") {
            status = "Pendente finalizar cadastro";
            css = "colorCirc3";
            acao = "ver detalhes";
            link = "venda_pf_editar.html?cpf=" + item.cpf;
        }

        itemLista = itemLista.replace("{NOME}", item.nome);
        itemLista = itemLista.replace("{STATUS}", status);
        itemLista = itemLista.replace("{CSS}", css);
        itemLista = itemLista.replace("{ACAO}", acao);
        itemLista = itemLista.replace("{LINK}", link);

        $("#listaPessoas").append(itemLista);
    });

    $.each(empresas, function (i, item) {
        var itemLista = getComponent("itemLista");

        var status = "";
        var css = "";
        var acao = "";
        var link = "";

        if (item.status == "DIGITANDO") {
            status = "Aguardando aprovação";
            css = "colorCirc1";
            acao = "ver detalhes";
            link = "venda_pme_editar.html?cnpj=" + item.cnpj;
        } else if (item.status == "PRONTA") {
            status = "Aguardando sincronismo";
            css = "colorCirc4";
            acao = "sincronizar";
            link = "logado.html";
        } else if (item.status == "CRITICADA") {
            status = "Pendente finalizar cadastro";
            css = "colorCirc3";
            acao = "ver detalhes";
            link = "venda_pme_editar.html?cnpj=" + item.cnpj;
        }

        itemLista = itemLista.replace("{NOME}", (item.razaoSocial == undefined || item.razaoSocial == "" ? "Falha: Nome nulo na Serasa" : item.razaoSocial));
        itemLista = itemLista.replace("{STATUS}", status);
        itemLista = itemLista.replace("{CSS}", css);
        itemLista = itemLista.replace("{ACAO}", acao);
        itemLista = itemLista.replace("{LINK}", link);

        $("#listaEmpresas").append(itemLista);
    });
}