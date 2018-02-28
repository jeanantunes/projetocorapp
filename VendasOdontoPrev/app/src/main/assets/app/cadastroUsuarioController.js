$(document).ready(function () { });

function callForcaVenda(callback, cpf) {

    swal({
        title: "Aguarde",
        text: 'Estamos procurando seus dados',
        content: "input",
        imageUrl: "img/load.gif",
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
        url: "http://www.corretorvendaodonto.com.br:7001/portal-corretor-servico-0.0.1-SNAPSHOT/forcavenda/" + cpf,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        success: function (resp)
        {
            callback(resp);
            
        },
        error: function (xhr) {

        }
    });
}

function callInputForcaVenda(callback, cpf, celular, email, corretora, nome, senha, dataNascimento)
{
    var ativo = "false";
    var departamento = "Corretor";
    var cargo = "Corretor";

    $.ajax({
        async: true,
        url: "http://www.corretorvendaodonto.com.br:7001/portal-corretor-servico-0.0.1-SNAPSHOT/forcavenda/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
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

function callCorretora(callback, cnpj)
{

    swal({
        title: "Aguarde",
        text: 'Estamos buscando a corretora',
        content: "input",
        imageUrl: "img/load.gif",
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
        url: "http://www.corretorvendaodonto.com.br:7001/portal-corretor-servico-0.0.1-SNAPSHOT/corretora/" + cnpj,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        success: function (resp) {
            callback(resp);
            swal.close();

        },
        error: function (xhr) {

        }
    });
}

$("#btnCpfOdont").click(function () {
    var cpfValidado = $("#cpf").val().replace(/\D/g, '');

    if (TestaCPF(cpfValidado)) {
        callForcaVenda(function (dataDadosUsuario) {

            console.log(dataDadosUsuario);

            if (dataDadosUsuario.statusForcaVenda == "Pendente") {
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

            if (dataDadosUsuario.cdForcaVenda != null && dataDadosUsuario.statusForcaVenda == "Pré-cadastro") {

                swal.close();
                console.log(dataDadosUsuario);
                $("#celOdont").removeClass("hide");
                $("#cpfOdont").addClass("hide");
                $("#nomePreCadastrado").val(dataDadosUsuario.nome);
                $("#celularPreCadastrado").val(dataDadosUsuario.celular);
                $("#emailPreCadastrado").val(dataDadosUsuario.email);

            }
            else if (dataDadosUsuario.cdForcaVenda == null) {
                swal.close();
                console.log(dataDadosUsuario);
                $("#celOdontCorretora").removeClass("hide");
                $("#cpfOdont").addClass("hide");
            }

        }, cpfValidado);
    }
});





$("#btnInfoCorretoraNCpf").click(function () {

    var cnpjValidado = $("#cnpjNaoCadastrado").val().replace(/\D/g, '');

    callCorretora(function (dataCorretora) {

        if (dataCorretora.cdCorretora == 0) {
            console.log("Corretora nao encontrada");
            $("#myModal").modal();

            return;
        }

        var codCorretora = dataCorretora.cdCorretora;
        var nome = $("#nomeNaoCadastrado").val();
        var cpfTratado = $("#cpf").val().replace(/\D/g, '');
        var celularTratado = $("#celularNaoCadastrado").val().replace(/\D/g, '');
        var email = $("#emailNaoCadastrado").val();
        var senha = $("#confirmar-senhaCpfFalse").val();
        var dataNascimento = "";

        callInputForcaVenda(function (dataForcaVenda) {

            console.log(dataForcaVenda);

            $("#infoCorretora").addClass("hide");
            $("#cadastroSucessoCorretora").removeClass("hide");

        }, cpfTratado, celularTratado, email, codCorretora, nome, senha, dataNascimento);


    }, cnpjValidado);


});

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

$("#nomeNaoCadastrado").keyup(function () {

    $("#btnCelOdontNCpf").addClass('disabled');
    if ($(this).val() != "" && $("#emailNaoCadastrado").val() != "" && $("#celularNaoCadastrado").val().length > 14 && validateEmail($("#emailNaoCadastrado").val())) {
        $("#btnCelOdontNCpf").removeClass('disabled');
    }
});

$("#celularNaoCadastrado").keyup(function () {

    $("#btnCelOdontNCpf").addClass('disabled');
    if ($(this).val().length > 14 && $("#emailNaoCadastrado").val() != "" && $("#nomeNaoCadastrado").val() != "" && validateEmail($("#emailNaoCadastrado").val())) {
        $("#btnCelOdontNCpf").removeClass('disabled');
    }
});

$("#emailNaoCadastrado").blur(function () {

    $("#btnCelOdontNCpf").addClass('disabled');

    if ($(this).val() != "" && $("#celularNaoCadastrado").val().length > 14 && $("#nomeNaoCadastrado").val() != "" && validateEmail($(this).val()))
    {
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

    if ($("#cpf").val().length == 14 && TestaCPF($("#cpf").val().replace(/\D/g, '')))
    {
        $("#btnCpfOdont").removeClass('disabled');
    }

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

    $("#btnkeyOdontCpf").addClass('disabled');

    if ($(this).val().length < 8) {

        $(this).css({ "border-color": "#F00" });
        $(".password").css("color", "red");
        $(".label-password").css("color", "red");
        $(".label-password-confirm-8").css("color", "red");

        return;
    }
    else if ($(this).val() > 7 && ($("#confirmar-senhaCpfTrue").val() == "")) {
        $(this).css({ "border-color": "#3A94FB" });
        $(".password").css("color", "#3A94FB");
        $(".label-password").css("color", "#3A94FB");
        $(".label-password-confirm-8").css("color", "#3A94FB");

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

    $("#btnkeyOdontCpf").addClass('disabled');

    if ($(this).val() != $("#senhaCpfTrue").val() || $(this).val() < 8 || $("#senhaCpfTrue").val() < 8) {

        $(this).css({ "border-color": "#F00" });
        $(".password-confirm").css("color", "red");
        $(".label-password-confirm").css("color", "red");

    } else if ($(this).val() == $("#senhaCpfTrue").val() && $(this).val() > 7 && $("#senhaCpfTrue").val() > 7) {

        $(this).css({ "border-color": "#3A94FB" });
        $(this).css("color", "#3A94FB");
        $(".label-password-confirm").css("color", "#3A94FB");
        $("#btnkeyOdontCpf").removeClass('disabled');
    }
});


// Validaçao da pagina de cadastro nao associado a corretora


$("#senhaCpfFalse").blur(function () {

    $("#btnkeyOdontNCpf").addClass('disabled');

    if ($(this).val().length < 8) {

        $(this).css({ "border-color": "#F00" });
        $(".password").css("color", "red");
        $(".label-password").css("color", "red");
        $(".label-password-confirm-8").css("color", "red");

        return;
    }
    else if ($(this).val() > 7 && ($("#confirmar-senhaCpfFalse").val() == "")) {
        $(this).css({ "border-color": "#3A94FB" });
        $(".password").css("color", "#3A94FB");
        $(".label-password").css("color", "#3A94FB");
        $(".label-password-confirm-8").css("color", "#3A94FB");

        return;
    } else
    {
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

    if ($(this).val() != $("#senhaCpfFalse").val() || $(this).val() < 8 || $("#senhaCpfFalse").val() < 8) {

        $(this).css({ "border-color": "#F00" });
        $(".password-confirm").css("color", "red");
        $(".label-password-confirm").css("color", "red");

    } else if ($(this).val() == $("#senhaCpfFalse").val() && $(this).val() > 7 && $("#senhaCpfFalse").val() > 7) {

        $(this).css({ "border-color": "#3A94FB" });
        $(this).css("color", "#3A94FB");
        $(".label-password-confirm").css("color", "#3A94FB");
        $("#btnkeyOdontNCpf").removeClass('disabled');
    }
});


