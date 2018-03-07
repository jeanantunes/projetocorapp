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
                swal("Ops!", "Login ou senha inválida.", "error");
                $("#erroLogin").removeClass('hide');
                $("#erroLogin").html("CPF ou senha inválida.");

                return;
            } else if (xhr.status == 0) {
                swal("Ops!", "Erro na conexão, tente novamente.", "error");
                //swal.close();
                return;
            }

        }, timeout: 15000
    });
}

$("#continuarLogin").click(function () {

    if (!TestaCPF($("#cpf").val().replace().replace(/\D/g, ''))) {
        swal("Ops", "CPF inválido", "error");

        return;
    }

    if ($("#password").val().length < 8) {
        swal("Ops", "A senha deve conter no mínimo 8 caracteres", "error");

        return;
    }

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

    logarETrazerDadosUsuario();

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
        }
    });
}

// Mantém os inputs em cache:
var inputs = $('input');

// Chama a função de verificação quando as entradas forem modificadas
// Usei o 'keyup', mas 'change' ou 'keydown' são também eventos úteis aqui
inputs.on('keyup', verificarInputs);

function verificarInputs() {
    var preenchidos = true;  // assumir que estão preenchidos

    inputs.each(function () {

        // verificar um a um e passar a false se algum falhar
        // no lugar do if pode-se usar alguma função de validação, regex ou outros
        var id = this.id;
        if (!this.value || !TestaCPF($("#cpf").val()) || $("#password").val().length < 8) {//|| !TestaCPF($("#cpf").val()) || $("#password").val().length < 8){// || $("#password").val().length < 8){//|| !TestaCPF($("#cpf").val()) || $("#password").val().length < 8 ) {
            preenchidos = false;
            $('button').prop('disabled', preenchidos);
            // parar o loop, evitando que mais inputs sejam verificados sem necessidade
            return false;
        }
    });
    // Habilite, ou não, o <button>, dependendo da variável:
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
        $("#erroLogin").html("Erro na conexão, tente novamente.");
        return;
    }
    var cpfTratado = $("#cpf").val().replace(/\D/g, '');

    console.log(cpfTratado);


    $("divLoading").removeClass('hide');

    callTokenProd(function (dataToken) {

        console.log(dataToken);

        callLogin(function (dataLogin) {

            console.log(dataLogin);
            //ob.imprimirSucess();
            //console.log(dataUsuarios);

            //var teste = dataUsuarios.status;

            console.log(dataLogin);

            callDadosForcaVenda(function (dataDadosUsuario) { // Essa request salva os dados dos corretores no localstorage

                //console.log(dataDadosUsuario);
                //console.log(JSON.stringify(dataDadosUsuario));
                //ob.imprimirSucess();
                //console.log(dataDadosUsuario);

                console.log(dataDadosUsuario);
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

