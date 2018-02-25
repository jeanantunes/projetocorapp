function callLogin(callback, login, password) {

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
    })

    $.ajax({
        async: true,
        url: "https://api-it1.odontoprev.com.br:8243/dcss/login/1.0/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        processData: false,
        data: "{\n    \"login\": \"" + login + "\",\n    \"senha\": \"" + password + "\"\n}",
        success: function (resp) {
            callback(resp)
        },
        error: function (xhr) {

            
            //console.log(JSON.stringify(resp.statusText));
            //ob.imprimirAlgo(JSON.stringify(resp.statusText));
            console.log(xhr.status);
            //$("#loadingLogin").addClass('hide');

            if (xhr.status == 403) {
                swal("Ops!", "CPF ou senha inv�lida.", "error");
                $("#erroLogin").removeClass('hide');
                $("#erroLogin").html("CPF ou senha inv�lida.");
            } else if (xhr.status == 0) {
                swal("Ops!", "Voc� est� sem conex�o, tente novamente.", "error");
                $("#erroLogin").removeClass('hide');
                $("#erroLogin").html("Voc� est� sem conex�o, tente novamente.");
                //swal.close();
            }
        }, timeout: 15000
    });
}

function callDadosUsuarios(callback, cpf) {

    $.ajax({
        async: true,
        url: "https://api-it1.odontoprev.com.br:8243/dcss/usuario/1.0/cpf/" + cpf,
        method: "GET",
        headers: {
            "Cache-Control": "no-cache"
        },
        success: function (resp) {
            //$("#loadingLogin").addClass('hide');
            callback(resp);
            swal.close();
        },
        error: function (xhr) {
            //$("#loadingLogin").addClass('hide');
            if (xhr.status == 0) {
                $("#erroLogin").removeClass('hide');
                $("#erroLogin").html("Sem conex�o, tente novamente.");
            }
            //console.log(JSON.stringify(resp.statusText));
            //ob.imprimirAlgo(JSON.stringify(resp.statusText));
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


$("#continuarLogin").click(function () {

    logarETrazerDadosUsuario();

    //window.location = "logado.html";

});

function logarETrazerDadosUsuario() {

    //$("#loadingLogin").removeClass('hide');

    var online = navigator.onLine;
    if (!online) {
        //$("#loadingLogin").addClass('hide');
        console.log("teste");
        $("#erroLogin").removeClass('hide');
        $("#erroLogin").html("Sem conex�o, tente novamente.");
        return;
    }
    var cpfTratado = $("#cpf").val().replace(/\D/g, '');

    console.log(cpfTratado);


    $("divLoading").removeClass('hide');

    callLogin(function (dataLogin) {

        //ob.imprimirSucess();
        //console.log(dataUsuarios);

        //var teste = dataUsuarios.status;

        //console.log(teste);

        callDadosUsuarios(function (dataDadosUsuario) {
            //console.log(dataDadosUsuario);
            console.log(JSON.stringify(dataDadosUsuario));
            //ob.imprimirSucess();
            //console.log(dataDadosUsuario);

            //console.log(JSON.stringify(dataDadosUsuario));
            //ob.imprimirAlgo(JSON.stringify(dataDadosUsuario));
            //ob.salvarDadosUsuario(JSON.stringify(dataDadosUsuario));
            //ob.salvarDadosUsuario();

            put("dadosUsuario", JSON.stringify(dataDadosUsuario));

            window.location = "logado.html";

        }, cpfTratado);

    }, cpfTratado, $("#password").val());
}

