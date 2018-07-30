var preenchidos = false;

$(document).ready(function () {

    localStorage.removeItem("resumoStatusPropostaPf");

    if (!navigator.onLine) {
        carregarListaOffline();
        localStorage.removeItem("resumoStatusPropostaPf");
        return;
    }

    carregarListaOnlineAtualizarProposta();
    localStorage.removeItem("resumoStatusPropostaPf");

});

function callDashBoardPF(callback, Token) {

    var statusTodasPropostas = 0;
    var dadosForca = get("dadosUsuario");

    $.ajax({
        async: true,
        //url: "http://172.16.244.160:8090/dashboardPropostaPF/" + statusTodasPropostas + "/"  + dadosForca.cpf,
        url: URLBase + "/corretorservicos/1.0/dashboardPropostaPF/" + statusTodasPropostas + "/" + dadosForca.cpf,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Token,
            "Cache-Control": "no-cache",
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });
}

function callDashBoardPME(callback, Token) {
    var statusTodasPropostas = 0;
    var dadosForca = get("dadosUsuario");

    $.ajax({
        async: true,
        //url: URLBase + "/corretorservicos/1.0/dashboardPropostaPME/" + statusTodasPropostas + "/" + dadosForca.cpf,
        //url: "http://172.16.244.160:8090/dashboardPropostaPME/" + statusTodasPropostas + "/" + dadosForca.cpf,
        url: "http://localhost:8090" + "/dashboardPropostaPME/" + statusTodasPropostas + "/" + dadosForca.cpf,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + Token,
            "Cache-Control": "no-cache",
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });
}


function carregarListaOffline() {

    var pessoas = get("pessoas");
    var empresas = get("empresas");

    var qtdPessoas = 0;
    var qtdEmpresas = 0;

    if (pessoas != null) {
        qtdPessoas = pessoas.length;
    }

    if (empresas != null) {
        qtdEmpresas = empresas.length;
    }

    $("#totalClientes").html(qtdPessoas);
    $("#totalEmpresas").html(qtdEmpresas);
    $("#total").html(qtdEmpresas + qtdPessoas);

    $.each(pessoas, function (i, item) {

        var itemLista = getComponent("itemLista");

        var status = "";
        var css = "";
        var acao = "";
        var link = "";
        var acaoseta = "";
        var onClick = "";


        if (item.status == "DIGITANDO") {
            status = "Proposta incompleta";
            css = "colorCirc1";
            acao = "ver detalhes";
            link = 'href="venda_pf_editar.html?cpf=' + item.cpf + '"';
            acaoseta = "";
        } else if (item.status == "PRONTA") {
            status = "Aguardando envio";
            css = "colorCirc4";
            acao = "sincronizar";
            link = "logado.html";
            acaoseta = "";
        }

        if (item.nome == "") {
            itemLista = itemLista.replace("{NOME}", 'a');
            itemLista = itemLista.replace("{STYLE}", 'style = "color: #fff"');
        } else {
            itemLista = itemLista.replace("{NOME}", item.nome);
            itemLista = itemLista.replace("{STYLE}", "");
        }

        itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "hide");
        itemLista = itemLista.replace("{STATUS}", status);
        itemLista = itemLista.replace("{CSS}", css);
        itemLista = itemLista.replace("{ACAO}", acao);
        itemLista = itemLista.replace("{LINK}", link);
        itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

        $("#listaPessoas").append(itemLista);
    });

    $.each(empresas, function (i, item) {
        var itemLista = getComponent("itemLista");

        console.log(item);

        var status = "";
        var css = "";
        var acao = "";
        var link = "";
        var acaoseta = "";

        if (item.status == "DIGITANDO") {
            status = "Incompleta";
            css = "colorCirc1";
            acao = "ver detalhes";
            link = "venda_pme_editar.html?cnpj=" + item.cnpj;
            acaoseta = "";
        } else if (item.status == "PRONTA") {
            status = "Aguardando envio";
            css = "colorCirc4";
            acao = "sincronizar";
            link = "logado.html";
            acaoseta = "";
        } else if (item.status == "CRITICADA" || item.status == "Criticado") {
            status = "Criticada";
            css = "colorCirc3";
            acao = "ver detalhes";
            link = "venda_pme_editar.html?cnpj=" + item.cnpj;
            acaoseta = "";
        } else if (item.status == "ENVIADA") {
            status = "Processada";
            css = "colorCirc2";
            acaoseta = "hide";

        } else if (item.status == "SYNC") {
            status = "Sincronizando";
            css = "colorCirc5";
            acaoseta = "hide";
        }

        if (item.razaoSocial != undefined && item.razaoSocial != "") {

            itemLista = itemLista.replace("{NOME}", item.razaoSocial);

            if (item.nomeFantasia != undefined && item.nomeFantasia != "") {

                itemLista = itemLista.replace("{NOMEFANTASIA}", item.nomeFantasia);
                itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "");

            } else itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "hide");

        } else {

            itemLista = itemLista.replace("{NOME}", item.cnpj);
            itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "hide");
        }

        itemLista = itemLista.replace("{STATUS}", status);
        itemLista = itemLista.replace("{CSS}", css);
        itemLista = itemLista.replace("{ACAO}", acao);
        itemLista = itemLista.replace("{LINK}", link);
        itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

        $("#listaEmpresas").append(itemLista);
    });
}


