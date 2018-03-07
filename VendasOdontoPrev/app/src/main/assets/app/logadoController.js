var preenchidos = false;

$(document).ready(function () {
    atualizarDashBoard();
    validarVersaoApp();

});


function validarVersaoApp()
{
    callTokenProd(function (dataToken) {

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