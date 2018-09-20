$(document).ready(function () {

    var termo = getComponent("termoCadastro");

    localStorage.removeItem("reCadastro");

    var recadastroLogin = get("recadastroLogin");

    if (recadastroLogin == true) {

        var dadosUsuario = get("dadosUsuario");
        $("#nomeInativoCadastrado").val(dadosUsuario.nome);
        $("#cpf").val(dadosUsuario.cpf);
        $("#celularInativoCadastrado").val(dadosUsuario.celular);
        $("#emailInativoCadastrado").val(dadosUsuario.email);
        $("#confirmar-senhaCpfFalse").val(dadosUsuario.senha);
        put("reCadastro", true);
        $("#cpfOdont").addClass("hide");
        $("#infoCorretora").removeClass("hide");
        localStorage.removeItem("recadastroLogin");
    }

    $(".componenteTermo").append(termo);

    $("#nomeNaoCadastrado").blur(function () {

        $("#nomeNaoCadastrado").val($("#nomeNaoCadastrado").val().trim());

    });

    $("#nomeNaoCadastrado").keyup(function () {

        var capturandoEspaco = $("#nomeNaoCadastrado").val().substring($("#nomeNaoCadastrado").val().length - 2, $("#nomeNaoCadastrado").val().length);

        if (capturandoEspaco == "  ") {

            $("#nomeNaoCadastrado").val($("#nomeNaoCadastrado").val().substring(0, $("#nomeNaoCadastrado").val().length - 1))

        }
    });

    $("#termoNCadastrado").scroll(function () {

        if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {

            console.log("estou aqui");
            $("#squaredOne").prop('disabled', false);
            $("#squaredOneLabel").prop('disabled', false);

        }

    });

    $("#termoCadastrado").scroll(function () {

        if ($(this).scrollTop() + $(this).innerHeight() >= this.scrollHeight) {

            $("#squaredOneTermoCadastrado").prop('disabled', false);
            $("#squaredOneTermoCadastradoLabel").prop('disabled', false);

        }

    });

    $("#btnCpfOdont").click(function () {

        var cpfValidado = $("#cpf").val().replace(/\D/g, '');

        if (TestaCPF(cpfValidado)) {

            callTokenProd(function (dataToken) {
                
                callForcaVenda(function (dataDadosUsuario) {

                    if (dataDadosUsuario.statusForcaVenda == "Aguardando Aprovação") {
                        console.log("Executou swal");
                        swal("Ops!", "Seu cadastro está aguardando aprovação!", "error");

                        //window.location = "index.html";

                        return;
                    }

                    if (dataDadosUsuario.statusForcaVenda == "Ativo") {
                        console.log("Executou swal");
                        swal("Ops!", "Você já está cadastrado, clique em entrar!", "error");

                        //window.location = "index.html";

                        return;
                    }
                    // || dataDadosUsuario.statusForcaVenda.toUpperCase() == "INATIVO" || dataDadosUsuario.statusForcaVenda.toUpperCase() == "REPROVADO"

                    if (
                        dataDadosUsuario.cdForcaVenda != null 
                        && 
                        dataDadosUsuario.statusForcaVenda.toUpperCase() == "PRÉ-CADASTRO"
                    ) {

                        console.log(dataDadosUsuario);

                        //201809201609 - esert/yalm - COR-796 : APP - Block Modal Pre-Cadastro Consulta CPF
                        if (dataDadosUsuario.login.temBloqueio) {

                            var fraseCorretoraBloqueada = getRepository("fraseCorretoraBloqueada");

                            swal(fraseCorretoraBloqueada.title, fraseCorretoraBloqueada.descricao, fraseCorretoraBloqueada.tipo);
                            
                            //return false;
    
                        } else {

                            swal.close();
                            $("#celOdont").removeClass("hide");
                            $("#cpfOdont").addClass("hide");
                            put("dadosUsuario", JSON.stringify(dataDadosUsuario));
                            $("#nomePreCadastrado").val(dataDadosUsuario.nome);
                            $("#celularPreCadastrado").val(dataDadosUsuario.celular);
                            $("#emailPreCadastrado").val(dataDadosUsuario.email);
                        }

                    }
                    else if (dataDadosUsuario.cdForcaVenda != null && (dataDadosUsuario.statusForcaVenda.toUpperCase() == "INATIVO" || dataDadosUsuario.statusForcaVenda.toUpperCase() == "REPROVADO")) {

                        swal.close();
                        put("reCadastro", true);
                        console.log(dataDadosUsuario);
                        $("#divCadastroInativo").removeClass("hide");
                        $("#cpfOdont").addClass("hide");
                        $("#nomeInativoCadastrado").val(dataDadosUsuario.nome);
                        $("#celularInativoCadastrado").val(dataDadosUsuario.celular);
                        $("#emailInativoCadastrado").val(dataDadosUsuario.email);


                    }
                    else if (dataDadosUsuario.cdForcaVenda == null) {
                        swal.close();
                        console.log(dataDadosUsuario);
                        put("reCadastro", false);
                        $("#celOdontCorretora").removeClass("hide");
                        $("#cpfOdont").addClass("hide");
                    }

                }, dataToken.access_token, cpfValidado);
            });
        }
    });


    $("#btnInfoCorretoraNCpf").click(function () {

        var cnpjValidado = $("#cnpjNaoCadastrado").val().replace(/\D/g, '');

        callTokenProd(function (dataToken) {

            callCorretora(function (dataCorretora) {

                if (dataCorretora.cdCorretora == 0) {
                    console.log("Corretora nao encontrada");
                    $("#myModal").modal();

                    return;
                }

                //$("#termoOdontNCadastrado").removeClass('hide');

                var reCadastro = get("reCadastro");

                if (!reCadastro) {

                    var codCorretora = dataCorretora.cdCorretora;
                    var nome = $("#nomeNaoCadastrado").val();
                    var cpfTratado = $("#cpf").val().replace(/\D/g, '');
                    var celularTratado = $("#celularNaoCadastrado").val().replace(/\D/g, '');
                    var email = $("#emailNaoCadastrado").val();
                    var senha = $("#confirmar-senhaCpfFalse").val();
                    var dataNascimento = "12/09/2002";

                    callInputForcaVenda(function (dataForcaVenda) {

                        var tokenDevice = getTokenDevice();
                        var modelDevice = getModelDevice();
                        var sistemaOperacional = "ANDROID";

                        //let min = Math.floor(Math.random() * (4 - 200 + 1)) + 5
                        //let max = Math.floor(Math.random() * (4 - 200 + 1)) + 5
                        //var tokenDevice = "das" + min.toString();
                        //var modelDevice = "dasd" + max.toString();
                        //var sistemaOperacional = "ANDROID";

                        console.log("MeuLog: Token Device: " + tokenDevice);
                        console.log("MeuLog: Model Device: " + modelDevice);
                        postDeviceToken(function (dataDeviceToken) {
                         
                            $("#infoCorretora").addClass('hide');
                            $("#cadastroSucessoCorretora").removeClass("hide");

                        }, dataToken.access_token, dataForcaVenda.id, tokenDevice, modelDevice, sistemaOperacional);

                    }, dataToken.access_token, cpfTratado, celularTratado, email, codCorretora, nome, senha, dataNascimento);


                } else {

                    var dadosUsuario = get("dadosUsuario");
                    var codCorretora = dataCorretora.cdCorretora;
                    var nome = $("#nomeInativoCadastrado").val();

                    var cpfTratado = $("#cpf").val().replace(/\D/g, '');
                    var celularTratado = $("#celularInativoCadastrado").val().replace(/\D/g, '');
                    var email = $("#emailInativoCadastrado").val();
                    var senha = $("#confirmar-senhaCpfFalse").val();
                    var dataNascimento = "12/09/2002";

                    callPutSenhaForcaVenda(function () {
                        var tokenDevice = getTokenDevice();
                        var modelDevice = getModelDevice();
                        var sistemaOperacional = "ANDROID";

                        //let min = Math.floor(Math.random() * (4 - 200 + 1)) + 5
                        //let max = Math.floor(Math.random() * (4 - 200 + 1)) + 5
                        //var tokenDevice = "das" + min.toString();
                        //var modelDevice = "dasd" + max.toString();
                        //var sistemaOperacional = "ANDROID";

                        console.log("MeuLog: Token Device: " + tokenDevice);
                        console.log("MeuLog: Model Device: " + modelDevice);
                        postDeviceToken(function (dataDeviceToken) {
                         
                            $("#infoCorretora").addClass('hide');
                            $("#cadastroSucessoCorretora").removeClass("hide");

                        }, dataToken.access_token, dadosUsuario.cdForcaVenda, tokenDevice, modelDevice, sistemaOperacional);

                    }, dataToken.access_token, dadosUsuario.cdForcaVenda, nome, celularTratado, email, senha, codCorretora);
                }
            }, dataToken.access_token, cnpjValidado);
        });

    });

    $("#btnTermoNCadastrado").click(function () {

        $("#termoOdontNCadastrado").addClass("hide");
        $("#infoCorretora").removeClass("hide")


    });

    $("#nomeNaoCadastrado").keyup(function () {

        $("#btnCelOdontNCpf").addClass('disabled');
        if ($(this).val() != "" && $("#emailNaoCadastrado").val() != "" && $("#celularNaoCadastrado").val().length > 14 && validateEmail($("#emailNaoCadastrado").val()) && ValidaNome($("#nomeNaoCadastrado").val())) {
            $("#btnCelOdontNCpf").removeClass('disabled');
        }
    });

    $("#celularNaoCadastrado").keyup(function () {

        $("#btnCelOdontNCpf").addClass('disabled');
        if ($(this).val().length > 14 && $("#emailNaoCadastrado").val() != "" && $("#nomeNaoCadastrado").val() != "" && validateEmail($("#emailNaoCadastrado").val()) && ValidaNome($("#nomeNaoCadastrado").val())) {
            $("#btnCelOdontNCpf").removeClass('disabled');
        }
    });

    $("#emailNaoCadastrado").blur(function () {

        $("#btnCelOdontNCpf").addClass('disabled');

        if ($(this).val() != "" && $("#celularNaoCadastrado").val().length > 14 && $("#nomeNaoCadastrado").val() != "" && validateEmail($(this).val()) && ValidaNome($("#nomeNaoCadastrado").val())) {
            console.log("Executando validação email");
            $("#btnCelOdontNCpf").removeClass('disabled');
        }
    });

    $("#cnpjNaoCadastrado").keyup(function () {

        $("#btnInfoCorretoraNCpf").addClass('disabled');
        if ($("#cnpjNaoCadastrado").val().length == 18 && validaCnpj($("#cnpjNaoCadastrado").val().replace(/\D/g, ''))) {
            $("#btnInfoCorretoraNCpf").removeClass('disabled');
        }
    });


    // Aqui começa a validacao dos campos de cadastro 


    $("#cpf").keyup(function () {

        $("#btnCpfOdont").addClass('disabled');

        if ($("#cpf").val().length == 14 && TestaCPF($("#cpf").val().replace(/\D/g, ''))) {
            $("#btnCpfOdont").removeClass('disabled');
        }

    });

    $("#btnTermo").click(function () {

        var dados = get("dadosUsuario");

        console.log("Dados");
        console.log(dados);

        var senha = $("#confirmar-senhaCpfTrue").val();
        var cpf = $("#cpf").val().replace(/\D/g, '');
        var nome = $("#nomePreCadastrado").val();
        var telefone = $("#celularPreCadastrado").val().replace(/\D/g, '');
        var email = $("#emailPreCadastrado").val();
        var senha = $("#confirmar-senhaCpfTrue").val();
        var codCorretora = dados.corretora.cdCorretora;
        var cnpj = dados.corretora.cnpj;
        var nomeEmpresa = dados.corretora.razaoSocial;
        var codigoForca = dados.cdForcaVenda;

        console.log(nomeEmpresa);

        callTokenProd(function (dataToken) {

            callPutForcaVenda(function (dataForcaVenda) {

                dados.nome = nome;
                dados.cpf = cpf;
                dados.celular = telefone;
                dados.email = email;
                dados.cnpj = cnpj;

                put("dadosUsuario", JSON.stringify(dados));

                console.log(get("dadosUsuario"));


                callForcaVenda(function (dataDadosUsuario) {

                    swal.close();

                    var forca = getRepository("dadosUsuario");

                    $("#corretoraCadastro").html(nomeEmpresa);

                    forca.nome = dataDadosUsuario.nome;
                    forca.cargo = dataDadosUsuario.cargo;
                    forca.cpf = dataDadosUsuario.cpf;
                    forca.email = dataDadosUsuario.email;
                    forca.login = dataDadosUsuario.login;
                    forca.nomeEmpresa = dataDadosUsuario.corretora.razaoSocial;
                    forca.nomeGerente = dataDadosUsuario.nomeGerente;
                    forca.responsavel = dataDadosUsuario.responsavel;
                    forca.rg = dataDadosUsuario.rg;
                    forca.senha = dataDadosUsuario.senha;
                    forca.statusUsuario = dataDadosUsuario.statusForcaVenda;
                    forca.telefone = dataDadosUsuario.celular;
                    forca.codigo = dataDadosUsuario.cdForcaVenda;

                    put("dadosUsuario", JSON.stringify(forca));

                    login.salvarDadosUsuario(JSON.stringify(forca));

                    $("#termoOdont").addClass("hide")
                    $("#cadastroSucesso").removeClass("hide")

                }, dataToken.access_token, cpf);

            }, dataToken.access_token, codigoForca, nome, telefone, email, senha);

        });

    });

    // senha
    $(".password").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "1974CE" });
            $(".password").css("color", "#1974CE");
            $(".label-password").css("color", "#1974CE");
        }
    });

    // $(".password").blur(function(){
    //      if($(this).val() == "")
    //          {
    //              $(this).css({"border-color" : "#F00"});
    //              $(".label-password").css("color", "red");
    //          }
    //     });

    //  $(".password").keyup(function(){
    //  if($(this).val() != "")
    //      {
    //          $(this).css({"border-color" : "#3A94FB"});
    //          $(".password").css("color", "#3A94FB");
    //          $(".label-password").css("color", "#3A94FB");
    //      }
    //  });

    // sennha corfimar

    $(".password-confirm").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "3A94FB" });
            $(".password").css("color", "#1974CE"); // se clicar dentro fica azul
            $(".label-password-confirm").css("color", "#1974CE");
        }
    });

    //    $(".password-confirm").blur(function(){
    //        if($(this).val() == "" || $(this).val() != $(".password").val())
    //            {
    //                $(this).css({"border-color" : "#F00"});
    //                $(".label-password-confirm").css("color", "red"); // se estiver vazio fica vermelho
    //            }
    //       });

    //    $(".password-confirm").keyup(function(){
    //    if($(this).val() != "" && $(this).val() == $(".password").val())
    //        {
    //            $(this).css({"border-color" : "#3A94FB"});
    //            $(".password-confirm").css("color", "#3A94FB");// se nao tiver vazio, fica azul
    //            $(".label-password-confirm").css("color", "#3A94FB");
    //        }
    //    });



    // Validaçao da pagina de cadastro associado a corretora

    $("#senhaCpfTrue").blur(function () {

        $("#btnkeyOdont").addClass('disabled');

        var confirmarSenha = $("#confirmar-senhaCpfTrue").val();
        var senha = $("#senhaCpfTrue").val();

        if (senha.length < 8) {

            $("#senhaCpfTrue").css({ "border-color": "#F00" });
            $(".password").css("color", "red");
            $(".label-password").css("color", "red");
            $(".label-password-confirm-8").css("color", "red");

            return;
        }
        else if (senha.length > 7 && (confirmarSenha == "")) {
            $("#senhaCpfTrue").css({ "border-color": "#3A94FB" });
            $(".password").css("color", "#3A94FB");
            $(".label-password").css("color", "#3A94FB");
            $(".label-password-confirm-8").css("color", "#3A94FB");
            $("#btnkeyOdont").removeClass('disabled');

            return;
        } else {
            $("#confirmar-senhaCpfTrue").css({ "border-color": "#F00" });
            $(".password-confirm").css("color", "red");
            $(".label-password-confirm").css("color", "red");
        }

        //if ($("#confirmar-senhaCpfFalse").val() != "" && $(this).val() != $("#confirmar-senhaCpfFalse").val()) {
        //
        //    $("#confirmar-senhaCpfFalse").css({ "border-color": "#F00" });
        //    $(".password-confirm").css("color", "red");
        //    $(".label-password-confirm").css("color", "red");
        //
        //}
    });

    $("#confirmar-senhaCpfTrue").blur(function () {

        $("#btnkeyOdont").addClass('disabled');

        var confirmarSenha = $("#confirmar-senhaCpfTrue").val();
        var senha = $("#senhaCpfTrue").val();

        if (confirmarSenha != senha || confirmarSenha.length < 8 || senha.length < 8) {

            $("#confirmar-senhaCpfTrue").css({ "border-color": "#F00" });
            $(".password-confirm").css("color", "red");
            $(".label-password-confirm").css("color", "red");

        } else if (confirmarSenha == senha && confirmarSenha.length > 7 && senha.length > 7) {

            console.log("Teste");
            $("#confirmar-senhaCpfTrue").css({ "border-color": "#3A94FB" });
            $("#confirmar-senhaCpfTrue").css("color", "#3A94FB");
            $(".label-password-confirm").css("color", "#3A94FB");
            $("#btnkeyOdont").removeClass('disabled');
        }
    });


    // Validaçao da pagina de cadastro nao associado a corretora


    $("#senhaCpfFalse").blur(function () {

        $("#btnkeyOdontNCpf").addClass('disabled');

        var confirmarSenha = $("#confirmar-senhaCpfFalse").val();
        var senha = $("#senhaCpfFalse").val();


        if (senha.length < 8) {

            $(this).css({ "border-color": "#F00" });
            $(".password").css("color", "red");
            $(".label-password").css("color", "red");
            $(".label-password-confirm-8").css("color", "red");

            return;
        }
        else if (senha.length > 7 && (confirmarSenha == "")) {

            $(this).css({ "border-color": "#3A94FB" });
            $(".password").css("color", "#3A94FB");
            $(".label-password").css("color", "#3A94FB");
            $(".label-password-confirm-8").css("color", "#3A94FB");

            return;
        } else {
            $("#confirmar-senhaCpfFalse").css({ "border-color": "#F00" });
            $(".password-confirm").css("color", "red");
            $(".label-password-confirm").css("color", "red");
        }

        //if ($("#confirmar-senhaCpfFalse").val() != "" && $(this).val() != $("#confirmar-senhaCpfFalse").val()) {
        //
        //    $("#confirmar-senhaCpfFalse").css({ "border-color": "#F00" });
        //    $(".password-confirm").css("color", "red");
        //    $(".label-password-confirm").css("color", "red");
        //
        //}
    });

    $("#confirmar-senhaCpfFalse").blur(function () {

        $("#btnkeyOdontNCpf").addClass('disabled');

        var confirmarSenha = $("#confirmar-senhaCpfFalse").val();
        var senha = $("#senhaCpfFalse").val();

        if (confirmarSenha != senha || confirmarSenha.length < 8 || senha.length < 8) {

            $(this).css({ "border-color": "#F00" });
            $(".password-confirm").css("color", "red");
            $(".label-password-confirm").css("color", "red");

        } else if (confirmarSenha == senha && confirmarSenha.length > 7 && senha.length > 7) {

            $(this).css({ "border-color": "#3A94FB" });
            $(this).css("color", "#3A94FB");
            $(".label-password-confirm").css("color", "#3A94FB");
            $("#btnkeyOdontNCpf").removeClass('disabled');
        }
    });





});