function carregarListaOnlineAtualizarProposta() {

    swal({
        title: "Aguarde",
        text: 'Estamos buscando e atualizando buscando suas propostas',
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


    var TokenAcess;

    callTokenProd(function (dataToken) {

        TokenAcess = dataToken.access_token;

        callDashBoardPF(function (dataDashPf) {

            $.each(dataDashPf.dashboardPropostasPF, function (i, item) {

                qtdPessoas++;

                var itemLista = getComponent("itemLista");

                var status = "";
                var css = "";
                var acao = "";
                var link = "";
                var acaoseta = "";
                var cdVenda = "";
                var onClick = "";
                var statusVenda = "";

                if (item.statusVenda == "Proposta enviada para a OdontoPrev" && item.criticas == null) {

                    status = "Proposta enviada para a OdontoPrev";
                    css = "colorCirc7";
                    acaoseta = "";
                    acao = "ver detalhes";
                    cdVenda = item.cdVenda;
                    onClick = 'onclick="verDetalheProposta($(this).attr(' + "'data-id'" + '), $(this).attr(' + "'data-status'" + '))"';
                    statusVenda = item.statusVenda;

                } else if (item.statusVenda == "Proposta criticada") {

                    status = item.statusVenda;
                    css = "colorCirc3";
                    acaoseta = "";
                    acao = "ver detalhes";
                    cdVenda = item.cdVenda;
                    statusVenda = "Proposta Criticada";
                    onClick = 'onclick="verDetalheProposta($(this).attr(' + "'data-id'" + '), $(this).attr(' + "'data-status'" + '))"';

                } else if (item.statusVenda == "Proposta concluida com sucesso") {

                    status = item.statusVenda;
                    css = "colorCirc2";
                    acaoseta = "";
                    acao = "ver detalhes";
                    cdVenda = item.cdVenda;
                    statusVenda = "Proposta Concluída com Sucesso";
                    onClick = 'onclick="verDetalheProposta($(this).attr(' + "'data-id'" + '), $(this).attr(' + "'data-status'" + '))"';

                }


                if (item.nome == "") {

                    itemLista = itemLista.replace("{NOME}", 'a');
                    itemLista = itemLista.replace("{STYLE}", 'style = "color: #fff"');

                } else {

                    itemLista = itemLista.replace("{NOME}", item.nome);
                    itemLista = itemLista.replace("{STYLE}", "");

                }

                itemLista = itemLista.replace("{STATUS}", status);
                itemLista = itemLista.replace("{CSS}", css);
                itemLista = itemLista.replace("{ACAO}", acao);
                itemLista = itemLista.replace("{LINK}", link);
                itemLista = itemLista.replace("{ACAOSETA}", acaoseta);
                itemLista = itemLista.replace("{CDVENDA}", cdVenda);
                itemLista = itemLista.replace("{ONCLICK}", onClick);
                itemLista = itemLista.replace("{STATUSVENDA}", statusVenda);
                itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "hide");

                $("#listaPessoas").append(itemLista);
                $("#totalClientes").html(qtdPessoas);
                $("#totalEmpresas").html(qtdEmpresas);
                $("#total").html(qtdEmpresas + qtdPessoas);

            });
        }, TokenAcess);
    });

    var pessoas = get("pessoas");
    var empresas = get("empresas");

    var qtdPessoas = 0;
    var qtdEmpresas = 0;

    $.each(pessoas, function (i, item) {

        if (item.status != "ENVIADA" && item.status != "Aprovado" && item.status != "Proposta enviada para a OdontoPrev" && item.status != "CRITICADA" && item.status != "Criticado") {

            qtdPessoas++;

            var itemLista = getComponent("itemLista");

            var status = "";
            var css = "";
            var acao = "";
            var link = "";
            var acaoseta = "";
            var onClick = "";


            if (item.status == "DIGITANDO") {
                status = "Proposta incompleta";
                css = "colorCirc1";
                acao = "ver detalhes";
                link = 'href="venda_pf_editar.html?cpf=' + item.cpf +'"';
                acaoseta = "";
            } else if (item.status == "PRONTA") {

                status = "Proposta com envio pendente";
                css = "colorCirc8";
                acao = "enviar proposta";
                link = "";
                onClick = "onclick='" + "sincronizarPropostaPF" + '("' + item.cpf + '")' + "'"
                acaoseta = "";


            } else if (item.status == "SYNC") {
                status = "sincronizando";
                css = "colorCirc5";
                acaoseta = "hide";
            }

            if (item.nome == "") {

                itemLista = itemLista.replace("{NOME}", 'a');
                itemLista = itemLista.replace("{STYLE}", 'style = "color: #fff"');

            } else {

                itemLista = itemLista.replace("{NOME}", item.nome);
                itemLista = itemLista.replace("{STYLE}", "");

            }

            itemLista = itemLista.replace("{STATUS}", status);
            itemLista = itemLista.replace("{CSS}", css);
            itemLista = itemLista.replace("{ACAO}", acao);
            itemLista = itemLista.replace("{LINK}", link);
            itemLista = itemLista.replace("{ACAOSETA}", acaoseta);
            itemLista = itemLista.replace("{ONCLICK}", onClick);
            itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "hide");

            $("#listaPessoas").append(itemLista);
        }
    });

    $("#totalClientes").html(qtdPessoas);

    $.each(empresas, function (i, item) {

        var status = "";
        var css = "";
        var acao = "";
        var link = "";
        var onClick = "";
        var acaoseta = "";

        if (item.status != "ENVIADA") {

            qtdEmpresas++;

            var itemLista = getComponent("itemLista");

            if (item.status == "DIGITANDO") {
                status = "Incompleta";
                css = "colorCirc1";
                acao = "ver detalhes";
                link = 'href="venda_pme_editar.html?cnpj=' + item.cnpj + '"';
                acaoseta = "";
            } else if (item.status == "PRONTA") {
                status = "Proposta com envio pendente";
                css = "colorCirc8";
                acao = "enviar proposta";
                link = "";
                onClick = "onclick='" + "sincronizarPropostaPME" + '("' + item.cnpj + '")' + "'"
                acaoseta = "";
            } else if (item.status == "SYNC") {
                status = "Sincronizando";
                css = "colorCirc5";
                acaoseta = "hide";

            }

            if (item.razaoSocial != undefined && item.razaoSocial != "") {

                itemLista = itemLista.replace("{NOME}", item.razaoSocial);

                if (item.nomeFantasia != undefined && item.nomeFantasia != "") {

                    itemLista = itemLista.replace("{NOMEFANTASIA}", item.nomeFantasia);
                    itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "");

                } else itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "hide");

            } else {

                itemLista = itemLista.replace("{NOME}", item.cnpj);
                itemLista = itemLista.replace("{HIDENOMEFANTASIA}", "hide");
            }

            //itemLista = itemLista.replace("{NOME}", (item.razaoSocial == undefined || item.razaoSocial == "" ? item.cnpj : item.razaoSocial));
            itemLista = itemLista.replace("{STATUS}", status);
            itemLista = itemLista.replace("{CSS}", css);
            itemLista = itemLista.replace("{ACAO}", acao);
            itemLista = itemLista.replace("{LINK}", link);
            itemLista = itemLista.replace("{ACAOSETA}", acaoseta);
            itemLista = itemLista.replace("{ONCLICK}", onClick);


            $("#listaEmpresas").append(itemLista);
            $("#totalEmpresas").html(qtdEmpresas);
            $("#total").html(qtdEmpresas + qtdPessoas);
        }
    });

    callTokenProd(function (dataToken) {

        TokenAcess = dataToken.access_token;

        callDashBoardPME(function (dataDashPme) {

            console.log(dataDashPme);

            $.each(dataDashPme.dashboardPropostasPME, function (i, item) {

                qtdEmpresas++;

                var itemLista = getComponent("itemLista");

                var status = "";
                var css = "";
                var acao = "";
                var link = "";
                var acaoseta = "";

                if (item.statusVenda == "Proposta enviada para a OdontoPrev") {

                    status = "Proposta enviada para a OdontoPrev";
                    css = "colorCirc7";
                    acaoseta = "";
                    acao = "ver detalhes";
                    link = 'href="resumo_status_proposta_pme.html?cdEmpresa=' + item.cdEmpresa + '"';

                } else if (item.statusVenda == "Proposta criticada") {

                    status = "Proposta Criticada";
                    css = "colorCirc3";
                    acaoseta = "hide";

                } else if (item.statusVenda == "Proposta concluida com sucesso") {

                    status = "Proposta Concluída com Sucesso";
                    css = "colorCirc2";
                    acaoseta = "";
                    acao = "ver detalhes";
                    link = 'href="resumo_status_proposta_pme.html?cdEmpresa=' + item.cdEmpresa + '"';
                }

                itemLista = itemLista.replace("{NOME}", item.nome);
                itemLista = itemLista.replace("{NOMEFANTASIA}", item.nomeFantasia);
                itemLista = itemLista.replace("{STATUS}", status);
                itemLista = itemLista.replace("{CSS}", css);
                itemLista = itemLista.replace("{ACAO}", acao);
                itemLista = itemLista.replace("{LINK}", link);
                itemLista = itemLista.replace("{ACAOSETA}", acaoseta);

                $("#listaEmpresas").append(itemLista);
                $("#totalEmpresas").html(qtdEmpresas);
                $("#total").html(qtdEmpresas + qtdPessoas);

            });

            swal.close();

        }, TokenAcess);
    });

    $("#totalEmpresas").html(qtdEmpresas);
    $("#total").html(qtdEmpresas + qtdPessoas);

}

