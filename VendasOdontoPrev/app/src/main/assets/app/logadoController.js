var preenchidos = false;

$(document).ready(function () {

    validarStatusUsuario();

    validarVersaoApp();
    atualizarDashBoard(); 
    resyncPropostasPME();
    resyncPropostasPF();
    checkStatusPropostas();

    atualizarPropostaComApiDash();
    atualizarTokenDevice();
});

function validarVersaoApp()
{
    callTokenProdSemMsgErro(function (dataToken) {

        getVersaoApp(function (dataVersao) {

            var versao = dataVersao.versao;

            if (versao != '6') {
                swal({
                    title: "Ops",
                    text: "Sua versão do aplicativo está desatualizada, atualize na Play Store",
                    type: "warning",
                    closeOnConfirm: false
                }, function () {
                   // Redirect the user
                    window.location = "market://details?id=com.vendaodonto.vendasodontoprev";
                });
            }

        }, dataToken.access_token);
    });
}

function atualizarTokenDevice() {

    //var tokenDevice = getTokenDevice();
    //var modelDevice = getModelDevice();
    var sistemaOperacional = "ANDROID";
    var dadosUsuario = get("dadosUsuario");

    var tokenDevice = getTokenDevice();
    var modelDevice = getModelDevice();

    console.log("Executando device Token");
    console.log(tokenDevice);
    console.log(modelDevice);

    callTokenProdSemMsgErro(function (dataToken) {

        postDeviceToken(function (dataDeviceToken) {

            if (dataDeviceToken.status != undefined) {
                swal("Erro", JSON.stringify(dataDeviceToken));
                console.log("Erro postDeviceToken");
            }

            console.log("Executou postDeviceToken");
  //          swal("Erro", dataDeviceToken);

        }, dataToken.access_token, dadosUsuario.codigo, tokenDevice, modelDevice, sistemaOperacional);

    });
}

function atualizarPropostaComApiDash() {

    if (!navigator.onLine) return;

    callTokenProdSemMsgErro(function (dataToken) {

        var qtdCriticadasPf = 0;
        var qtdCriticadasPME = 0;

        callDashBoardPFReprovado(function (dashPf) {

            qtdCriticadasPf = dashPf.dashboardPropostasPF.length;

            var qtdCriticaLocal = parseInt($("#criticada").html());

            $("#criticada").html(qtdCriticadasPf + qtdCriticaLocal);

            callDashBoardPMEReprovado(function (dashPme) {

                qtdCriticadasPME = dashPme.dashboardPropostasPME.length;

                var qtdCriticaLocal = parseInt($("#criticada").html());

                $("#criticada").html(qtdCriticadasPME + qtdCriticaLocal);

            }, dataToken.access_token);

        }, dataToken.access_token);

    });
}

function validarStatusUsuario() {

    var dadosForca = get("dadosUsuario");

    callTokenProdSemMsgErro(function (dataToken) {

        callDadosForcaVenda(function (dadosForca) {

            var status = dadosForca.statusForcaVenda.toUpperCase();

            if (status == "REPROVADO") {

                swal({
                    title: "Ops",
                    text: "Você foi reprovado",
                    type: "error",
                    closeOnConfirm: false
                }, function () {
                    // Redirect the user
                    logout.removerRegistroLogin();
                    window.location = "index.html";
                });

                return;

            } else if (status == "INATIVO") {

                swal({
                    title: "Ops",
                    text: "A corretora nos informou que você não faz mais parte de sua equipe. Se asssocie à uma nova corretora.",
                    type: "error",
                    closeOnConfirm: false
                }, function () {

                    logout.removerRegistroLogin();
                    window.location = "index.html";
                });

                return;
            }


        }, dataToken.access_token, dadosForca.cpf);
    });

}


function callDadosForcaVenda(callback, token, cpf) {

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/forcavenda/" + cpf,
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

        }
    });
}

function getVersaoApp(callback, token) {

    $.ajax({
        async: true,
        url: URLBase + "/corretorapp/1.0/versao",
        method: "GET",
        headers: {
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
        }
    });
}

function deslogar() {
    
    ob.deslogar();  
    window.location = "index.html";
}

function abrirgaleria() {
    ob.abrirgaleria();

    var base64 = ob.retornoB64();

    $("#imagePerfil").attr('src', 'data:image/jpg;base64,' + base64);
    $("#imageePerfil").attr('src', 'data:image/jpg;base64,' + base64);
}

function setarDados() {
    //var dados = ob.getDadosUsuarios();
    //
    //var dadosTratados = JSON.parse(dados);
    //
    //window.localStorage.setItem('DadosUsuario', dados);
    //
    //document.getElementById('nomeCorretor').innerHTML = "" + dadosTratados.nome;
    //document.getElementById('nomeCorretora').innerHTML = "" + dadosTratados.nomeEmpresa;
    //document.getElementById('nomeCorretorMenu').innerHTML = "" + dadosTratados.nome;
    //document.getElementById('nomeCorretoraMenu').innerHTML = "" + dadosTratados.nomeEmpresa;
    //
    //document.getElementsByClassName('.nomeCorretor').innerHTML = "" + dadosTratados.nome;
}