function callForcaVenda(callback, token, cpf) {

    swal({
        title: "Aguarde",
        text: 'Estamos procurando seus dados',
        content: "input",
        imageUrl: "img/icon-aguarde.gif",
        showCancelButton: false,
        showConfirmButton: false,
        allowEscapeKey: false, //201809201740 - yalm
        allowOutsideClick: false, //201809201740 - yalm
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    });

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/forcavenda/" + cpf,
        //url: "http://localhost:8090" + "/forcavenda/" + cpf, //201809201718 - teste
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

function callDadosUsuarios(callback, token, cpf) {

    $.ajax({
        async: true,
        url: URLBase + "dcss/usuario/1.0/cpf/" + cpf,
        method: "GET",
        headers: {
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        success: function (resp) {
            //$("#loadingLogin").addClass('hide');
            callback(resp);
        },
        error: function (xhr) {
            //$("#loadingLogin").addClass('hide');
            if (xhr.status == 0) {
                $("#erroLogin").removeClass('hide');
                $("#erroLogin").html("Sem conexão, tente novamente.");
            }
            //console.log(JSON.stringify(resp.statusText));
            //ob.imprimirAlgo(JSON.stringify(resp.statusText));
        }
    });
}

function callInputForcaVenda(callback, token, cpf, celular, email, corretora, nome, senha, dataNascimento) {
    var ativo = "false";
    var departamento = "Corretor";
    var cargo = "Corretor";

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/forcavenda/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        processData: false,
        data: "{  \r\n\t\"nome\":\"" + nome + "\",\r\n\t\"celular\":\"" + celular + "\",\r\n\t\"email\":\"" + email + "\",\r\n\t\"corretora\":{  \r\n\t\t\"cdCorretora\":\"" + corretora + "\"\r\n\t},\r\n\t\"cpf\":\"" + cpf + "\",\r\n\t\"ativo\":" + ativo + ",\r\n\t\"departamento\":\"" + departamento + "\",\r\n\t\"cargo\":\"" + cargo + "\",\r\n\t\"dataNascimento\":\"" + dataNascimento + "\",\r\n\t\"senha\": \"" + senha + "\"\r\n}\r\n",
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {

        }
    });
}

