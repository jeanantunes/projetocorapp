function callLogin(callback, token, login, password) {

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/login",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        processData: false,
        data: "{\r\n\"usuario\": \"" + login + "\",\r\n\"senha\": \"" + password + "\"\r\n}\r\n\r\n ",
        success: function (resp) {
            callback(resp)
        },
        error: function (xhr) {


            //console.log(JSON.stringify(resp.statusText));
            //ob.imprimirAlgo(JSON.stringify(resp.statusText));
            //console.log(xhr.status);
            //$("#loadingLogin").addClass('hide');

            if (xhr.status == 403) {
                swal("Ops!", "Login ou senha inv�lida.", "error");
                $("#erroLogin").removeClass('hide');
                $("#erroLogin").html("CPF ou senha inv�lida.");

                return;
            } else if (xhr.status == 0) {
                swal("Ops!", "Erro na conex�o, tente novamente.", "error");
                //swal.close();
                return;
            }

        }, timeout: 15000
    });
}

$("#continuarLogin").click(function () {

    if (!TestaCPF($("#cpf").val().replace().replace(/\D/g, ''))) {
        swal("Ops", "CPF inv�lido", "error");

        return;
    }

    if ($("#password").val().length < 8) {
        swal("Ops", "A senha deve conter no m�nimo 8 caracteres", "error");

        return;
    }

    logarETrazerDadosUsuario();

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
});

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
            //$("#loadingLogin").addClass('hide');
            callback(resp);
            swal.close();
        },
        error: function (xhr) {
            //$("#loadingLogin").addClass('hide');
            console.log(xhr);
            if (xhr.status == 0) {

                swal.close();
                return;
            }
            //console.log(JSON.stringify(resp.statusText));
            //ob.imprimirAlgo(JSON.stringify(resp.statusText));
            swal.close();
        }
    });
}

// Mant�m os inputs em cache:
var inputs = $('input');

// Chama a fun��o de verifica��o quando as entradas forem modificadas
// Usei o 'keyup', mas 'change' ou 'keydown' s�o tamb�m eventos �teis aqui
inputs.on('keyup', verificarInputs);

function verificarInputs() {
    var preenchidos = true;  // assumir que est�o preenchidos

    inputs.each(function () {

        // verificar um a um e passar a false se algum falhar
        // no lugar do if pode-se usar alguma fun��o de valida��o, regex ou outros
        var id = this.id;
        if (!this.value || !TestaCPF($("#cpf").val()) || $("#password").val().length < 8) {//|| !TestaCPF($("#cpf").val()) || $("#password").val().length < 8){// || $("#password").val().length < 8){//|| !TestaCPF($("#cpf").val()) || $("#password").val().length < 8 ) {
            preenchidos = false;
            $('button').prop('disabled', preenchidos);
            // parar o loop, evitando que mais inputs sejam verificados sem necessidade
            return false;
        }
    });
    // Habilite, ou n�o, o <button>, dependendo da vari�vel:
    $('button').prop('disabled', !preenchidos); //,
    return true;
}


//$("#continuarLogin").click(function () {
//
//    logarETrazerDadosUsuario();
//
//    //window.location = "logado.html";
//
//});

function logarETrazerDadosUsuario() {

    //$("#loadingLogin").removeClass('hide');

    var online = navigator.onLine;
    if (!online) {
        //$("#loadingLogin").addClass('hide');
        $("#erroLogin").removeClass('hide');
        $("#erroLogin").html("Erro na conex�o, tente novamente.");
        return;
    }
    var cpfTratado = $("#cpf").val().replace(/\D/g, '');

    $("divLoading").removeClass('hide');

    callTokenProd(function (dataToken) {

        callLogin(function (dataLogin) {

            //ob.imprimirSucess();
            //console.log(dataUsuarios);

            //var teste = dataUsuarios.status;

            callDadosForcaVenda(function (dataDadosUsuario) { // Essa request salva os dados dos corretores no localstorage

                swal.close();
                //console.log(dataDadosUsuario);
                //console.log(JSON.stringify(dataDadosUsuario));
                //ob.imprimirSucess();
                //console.log(dataDadosUsuario);
                var forca = getRepository("dadosUsuario");

                forca.nome = dataDadosUsuario.nome;
                forca.cargo = dataDadosUsuario.cargo;
                forca.cpf = dataDadosUsuario.cpf;
                forca.email = dataDadosUsuario.email;
                forca.login = dataDadosUsuario.cpf;
                forca.nomeEmpresa = dataDadosUsuario.corretora.razaoSocial;
                forca.nomeGerente = dataDadosUsuario.nomeGerente;
                forca.responsavel = dataDadosUsuario.responsavel;
                forca.rg = dataDadosUsuario.rg;
                forca.senha = dataDadosUsuario.senha;
                forca.statusUsuario = dataDadosUsuario.statusForcaVenda;
                forca.telefone = dataDadosUsuario.celular;
                forca.cnpjCorretora = dataDadosUsuario.corretora.cnpj;
                forca.codigo = dataLogin.codigoUsuario;

                put("dadosUsuario", JSON.stringify(forca));
                //console.log(JSON.stringify(dataDadosUsuario));
                //ob.imprimirAlgo(JSON.stringify(dataDadosUsuario));
                //Marcelo
                ob.salvarDadosUsuario(JSON.stringify(forca));
                //ob.salvarDadosUsuario();
               
                window.location = "logado.html";

            }, dataToken.access_token, cpfTratado);

        }, dataToken.access_token, cpfTratado, $("#password").val());

    });

}

