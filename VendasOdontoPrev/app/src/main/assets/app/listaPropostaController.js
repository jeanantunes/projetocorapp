var preenchidos = false;

$(document).ready(function () {

    if (!navigator.onLine) {
        carregarListaOffline();
        return;
    }

    carregarListaOnline();

});

function callDashBoardPF(callback, Token) {
    var statusTodasPropostas = 0;
    var dadosForca = get("dadosUsuario");

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/dashboardPropostaPF/" + statusTodasPropostas + "/" + dadosForca.cpf,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Token,
            "Cache-Control": "no-cache",
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });
}

function callDashBoardPME(callback, Token) {
    var statusTodasPropostas = 0;
    var dadosForca = get("dadosUsuario");

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/dashboardPropostaPME/" + statusTodasPropostas + "/" + dadosForca.cpf,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Token,
            "Cache-Control": "no-cache",
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });
}

function carregarListaOffline() {

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
            acaoseta = "";
        } else if (item.status == "PRONTA") {
            status = "Aguardando sincronismo";
            css = "colorCirc4";
            acao = "sincronizar";
            link = "logado.html";
            acaoseta = "";
        } else if (item.status == "CRITICADA") {
            status = "Criticada";
            css = "colorCirc3";
            acao = "ver detalhes";
            link = "venda_pf_editar.html?cpf=" + item.cpf;
            acaoseta = "";
        } else if (item.status == "ENVIADA" || item.status == "Aprovado") {
            status = "Enviada";
            css = "colorCirc2";
            acaoseta = "hide";
        } else if (item.status == "SYNC") {
            status = "Sincronizando";
            css = "colorCirc2";
            acaoseta = "hide";
        }

        itemLista = itemLista.replace("{NOME}", item.nome);
        itemLista = itemLista.replace("{STATUS}", status);
        itemLista = itemLista.replace("{CSS}", css);
        itemLista = itemLista.replace("{ACAO}", acao);
        itemLista = itemLista.replace("{LINK}", link);
        itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

        $("#listaPessoas").append(itemLista);
    });

    $.each(empresas, function (i, item) {
        var itemLista = getComponent("itemLista");

        console.log(item);

        var status = "";
        var css = "";
        var acao = "";
        var link = "";
        var acaoseta = "";

        if (item.status == "DIGITANDO") {
            status = "Incompleta";
            css = "colorCirc1";
            acao = "ver detalhes";
            link = "venda_pme_editar.html?cnpj=" + item.cnpj;
            acaoseta = "";
        } else if (item.status == "PRONTA") {
            status = "Aguardando sincronismo";
            css = "colorCirc4";
            acao = "sincronizar";
            link = "logado.html";
            acaoseta = "";
        } else if (item.status == "CRITICADA") {
            status = "Criticada";
            css = "colorCirc3";
            acao = "ver detalhes";
            link = "venda_pme_editar.html?cnpj=" + item.cnpj;
            acaoseta = "";
        } else if (item.status == "ENVIADA") {
            status = "Enviada";
            css = "colorCirc2";
            acaoseta = "hide";

        } else if (item.status == "SYNC") {
            status = "Sincronizando";
            css = "colorCirc2";
            acaoseta = "hide";
        }

        itemLista = itemLista.replace("{NOME}", (item.razaoSocial == undefined || item.razaoSocial == "" ? item.cnpj : item.razaoSocial));
        itemLista = itemLista.replace("{STATUS}", status);
        itemLista = itemLista.replace("{CSS}", css);
        itemLista = itemLista.replace("{ACAO}", acao);
        itemLista = itemLista.replace("{LINK}", link);
        itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

        $("#listaEmpresas").append(itemLista);
    });
}


