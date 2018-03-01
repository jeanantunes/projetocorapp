var preenchidos = false;

$(document).ready(function () {
    alertas();

    getVersaoApp(function (dataVersao) {

        var versao = dataVersao.versao;

        if (versao != 1)
        {
            swal({
                title: "Ops",
                text: "Sua versão do aplicativo está desatualizada, atualize na Play Store",
                type: "warning"
            }, function () {
                // Redirect the user
                window.location = "https://play.google.com/store/apps/details?id=br.com.beneficiario.odontoprev&hl=pt_BR";
            });
        }

    });
});

function getVersaoApp(callback) {
    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/corretorapp/1.0/versao",
        method: "GET",
        headers: {
            "Cache-Control": "no-cache"
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
        }
    });
}

function alertas() {

    var pessoas = get("pessoas");
    var empresas = get("empresas");

    var digitandoPessoas = [];
    var criticadaPessoas = [];
    var prontaPessoas = [];

    var digitandoEmpresas = [];
    var criticadaEmpresas = [];
    var prontaEmpresas = [];

    if (pessoas != null) {
        digitandoPessoas = pessoas.filter(function (x) { return x.status == "DIGITANDO" });
        criticadaPessoas = pessoas.filter(function (x) { return x.status == "CRITICADA" });
        prontaPessoas = pessoas.filter(function (x) { return x.status == "PRONTA" });
    }

    if (empresas != null) {
        digitandoEmpresas = empresas.filter(function (x) { return x.status == "DIGITANDO" });
        criticadaEmpresas = empresas.filter(function (x) { return x.status == "CRITICADA" });
        prontaEmpresas = empresas.filter(function (x) { return x.status == "PRONTA" });
    }

    var qtdFinalizada = get("QtdFinalizada");

    if (qtdFinalizada == null) {
        put("QtdFinalizada", 0);
        qtdFinalizada = 0;
    }

    $("#digitando").html(digitandoPessoas.length + digitandoEmpresas.length);
    $("#criticada").html(criticadaPessoas.length + criticadaEmpresas.length);
    $("#pronta").html(prontaPessoas.length + prontaEmpresas.length);
    $("#finalizada").html(qtdFinalizada);
}


function deslogar() {
    ob.deslogar();
    window.location();
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