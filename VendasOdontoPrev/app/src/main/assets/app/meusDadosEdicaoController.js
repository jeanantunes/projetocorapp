$(document).ready(function () {

    var dadosCorretor = get("dadosUsuario");
    $("#nomeCorretorEdicao").val(dadosCorretor.nome);
    $("#emailCorretorEdicao").val(dadosCorretor.email);
    $("#telefoneCorretorEdicao").val(aplicarMascaraTelefone(dadosCorretor.telefone));
    $('.telefone-edicao').mask('(00) 00000-0000');

    $("#salvarDados").click(function () {

        var dadosCorretor = get("dadosUsuario");
        var nomeCorretor = $("#nomeCorretorEdicao").val();
        var emailCorretor = $("#emailCorretorEdicao").val();
        var telefoneCorretor = $("#telefoneCorretorEdicao").val().replace(/\D/g, '');
        var cdForcaVenda = dadosCorretor.codigo;
        var cpfCorretor = dadosCorretor.cpf;

        if (!ValidaNome(nomeCorretor)) {

            swal("Ops!", "Por favor preencha um nome válido", "error");
            return;

        }

        if (telefoneCorretor.length < 10) {

            swal("Ops!", "Por favor preencha um celular válido", "error");
            return;

        }

        if (!validateEmail(emailCorretor)) {

            swal("Ops!", "Por favor preencha um email válido", "error");
            return;

        }

        if (!navigator.onLine) {

            swal("Ops!", "Você precisa estar online para atualizar seus dados", "error");
            return;

        }

        swal({
            title: "Aguarde",
            text: 'Estamos atualizando seus dados',
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

        callTokenVendas(function (dataToken) {

            if (dataToken.status != undefined) {

                swal("Ops!", "Erro na atualização dos seus dados", "error");
                return;

            }

            putDadosForcaVenda(function (dataPutForca) {

                if (dataPutForca.id == 0) {

                    swal("Ops!", "Erro na atualização dos seus dados", "error");
                    return;
                }

                getForcaVenda(function (dadosForcaVenda) {

                    if (dadosForcaVenda.status != undefined) {

                        swal("Ops!", "Erro na atualização dos seus dados", "error");
                        return;

                    }

                    if (dadosForcaVenda.cdForcaVenda == null) {

                        swal("Ops!", "Erro na atualização dos seus dados", "error");
                        return;

                    }

                    salvarDadosUsuario(dadosForcaVenda);

                    swal({
                        title: "Feito!",
                        text: "Dados atualizados com sucesso",
                        type: "success",
                        closeOnConfirm: false
                    }, function () {
                        // Redirect the user
                        window.location = "meus_dados.html";
                    });

                }, dataToken.access_token, cpfCorretor);

            }, dataToken.access_token, cdForcaVenda, nomeCorretor, emailCorretor, telefoneCorretor);


        });

    });

    $(".telefone-edicao").focus(function () {

        $(this).css({ "border-color": "#1974CE" });
        $(this).css("color", "#1974CE");
        $(".label-telefone").css("color", "#1974CE");

    });

    $(".telefone-edicao").blur(function () {

        if ($(this).val().length < 14 || $(this).val() == "") {

            $(this).css({ "border-color": "#F00" });
            $(this).css("color", "#F00");
            $(".label-telefone").css("color", "#F00");

        }

    });

    $(".email-edicao").focus(function () {

        $(this).css({ "border-color": "#1974CE" });
        $(this).css("color", "#1974CE");
        $(".label-email").css("color", "#1974CE");

    });

    $(".email-edicao").blur(function () {

        if (!validateEmail($(this).val()) || $(this).val() == "") {

            $(this).css({ "border-color": "#F00" });
            $(this).css("color", "#F00");
            $(".label-email").css("color", "#F00");

        }

    });

    $(".nome-edicao").focus(function () {

        $(this).css({ "border-color": "#1974CE" });
        $(this).css("color", "#1974CE");
        $(".label-nome").css("color", "#1974CE");

    });

    $(".nome-edicao").blur(function () {

        $(this).val($(this).val().trim());

        if (!ValidaNome($(this).val()) || $(this).val() == "") {

            $(this).css({ "border-color": "#F00" });
            $(this).css("color", "#F00");
            $(".label-nome").css("color", "#F00");

        }

    });

})

function putDadosForcaVenda(callback, token, cdForcaVenda, nome, email, telefone) {

    var jsonRequest = {
        "cdForcaVenda": cdForcaVenda,
        "nome": nome,
        "email": email,
        "celular": telefone
    }

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/forcavenda",
        //url: "http://localhost:8090/forcavenda/",
        method: "PUT",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache"
        },
        data: JSON.stringify(jsonRequest),
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });

}

function aplicarMascaraTelefone(telefone) {

    var telefoneReplace = telefone.replace(/\D/g, "");
    telefoneReplace = telefoneReplace.replace(/^0/, "");

    if (telefoneReplace.length > 10) {
        // 11+ digits. Format as 5+4.
        telefoneReplace = telefoneReplace.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    else if (telefoneReplace.length < 11) {

        // 6..10 digits. Format as 4+4
        telefoneReplace = telefoneReplace.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }

    return telefoneReplace;

}

function getForcaVenda(callback, token, cpf) {

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
            callback(xhr);
        }
    });
}

function salvarDadosUsuario(dataDadosUsuario) {

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
    forca.codigo = dataDadosUsuario.cdForcaVenda;

    put("dadosUsuario", JSON.stringify(forca));

}