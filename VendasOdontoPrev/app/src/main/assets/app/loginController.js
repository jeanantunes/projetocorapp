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

            if (xhr.status == 403) {
                swal("Ops!", "Login ou senha inválida.", "error");
                $("#erroLogin").removeClass('hide');
                $("#erroLogin").html("CPF ou senha inválida.");

                return;
            } else if (xhr.status == 0) {

                swal("Ops!", "Erro na conexão, tente novamente.", "error");
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

            callback(resp);
            
        },
        error: function (xhr) {

            console.log(xhr);
            if (xhr.status == 0) {

                swal.close();
                return;
            }

            swal.close();
        }
    });
}

// Mantêm os inputs em cache:
var inputs = $('input');

// Chama a função de verificação quando as entradas forem modificadas
// Usei o 'keyup', mas 'change' ou 'keydown' são tambêm eventos úteis aqui
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
    // Habilite, ou não, o <button>, dependendo da vari�vel:
    $('button').prop('disabled', !preenchidos); //,
    return true;
}

function logarETrazerDadosUsuario() {

    var online = navigator.onLine;
    if (!online) {

        $("#erroLogin").removeClass('hide');
        $("#erroLogin").html("Erro na conexão, tente novamente.");
        return;
    }
    var cpfTratado = $("#cpf").val().replace(/\D/g, '');

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

    callTokenProd(function (dataToken) {

        callDadosForcaVenda(function (dataDadosUsuario) {

            if (dataDadosUsuario.cdForcaVenda == null) {

                swal({
                    title: "Ops!",
                    text: "Você não está cadastrado, deseja se cadastrar?",
                    type: "warning",
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Sim",
                    cancelButtonText: "Não",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                    function (isConfirm) {
                        if (isConfirm) {

                            window.location = "cadastro_usuario.html";
                        }
                    });

                return;

            }

            var status = dataDadosUsuario.statusForcaVenda.toUpperCase();

            if (status == "REPROVADO") {

                swal({
                    title: "Ops!",
                    text: "A corretora recusou sua solicitação. Por favor, entre em contato com a corretora e tente novamente, ou informe uma nova corretora",
                    type: "warning",
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Sim",
                    cancelButtonText: "Não",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                    function (isConfirm) {
                        if (isConfirm) {

                            window.location = "cadastro_usuario.html";
                        }
                    });

                return;

            } else if (status == "INATIVO") {

                swal({
                    title: "Ops!",
                    text: "A corretora nos informou que você não faz mais parte de sua equipe. Deseja se asssociar à uma nova corretora?",
                    type: "warning",
                    confirmButtonClass: "btn-danger",
                    confirmButtonText: "Sim",
                    cancelButtonText: "Não",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function (isConfirm) {
                    if (isConfirm) {

                        window.location = "cadastro_usuario.html";
                    }
                });

                return;
            }

            callLogin(function (dataLogin) {

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

                //Marcelo
                ob.salvarDadosUsuario(JSON.stringify(forca));

                swal.close();
                window.location = "logado.html";

            }, dataToken.access_token, cpfTratado, $("#password").val());

        }, dataToken.access_token, cpfTratado);

    });

}

