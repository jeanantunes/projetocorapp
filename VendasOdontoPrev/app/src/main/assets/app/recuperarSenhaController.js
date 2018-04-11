$(document).ready(function () {

});

$("#continuarRecuperacaoDeSenha").click(function () {

    if (!TestaCPF($("#cpf").val())) {

        swal("Ops!", "CPF inválido", "error");
        return;
    }

    callRecuperarSenha(function (dataRecuperar) {

        swal.close();
        $("#loadingRecuperacaoSenha").addClass('hide');
        $("#senhaEnviada").removeClass('hide');

        var position = dataRecuperar.mensagem.indexOf(":");
        var email = dataRecuperar.mensagem.substring(position + 2, dataRecuperar.mensagem.length);
        

        var doisPrimeirosCharEmail = email.substring(0, 2);
        var emailSemDominio = email.substring(0, email.indexOf("@"));
        var emailComAsterisco = doisPrimeirosCharEmail;

        for (i = 0; i < emailSemDominio.length - 2; i++){
            emailComAsterisco += "*";
        }

        $("#emailRecuperacao").html(email.replace(emailSemDominio, emailComAsterisco));
    }, $("#cpf").val().replace(/\D/g, ''));

});



function callRecuperarSenha(callback, cpf) {

    var token = 123456478;
    var json = { "cpf": cpf };

    swal({
        title: "Aguarde",
        text: 'Estamos buscando seu CPF',
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
        url: "http://172.16.20.30:7001/portal-corretor-servico-0.0.1-SNAPSHOT/esqueciMinhaSenha",
        method: "POST",
        headers: {
            "Authorization": "Bearer 866a12f4-741f-3a5a-b85e-df71699ca1d6",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        processData: false,
        data: JSON.stringify({ "cpf": cpf }),
        success: function (resp) {
           callback(resp);
        },
        error: function (xhr) {

            if (xhr.status == 500) {
                swal("Ops!", "Não encontramos seu CPF", "error");
            } else swal.close();
            
        }
    });
}

// Um link para redefinir sua senha foi enviado para o e-mail ***@hotmail.com.
// Acesse e finalize o processo