function callPutForcaVenda(callback, token, codForca, nome, celular, email, senha) {
    var canalVenda = 57;
    var nomeEmpresa = "ODONTO CORRETOR";
    var nomeGerente = "ODONTO CORRETOR";
    var responsavel = "ODONTO CORRETOR";

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/forcavenda/login",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        processData: false,
        "data": "{\r\n\r\n    \"cdForcaVenda\": " + codForca + ",\r\n\r\n    \"nome\": \"" + nome + "\",\r\n\r\n    \"celular\": \"" + celular + "\",\r\n\r\n    \"email\": \"" + email + "\",\r\n\r\n    \"senha\": \"" + senha + "\",\r\n\r\n    \"nomeEmpresa\": \"" + nomeEmpresa + "\",\r\n\r\n    \"nomeGerente\": \"" + nomeGerente + "\",\r\n\r\n    \"responsavel\": \"" + responsavel + "\",\r\n\r\n    \"rg\": 0,\r\n\r\n    \"canalVenda\": " + canalVenda + "\r\n\r\n}",
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {

        }
    });
}

function callPutSenhaForcaVenda(callback, token, codForca, nome, celular, email, senha, cdCorretora) {

    var setarPreCadastro = 1;

    var json = {
        "cdForcaVenda": codForca,
        "nome": nome,
        "celular": celular,
        "email": email,
        "senha": senha,
        "corretora": {
            "cdCorretora": parseInt(cdCorretora)
        },
        "statusForcaVenda": setarPreCadastro
    };

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/forcavenda",
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        processData: false,
        data: JSON.stringify(json),
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {

        }
    });
}

function callCorretora(callback, token, cnpj) {

    swal({
        title: "Aguarde",
        text: 'Estamos buscando a corretora',
        content: "input",
        imageUrl: "img/icon-aguarde.gif",
        showCancelButton: false,
        showConfirmButton: false,
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    });

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/corretora/" + cnpj,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
            "Authorization": "Bearer " + token
        },
        success: function (resp) {
            callback(resp);
            swal.close();

        },
        error: function (xhr) {

        }
    });
}



//$("#nomeNaoCadastrado").blur(function () {
//
//    var nome = $("#nomeNaoCadastrado").val();
//
//    var validaNome = isValidFullname(nome);
//
//    console.log(nome);
//
//    console.log(validaNome);
//
//})




//$("#btnInfoCorretoraNCpf").click(function () {
//    $("#infoCorretora").addClass("hide")
//    $("#cadastroSucessoCorretora").removeClass("hide")
//    return false;
//});




// Aqui começa validacao de campos

function validateEmail(email) {
    var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (reg.test(email)) {
        return true;
    }

    return false;
}