function callDashBoardPFReprovado(callback, Token) {

    var statusTodasPropostas = 2;
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

        }
    });
}

function callDashBoardPMEReprovado(callback, Token) {

    var statusTodasPropostas = 2;
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

        }
    });
}

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

        }
    });
}

function resyncPropostasPF() {

    $.ajax({
        url: "config/timeResync.json",
        type: "get",
        async: false,
        success: function (result) {
            time = JSON.parse(result);
        },
        error: function () {

        }
    });

    var propostasPF = get("pessoas");

    if (propostasPF == null) return;

    $.each(propostasPF, function (i, item) {


        var o = propostasPF.filter(function (x) { return x.cpf == item.cpf });
        var propostas = propostasPF.filter(function (x) { return x.cpf != item.cpf });

        var salvarPropostas = []; //limpar

        $.each(propostas, function (i, item) {
            salvarPropostas.push(item);
        });

        if (item.status != "SYNC")
            return;

        var now = new Date(item.horaSync);
        var date = new Date();

        var olderDate = moment(date).subtract(time.timeResync, 'minutes').toDate();

        if (!(olderDate > now))
            return;

        o[0].status = "PRONTA";

        salvarPropostas.push(o[0]);

        put("pessoas", JSON.stringify(salvarPropostas));

        sincronizarPessoa(function (dataProposta) {
            console.log(dataProposta);
        }, o, true);

        atualizarDashBoard();

    });
}

function resyncPropostasPME() {

    $.ajax({
        url: "config/timeResync.json",
        type: "get",
        async: false,
        success: function (result) {
            time = JSON.parse(result);
        },
        error: function () {

        }
    });

    var propostasPME = get("empresas");
    var beneficiarios = get("beneficiarios");

    if (propostasPME == null) return;

    $.each(propostasPME, function (i, item) {

        var o = propostasPME.filter(function (x) { return x.cnpj == item.cnpj });
        var propostas = propostasPME.filter(function (x) { return x.cnpj != item.cnpj });
        var b = beneficiarios.filter(function (x) { return x.cnpj == item.cnpj });

        var salvarPropostasPME = []; //limpar

        $.each(propostas, function (i, item) {
            salvarPropostasPME.push(item);
        });

        if (item.status != "SYNC") {
            salvarPropostasPME.push(o[0]);
            return;
        }

        var now = new Date(item.horaSync);
        var date = new Date();

        var olderDate = moment(date).subtract(time.timeResync, 'minutes').toDate();

        if (!(olderDate > now)) return;

        o[0].status = "PRONTA";

        salvarPropostasPME.push(o[0]);

        put("empresas", JSON.stringify(salvarPropostasPME));

        sincronizarEmpresa(function (dataVendaPme) {

        }, o, b, true);

        atualizarDashBoard();

    });
}



function checkStatusPropostas() {

    var propostasPme = get("empresas");
    var propostasPf = get("pessoas");

    if (propostasPf == null) return

    $.ajax({
        url: "config/timeResync.json",
        type: "get",
        async: false,
        success: function (result) {
            time = JSON.parse(result);
        },
        error: function () {

        }
    });

    callTokenProdSemMsgErro(function (dataToken) {

        callDashBoardPF(function (dataDashPf) {

            $.each(propostasPf, function (i, item) {

                var proposta;
                var propostaDash;

                $.each(dataDashPf.dashboardPropostasPF, function (indice2, itemDashPf) {

                    if (itemDashPf.cpf == item.cpf.replace(/\D/g, '')) {
                        propostaDash = itemDashPf;
                        proposta = item;
                    }
                });

                if (proposta == undefined) return; // Caso nao encontre nenhuma proposta, retorna

                if (proposta.dataAtualizacao == undefined) // Checa se o registro nao contem data de atualizacao, caso nao tenha sera setado uma data no registro
                {
                    proposta.dataAtualizacao = new Date();
                
                    var propostas = propostasPf.filter(function (x) { return x.cpf != item.cpf });
                
                    propostasPf = []; //limpar
                
                    $.each(propostas, function (i, item) {
                        propostasPf.push(item);
                    });
                
                    propostasPf.push(proposta);
                
                    put("pessoas", JSON.stringify(propostasPf));
                
                    return;
                }

                var now = new Date(proposta.dataAtualizacao);
                
                var date = new Date();
                
                var olderDate = moment(date).subtract(time.timeUpdate, 'days').toDate();
                
                if (!(olderDate > now)) return;

                proposta.status = propostaDash.statusVenda;
                
                proposta.dataAtualizacao = new Date();
                
                var propostas = propostasPf.filter(function (x) { return x.cpf != item.cpf });
                
                propostasPf = []; //limpar
                
                $.each(propostas, function (i, item) {
                    propostasPf.push(item);
                });
                
                propostasPf.push(proposta);
                
                put("pessoas", JSON.stringify(propostasPf));
            });

        }, dataToken.access_token);
    });
}