function buscarDetalheProposta(callback, token, cdVenda) {

    $.ajax({
        async: true,
        //url: "http://172.16.20.30:7001/portal-corretor-servico-0.0.1-SNAPSHOT/propostaCritica/buscarPropostaCritica/" + cdVenda,
        //url: "http://172.16.244.160:8080/propostaCritica/buscarPropostaCritica/" + cdVenda,
        //url: "http://172.16.20.30:7001/portal-corretor-servico-0.0.1-SNAPSHOT/propostaCritica/buscarPropostaCritica/" + cdVenda,
        url: URLBase + "/corretorservicos/1.0/proposta/dados/critica/venda/" + cdVenda,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache",
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });
        
}

function sincronizarPropostaPME(cnpjProposta) {

    let propostasASincronizarPme = get("empresas");
    let beneficiariosASincronizar = get("beneficiarios");

    let propostaPmeSelecionada = propostasASincronizarPme.filter(function (x) { return x.cnpj == cnpjProposta });
    let beneficiariosDaProposta = beneficiariosASincronizar.filter(function (x) { return x.cnpj == cnpjProposta });

    if (!navigator.onLine) {
        swal("Você está sem Internet", "Não se preocupe, você pode acessar a tela inicial e enviar esta proposta depois.", "info");
        return;
    }

    if (propostaPmeSelecionada != null && beneficiariosDaProposta != null) {

        if (propostaPmeSelecionada[0].status == "PRONTA") {

            let propostasDiferentesPme = propostasASincronizarPme.filter(function (x) { return x.cnpj != propostaPmeSelecionada[0].cnpj });
            let beneficiariosDiferentesPme = beneficiariosASincronizar.filter(function (x) { return x.cnpj != propostaPmeSelecionada[0].cnpj });

            propostasASincronizarPme = [];

            $.each(propostasDiferentesPme, function (i, item) {
                propostasASincronizarPme.push(item);
            });

            propostaPmeSelecionada[0].status = "SYNC";
            propostaPmeSelecionada[0].horaSync = new Date();
            propostasASincronizarPme.push(propostaPmeSelecionada[0]);

            put("empresas", JSON.stringify(propostasASincronizarPme));

            swal({
                title: "Aguarde",
                text: 'Estamos enviando a sua proposta',
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

            var parametroEmpresa = [];
            parametroEmpresa.push(propostaPmeSelecionada[0]);


            consultarSerasa(function (dataProposta) {



                if (dataProposta == "error") {

                    propostaPmeSelecionada[0].status = "PRONTA";
                    atualizarEmpresas(propostaPmeSelecionada[0]);

                    return;
                };

                propostaPmeSelecionada[0] = dataProposta;

                var parametroEmpresa = [];
                parametroEmpresa.push(propostaPmeSelecionada[0]);

            sincronizarPME(function (dataVendaPme) {

                if (dataVendaPme.id != undefined) {

                    if (dataVendaPme.id == 0) {
                        propostaPmeSelecionada[0].status = "CRITICADA";
                        atualizarEmpresas(propostaPmeSelecionada[0]);
                    }
                    else {

                        var empresas = get("empresas");
                        var todosExcetoExclusao = empresas.filter(function (x) { return x.cnpj != propostaPmeSelecionada[0].cnpj });

                        propostaPmeSelecionada[0].status = "ENVIADA";

                        todosExcetoExclusao.push(propostaPmeSelecionada[0]);

                        put("empresas", JSON.stringify(todosExcetoExclusao));

                        atualizarDashBoard();

                        swal({
                            title: "Proposta enviada com sucesso!",
                            text: "Vamos atualizar a sua lista de propostas",
                            type: "success",
                            closeOnConfirm: true
                        }, function () {
                            // Redirect the user
                            window.location.href = "lista_proposta.html";
                        });

                    }

                } else {

                    propostaPmeSelecionada[0].status = "PRONTA";
                    atualizarEmpresas(propostaPmeSelecionada[0]);
                    swal("Ops!", "Algo deu errado. Por favor, tente enviar outra vez a proposta.", "error");
                }
                }, parametroEmpresa, beneficiariosDaProposta);

            }, propostaPmeSelecionada[0]);
        }
    }
}

function sincronizarPropostaPF(cpfProposta) {

    let propostasASincronizar = get("pessoas");
    let enviarProposta = propostasASincronizar.filter(function (x) { return x.cpf == cpfProposta });

    if (!navigator.onLine) {
        swal("Você está sem Internet", "Não se preocupe, você pode acessar a tela inicial e enviar esta proposta depois.", "info");
        return;
    }

    if (enviarProposta != null) {

        if (enviarProposta[0].status == "PRONTA") {

            var propostasDiferentes = propostasASincronizar.filter(function (x) { return x.cpf != enviarProposta[0].cpf });

            propostasASincronizar = []; //limpar

            $.each(propostasDiferentes, function (i, item) {
                propostasASincronizar.push(item);
            });

            enviarProposta[0].status = "SYNC";
            enviarProposta[0].horaSync = new Date();
            propostasASincronizar.push(enviarProposta[0]);

            put("pessoas", JSON.stringify(propostasASincronizar));

            swal({
                title: "Aguarde",
                text: 'Estamos enviando a sua proposta',
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

            sincronizarPf(function (dataProposta) {

                if (dataProposta.id != undefined) {

                    if (dataProposta.id == 0) {

                        enviarProposta[0].status = "CRITICADA";
                        atualizarPessoas(enviarProposta[0]);
                        console.log("Erro");

                    } else {

                        var pessoas = get("pessoas");
                        var todosExcetoExclusao = pessoas.filter(function (x) { return x.cpf != enviarProposta[0].cpf });
                        //todosExcetoExclusao.push(proposta);

                        console.log(todosExcetoExclusao);
                        put("pessoas", JSON.stringify(todosExcetoExclusao));

                        swal({
                            title: "Proposta enviada com sucesso!",
                            text: "Vamos atualizar a sua lista de propostas",
                            type: "success",
                            closeOnConfirm: true
                        }, function () {
                            // Redirect the user
                            window.location.href = "lista_proposta.html";
                        });

                        
                    }
                }
                else {

                    enviarProposta[0].status = "PRONTA";
                    atualizarPessoas(enviarProposta[0]);
                    swal("Ops!", "Algo deu errado. Por favor, tente enviar outra vez a proposta.", "error")
                }

                atualizarDashBoard();

            }, enviarProposta[0]);
        }
    }
}

function verDetalheProposta(dataId, dataStatus) {

    console.log(dataStatus);

    swal({
        title: "Aguarde",
        text: 'Estamos buscando sua proposta',
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

        buscarDetalheProposta(function (dataPropostaCriticada) {

            console.log(dataPropostaCriticada);

            if (dataPropostaCriticada.status == 404) {

                swal("Ops", "Proposta não encontrada", "error");
                return;
            }

            var retorno = getRepository("propostaPf");

            if (dataPropostaCriticada.venda.dadosBancariosVenda != null) {

                retorno.dadosBancarios.codigoBanco = dataPropostaCriticada.venda.dadosBancariosVenda.codigoBanco;
                retorno.dadosBancarios.agencia = dataPropostaCriticada.venda.dadosBancariosVenda.agencia;
                retorno.dadosBancarios.tipoConta = dataPropostaCriticada.venda.dadosBancariosVenda.tipoConta;
                retorno.dadosBancarios.conta = dataPropostaCriticada.venda.dadosBancariosVenda.conta;

            }

            retorno.planos.push({ cdPlano: dataPropostaCriticada.venda.plano.cdPlano });

            var dependentes = [];

            $.each(dataPropostaCriticada.venda.titulares, function (i, item) {

                if (item.cdTitular == 0) {

                    retorno.cdVenda = dataPropostaCriticada.venda.cdVenda;
                    retorno.cpf = item.cpf;
                    retorno.nome = item.nome;
                    retorno.dataNascimento = item.dataNascimento;
                    retorno.email = item.email;
                    retorno.nomeMae = item.nomeMae;
                    retorno.sexo = item.sexo;
                    retorno.celular = item.celular;

                    retorno.responsavelContratual.cpf = item.cpf;
                    retorno.responsavelContratual.nome = item.nome;
                    retorno.responsavelContratual.dataNascimento = item.dataNascimento;
                    retorno.responsavelContratual.email = item.email;
                    retorno.responsavelContratual.sexo = item.sexo;
                    retorno.responsavelContratual.celular = item.celular;
                    retorno.endereco.cep = item.endereco.cep;
                    retorno.endereco.logradouro = item.endereco.logradouro;
                    retorno.endereco.numero = item.endereco.numero;
                    retorno.endereco.complemento = item.endereco.complemento;
                    retorno.endereco.bairro = item.endereco.bairro;
                    retorno.endereco.cidade = item.endereco.cidade;
                    retorno.endereco.estado = item.endereco.estado;

                    retorno.endereco.cep = item.endereco.cep;
                    retorno.endereco.logradouro = item.endereco.logradouro;
                    retorno.endereco.numero = item.endereco.numero;
                    retorno.endereco.complemento = item.endereco.complemento;
                    retorno.endereco.bairro = item.endereco.bairro;
                    retorno.endereco.cidade = item.endereco.cidade;
                    retorno.endereco.estado = item.endereco.estado;
                    return;
                }

                var dependente = getRepository("dependente");

                dependente.nome = dataPropostaCriticada.venda.titulares[i].nome;
                dependente.nomeMae = dataPropostaCriticada.venda.titulares[i].nomeMae;
                dependente.sexo = dataPropostaCriticada.venda.titulares[i].sexo;
                dependente.celular = dataPropostaCriticada.venda.titulares[i].celular;
                dependente.cpf = dataPropostaCriticada.venda.titulares[i].cpf;
                dependente.email = dataPropostaCriticada.venda.titulares[i].email;
                dependente.dataNascimento = dataPropostaCriticada.venda.titulares[i].dataNascimento;
                dependentes.push(dependente);
            });

            retorno.dependentes = dependentes;
            retorno.criticas = dataPropostaCriticada.venda.criticas;
            retorno.status = dataStatus;

            if (dataPropostaCriticada.venda.criticas.length == 0 && dataPropostaCriticada.venda.propostaDcms != undefined) {

                retorno.propostaDcms = dataPropostaCriticada.venda.propostaDcms;

            }

            localStorage.removeItem("resumoStatusPropostaPf");
            put("resumoStatusPropostaPf", JSON.stringify(retorno));

            window.location = "resumo_status_proposta_pf.html";

        }, dataToken.access_token, dataId);
    });
}