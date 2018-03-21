var preenchidos = false;

$(document).ready(function () {
    atualizarDashBoard();
    validarVersaoApp();
    resyncPropostasPF();
});


function validarVersaoApp()
{
    callTokenProdSemMsgErro(function (dataToken) {

        getVersaoApp(function (dataVersao) {

            var versao = dataVersao.versao;

            if (versao != '2') {
                swal({
                    title: "Ops",
                    text: "Sua versão do aplicativo está desatualizada, atualize na Play Store",
                    type: "warning"
                }, function () {
                   // Redirect the user
                    window.location = "https://play.google.com/store/apps/details?id=com.vendaodonto.vendasodontoprev";
                });
            }

        }, dataToken.access_token);
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

    $.each(propostasPF, function (i, item) {

        var o = propostasPF.filter(function (x) { return x.cpf == item.cpf });
        var propostas = propostasPF.filter(function (x) { return x.cpf != item.cpf });

        propostasPF = []; //limpar

        $.each(propostas, function (i, item) {
            propostasPF.push(item);
        });

        if (item.status != "SYNC")
            return

        var now = new Date(item.horaSync);
        var date = new Date();

        var olderDate = moment(date).subtract(time.timeResync, 'minutes').toDate();

        if (!(olderDate > now))
            return;

        o[0].status = "PRONTA";

        propostasPF.push(o[0]);

        put("pessoas", JSON.stringify(propostasPF));

        sincronizarPessoa(function (dataProposta) {
            console.log(dataProposta);
        }, o, false);

    });
}