function carregarListaOnline() {

    swal({
        title: "Aguarde",
        text: 'Estamos procurando seus dados',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/load.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    });

    var pessoas = get("pessoas");
    var empresas = get("empresas");

    var qtdPessoas = 0;
    var qtdEmpresas = 0;

    //if (pessoas != null) {
    //    qtdPessoas = pessoas.length;
    //}
    //
    //if (empresas != null) {
    //    qtdEmpresas = empresas.length;
    //}

    $.each(pessoas, function (i, item) {

        console.log(item);

        if (item.status != "ENVIADA" && item.status != "Aprovado") {



            qtdPessoas++;

            var itemLista = getComponent("itemLista");

            var status = "";
            var css = "";
            var acao = "";
            var link = "";
            var acaoseta = "";

            if (item.status == "DIGITANDO") {
                status = "Proposta incompleta";
                css = "colorCirc1";
                acao = "ver detalhes";
                link = "venda_pf_editar.html?cpf=" + item.cpf;
                acaoseta = "";
            } else if (item.status == "PRONTA") {
                status = "Aguardando sincronismo";
                css = "colorCirc4";
                acao = "sincronizar";
                link = "logado.html";
                acaoseta = "";
            } else if (item.status == "CRITICADA") {
                status = "Criticada";
                css = "colorCirc3";
                acao = "ver detalhes";
                link = "venda_pf_editar.html?cpf=" + item.cpf;
                acaoseta = "";
            } else if (item.status == "SYNC") {
                status = "Sincronizando";
                css = "colorCirc5";
                acaoseta = "hide";
            }

            itemLista = itemLista.replace("{NOME}", item.nome);
            itemLista = itemLista.replace("{STATUS}", status);
            itemLista = itemLista.replace("{CSS}", css);
            itemLista = itemLista.replace("{ACAO}", acao);
            itemLista = itemLista.replace("{LINK}", link);
            itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

            $("#listaPessoas").append(itemLista);
        }
    });

    var TokenAcess;

    callTokenProd(function (dataToken) {

        TokenAcess = dataToken.access_token;

        callDashBoardPF(function (dataDashPf) {

            $.each(dataDashPf.dashboardPropostasPF, function (i, item) {

                qtdPessoas++;

                var itemLista = getComponent("itemLista");

                var status = "";
                var css = "";
                var acao = "";
                var link = "";
                var acaoseta = "";

                if (item.statusVenda == "Aprovado" && item.criticas == null) {

                    status = "Aprovada";
                    css = "colorCirc2";
                    acaoseta = "hide";

                } else { // if (item.statusVenda == "Criticado" || (item.statusVenda == "Aprovado" && item.criticas != null))

                    status = "Criticada";
                    css = "colorCirc3";
                    acaoseta = "hide";
                }
                //} else if (item.statusVenda == "Criticada Envio") {
                //
                //    status = "Criticado";
                //    css = "colorCirc3";
                //    acaoseta = "hide";
                //
                //}

                itemLista = itemLista.replace("{NOME}", item.nome);
                itemLista = itemLista.replace("{STATUS}", status);
                itemLista = itemLista.replace("{CSS}", css);
                itemLista = itemLista.replace("{ACAO}", acao);
                itemLista = itemLista.replace("{LINK}", link);
                itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

                $("#listaPessoas").append(itemLista);

                $("#totalClientes").html(qtdPessoas);

                $("#totalEmpresas").html(qtdEmpresas);
                $("#total").html(qtdEmpresas + qtdPessoas);

            });
        }, TokenAcess);
    });

    $("#totalClientes").html(qtdPessoas);

    $.each(empresas, function (i, item) {

        var status = "";
        var css = "";
        var acao = "";
        var link = "";

        if (item.status != "ENVIADA") {

            qtdEmpresas++;

            var itemLista = getComponent("itemLista");

            if (item.status == "DIGITANDO") {
                status = "Incompleta";
                css = "colorCirc1";
                acao = "ver detalhes";
                link = "venda_pme_editar.html?cnpj=" + item.cnpj;
                acaoseta = "";
            } else if (item.status == "PRONTA") {
                status = "Aguardando sincronismo";
                css = "colorCirc4";
                acao = "sincronizar";
                link = "logado.html";
                acaoseta = "";
            } else if (item.status == "CRITICADA") {
                status = "Criticada";
                css = "colorCirc3";
                acao = "ver detalhes";
                link = "venda_pme_editar.html?cnpj=" + item.cnpj;
                acaoseta = "";
            } else if (item.status == "ENVIADA") {
                status = "Enviada";
                css = "colorCirc2";
                acaoseta = "hide";
            } else if (item.status == "SYNC") {
                status = "Sincronizando";
                css = "colorCirc5";
                acaoseta = "hide";
            }

            itemLista = itemLista.replace("{NOME}", (item.razaoSocial == undefined || item.razaoSocial == "" ? item.cnpj : item.razaoSocial));
            itemLista = itemLista.replace("{STATUS}", status);
            itemLista = itemLista.replace("{CSS}", css);
            itemLista = itemLista.replace("{ACAO}", acao);
            itemLista = itemLista.replace("{LINK}", link);
            itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

            $("#listaEmpresas").append(itemLista);

            $("#totalEmpresas").html(qtdEmpresas);
            $("#total").html(qtdEmpresas + qtdPessoas);
        }
    });

    callTokenProd(function (dataToken) {

        TokenAcess = dataToken.access_token;

        callDashBoardPME(function (dataDashPme) {

            console.log(dataDashPme);

            $.each(dataDashPme.dashboardPropostasPME, function (i, item) {

                qtdEmpresas++;

                var itemLista = getComponent("itemLista");

                var status = "";
                var css = "";
                var acao = "";
                var link = "";

                if (item.statusVenda == "Aprovado") {

                    status = "Aprovada";
                    css = "colorCirc2";
                    acaoseta = "hide";
                } else if (item.statusVenda == "Criticado") {

                    status = "Criticada";
                    css = "colorCirc3";
                    acaoseta = "hide";
                }

                //if (item.statusVenda == "PROPOSTA IMPLANTADA") {
                //
                //    status = "PROPOSTA IMPLANTADA";
                //    css = "colorCirc1";
                //    acaoseta = "hide";
                //
                //} else if (item.statusVenda == "VIDAS COM CRITICAS") {
                //    status = "VIDAS COM CRITICAS";
                //    css = "colorCirc3";
                //    acaoseta = "hide";
                //} else if (item.statusVenda == "AGUARDANDO EMPRESA") {
                //    status = "AGUARDANDO EMPRESA";
                //    css = "colorCirc1";
                //    acaoseta = "hide";
                //} else if (item.statusVenda == "VIDAS OK") {
                //    status = "VIDAS OK";
                //    css = "colorCirc2";
                //    acaoseta = "hide";
                //}

                itemLista = itemLista.replace("{NOME}", (item.razaoSocial == undefined || item.razaoSocial == "" ? item.cnpj : item.razaoSocial));
                itemLista = itemLista.replace("{STATUS}", status);
                itemLista = itemLista.replace("{CSS}", css);
                itemLista = itemLista.replace("{ACAO}", acao);
                itemLista = itemLista.replace("{LINK}", link);
                itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

                $("#listaEmpresas").append(itemLista);

                $("#totalEmpresas").html(qtdEmpresas);
                $("#total").html(qtdEmpresas + qtdPessoas);

            });

            swal.close();

        }, TokenAcess);
    });

    $("#totalEmpresas").html(qtdEmpresas);
    $("#total").html(qtdEmpresas + qtdPessoas);

}


