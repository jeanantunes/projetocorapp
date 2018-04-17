$(document).ready(function () {

});

$("#continuarRecuperacaoDeSenha").click(function () {

    if (!TestaCPF($("#cpf").val())) {

        swal("Ops!", "CPF inválido", "error");
        return;
    }
    callTokenProd(function (dataToken) {
        callRecuperarSenha(function (dataRecuperar) {

            swal.close();
            $("#loadingRecuperacaoSenha").addClass('hide');
            $("#senhaEnviada").removeClass('hide');

            var position = dataRecuperar.mensagem.indexOf(":");
            var email = dataRecuperar.mensagem.substring(position + 2, dataRecuperar.mensagem.length);


            var doisPrimeirosCharEmail = email.substring(0, 2);
            var emailSemDominio = email.substring(0, email.indexOf("@"));
            var emailComAsterisco = doisPrimeirosCharEmail;

            for (i = 0; i < emailSemDominio.length - 2; i++) {
                emailComAsterisco += "*";
            }

            $("#emailRecuperacao").html(email.replace(emailSemDominio, emailComAsterisco));
        }, dataToken.access_token ,$("#cpf").val().replace(/\D/g, ''));
    });
});

function callRecuperarSenha(callback, token, cpf) {

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
        url: URLBase + "/corretorservicos/1.0/esqueciMinhaSenha",
        method: "POST",
        headers: {
            "Authorization": "Bearer " + token,
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