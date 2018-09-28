function validarForcaVenda(callback) {

    callTokenVendas(function (dataToken) {

        if (dataToken.status == undefined) {

            var dadosUsuario = get("dadosUsuario");
            var cpfForcaVenda = undefined;

            getForcaVendaBloqueado(dadosUsuario.codigo, cpfForcaVenda, dataToken.access_token,

                function (dataUsuarioSucess) {

                    if (dataUsuarioSucess != undefined) {

                        if (dataUsuarioSucess.temBloqueio) {

                            callback(403) // Usuario bloqueado forbiden / cancelar request de venda
                            return;
                        }

                        callback(200) // Usuario nao bloqueado OK(200) / enviar venda
                        return;

                    }

                    callback(204); // Usuario nao encontrado

                },
                function (dataUsuarioError) {

                    callback(500) // Erro no request (500) / enviar venda
                    return;

                }

            )

        }

    });

}

function getForcaVendaBloqueado(cdForcaVenda, cpfForcaVenda, accessToken, callbackSucess, callbackError) {

    var url;

    if (cpfForcaVenda == undefined && cdForcaVenda == undefined ) {

        return;

    } else if (cdForcaVenda != undefined) {

        url = URLBase + apiGateway + "/forcavenda/bloqueio?cdForcaVenda=" + cdForcaVenda;

    } else {

        url = URLBase + apiGateway + "/forcavenda/bloqueio?cpfForcaVenda=" + cpfForcaVenda;
    }

    $.ajax({
        async: true,
        //url: URLBase + "/corretorservicos/1.0/forcavenda/bloqueio?cdForcaVenda=" + accessToken,
        url: url,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken,
            "Cache-Control": "no-cache",
        },
        success: function (resp) {
            callbackSucess(resp);
        },
        error: function (xhr) {
            callbackError(xhr);
        }
    });

}

function validarForcaIndex() {

    callTokenVendas(function (dataToken) {

        if (dataToken.status == undefined) {

            var dadosUsuario = get("dadosUsuario");
            var cpfForcaVenda = undefined;

            getForcaVendaBloqueado(dadosUsuario.codigo, cpfForcaVenda, dataToken.access_token,

                function (dataUsuarioSucess) {

                    if (dataUsuarioSucess != undefined) {

                        if (dataUsuarioSucess.temBloqueio) {

                            var fraseCorretoraBloqueada = getRepository("fraseCorretoraBloqueada");

                            swal(fraseCorretoraBloqueada.title, fraseCorretoraBloqueada.descricao, fraseCorretoraBloqueada.tipo);
                            return;
                        }

                    }

                },
                function (dataUsuarioError) {

                }

            )

        }

    });

}