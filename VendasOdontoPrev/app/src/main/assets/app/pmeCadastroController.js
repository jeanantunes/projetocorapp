var preenchidos = false;

$(document).ready(function () {
    buscarPlanosSelecionados();
    carregarProposta();

    $('#cnpjEmpresa').blur(function () {
        verificarSePropostaExiste();
        //buscarEmpresa();
    });

    $("#squaredOne").change(function () {

        $("#divSegundoContato").addClass('hide');
        if (!$(this).is(':checked')) {

            $("#divSegundoContato").removeClass('hide');

        }
    });
});

function addBenef() {
    if ($(".cnpj").val() == "")
    {
        swal("Ops!", "Preencha o cnpj", "error");

        return;
    }
    salvarRascunhoMemoria();
    window.location = "venda_pme_beneficiarios_lista.html";
}

function buscarPlanosSelecionados() {
    $("#planos").html("");
    var proposta = get("proposta");
    var planos = get("planos");

    $.each(proposta.planos, function (i, item) {
        var o = planos.filter(function (x) { return x.cdPlano == item.cdPlano });
        var plano = getComponent("plano");

        plano = plano.replace("{CDPLANO}", o[0].cdPlano);
        plano = plano.replace("{CDPLANO-BT}", o[0].cdPlano);
        plano = plano.replace("{NOME}", o[0].nome);
        plano = plano.replace("{DESC}", o[0].desc);
        plano = plano.replace("{VALOR}", o[0].valor);
        plano = plano.replace("{CENTAVO}", o[0].centavo);
        plano = plano.replace("{CSS}", o[0].css);
        plano = plano.replace("{CSSVALOR}", o[0].css);

        $("#planos").append(plano);

        if (proposta.planos.length == 1) {
            
            $("#btnExcluirPlano").addClass('hide');
        }

        $(".labelQuantidadeBeneficiarios").addClass('hide');
    });
}

function excluirPlano(obj) {

    var beneficiarios = get("beneficiarios");
    var container = $(".div-excluir[data-id=" + $(obj).attr("data-id") + "]");
    var proposta = get("proposta");

    if (proposta == null) {
        proposta = getRepository("proposta");
    }

    var beneficiariosDaProposta = beneficiarios.filter(function (x) { return x.cnpj == proposta.cnpj });
    var beneficiariosQueNSaoDaProposta = beneficiarios.filter(function (x) { return x.cnpj != proposta.cnpj });
    var planoExcluido = proposta.planos.filter(function (x) { return x.cdPlano == container.attr("data-id") });
    var planosExcetoExcluido = proposta.planos.filter(function (x) { return x.cdPlano != container.attr("data-id") });

    var beneficiariosDessePlano = beneficiariosDaProposta.filter(function (x) {
        return x.cdPlano == planoExcluido[0].cdPlano;
    });

    var quantidadeBeneficiarios = 0;

    $.each(beneficiariosDessePlano, function (i, item) {

        quantidadeBeneficiarios += item.dependentes.length + 1;

    });


    if (quantidadeBeneficiarios > 0) {

        var planos = get("planos");
        var planoNaoExcluido = planos.filter(function (x) { return x.cdPlano == planosExcetoExcluido[0].cdPlano });

        swal({
            title: "Ops!",
            text: "Tem certeza de que deseja excluir os beneficiários deste plano e transferi-lo para o plano " + planoNaoExcluido[0].nome + "?",
            type: "warning",
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {

                    var beneficiarios = [];

                    $.each(beneficiariosDaProposta, function (i, item) {
                        item.cdPlano = planosExcetoExcluido[0].cdPlano;

                        beneficiarios.push(item);
                    });


                    $.each(beneficiariosQueNSaoDaProposta, function (i, item) {

                        beneficiarios.push(item);
                    });

                    put("beneficiarios", JSON.stringify(beneficiarios));

                    proposta.planos = [];
                    $.each(planosExcetoExcluido, function (i, item) {
                        proposta.planos.push(item);
                    });

                    put("proposta", JSON.stringify(proposta));
                    container.remove();

                    atualizarEmpresas(proposta);

                    swal("Sucesso", "Beneficiários transferidos para o plano " + planoNaoExcluido[0].nome, "success");
                } else {
                    swal.close();
                    return;
                }
            });
    } else {
        proposta.planos = [];
        $.each(planosExcetoExcluido, function (i, item) {
            proposta.planos.push(item);
        });

        put("proposta", JSON.stringify(proposta));
        container.remove();
        buscarPlanosSelecionados();
        atualizarEmpresas(proposta);

    }


    //$.each(beneficiariosDaProposta, function (i, item) {
    //    if (item.cdPlano == planoExcluido.cdPlano)
    //    {
    //        swal("Ops!", "Tem certeza de que deseja excluir os beneficiarios deste plano e transferi-lo para o plano ****") /
    //        return;
    //    }
    //});


}

// Mantém os inputs em cache:
var inputs = $('input');

// Chama a função de verificação quando as entradas forem modificadas
// Usei o 'keyup', mas 'change' ou 'keydown' são também eventos úteis aqui
inputs.on('keyup', verificarInputs);

function verificarInputs() {

    inputs.each(function () {
        // verificar um a um e passar a false se algum falhar
        // no lugar do if pode-se usar alguma função de validação, regex ou outros
        var id = this.id;
        //console.log(id);
        if (id != "razao-social" && id != "nome-fantasia" && id != "ramo-atividade" && id != "inscricao-estadual" && id != "representante-legal"
            && id != "cpf-representante") {
            if (!this.value || !validaCnpj($("#cnpjEmpresa").val())) {
                preenchidos = false;
                //swal("Ops!", "Por Favor preencha todos os Dados");

                // parar o loop, evitando que mais inputs sejam verificados sem necessidade
                return false;
            }
        }
    });

    preenchidos = true;  // assumir que estão preenchidos

    // Habilite, ou não, o <button>, dependendo da variável:
    $('button').prop('disabled', !preenchidos); //,
    return true;
}

function callSerasaPme(callback, tokenSerasa, cnpj) {

    if (cnpj.length < 14)
        return;

    if ($("#cnpjEmpresa").val() != "") {
        var empresas = get("empresas");
        
        if (empresas != null) {
            var existe = empresas.filter(function (x) { return x.cnpj == $("#cnpjEmpresa").val() });
            var proposta = get("proposta");

            if (existe.length > 0 && $("#cnpjEmpresa").val() != proposta.cnpj) {
                swal("Ops!", "CNPJ já cadastrado, por favor verifique.", "error");
                $("#cnpjEmpresa").val("");
                return;
            }
        }
    }

    if (!navigator.onLine) {
        return;
    }

    //swal("Aguarde!", "Estamos buscando seus dados.");
    swal({
        title: "Aguarde",
        text: 'Estamos buscando os dados',
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
        url: URLBase + "/serasa/consulta/1.0/",
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            "Authorization": "Bearer " + tokenSerasa,
            "Cache-Control": "no-cache"
        },
        data: "<soapenv:Envelope\r\n                xmlns:dat=\"http://services.experian.com.br/DataLicensing/DataLicensingService/\"\r\n                xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\">\r\n                <soapenv:Header>\r\n               <wsse:Security\r\n                               xmlns:wsse=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\"\r\n                               xmlns:wsu=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd\">\r\n               <wsse:UsernameToken wsu:Id=\"UsernameToken-E26E52D53AB0F9B54115201256503949\">\r\n              <wsse:Username>51990098</wsse:Username>\r\n              <wsse:Password Type=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">Prj@2018</wsse:Password>\r\n              <wsse:Nonce EncodingType=\"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-soap-message-security-1.0#Base64Binary\">3UoD2HzDrcGo5qh9W16B6A==</wsse:Nonce>\r\n              <wsu:Created>2018-03-04T01:07:30.394Z</wsu:Created>\r\n               </wsse:UsernameToken>\r\n               </wsse:Security>\r\n                </soapenv:Header>\r\n                <soapenv:Body>\r\n               <dat:ConsultarPJ>\r\n         <parameters>\r\n            <cnpj>" + cnpj + "</cnpj>\r\n            <RetornoPJ>\r\n               <razaoSocial>true</razaoSocial>\r\n               <nomeFantasia>true</nomeFantasia>\r\n               <dataAbertura>true</dataAbertura>\r\n               <naturezaJuridica>true</naturezaJuridica>\r\n <cnae>true</cnae>\r\n               <endereco>true</endereco>\r\n               <telefone>true</telefone>\r\n               <situacaoCadastral>HISTORICO</situacaoCadastral>\r\n               <representanteLegal>true</representanteLegal>\r\n               <simplesNacional>true</simplesNacional>\r\n               <Pacote>PJ1</Pacote>\r\n            </RetornoPJ>\r\n         </parameters>\r\n      </dat:ConsultarPJ>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>",
        success: function (resp) {
            console.log(resp);

            callback(resp);
        },
        error: function () {
            swal("Falha Serasa", "Você está sem conexão de internet.", "error");
        }
    });
}





function verificarSePropostaExiste() {

    var empresas = get("empresas");

    if (empresas == null) {
        buscarEmpresa();
        return;
    }

    var editado = empresas.filter(function (x) { return x.cnpj == $('#cnpjEmpresa').val() });

    if (editado.length == 0)
    {
        buscarEmpresa();
        return;
    }

    if (editado.length == 1 && editado[0].status == "SYNC")
    {
        swal("Ops!", "Você possui uma proposta com esse CNPJ em sincronismo", "error");
        return;
    }

    if (editado.length == 1 && editado[0].status != "ENVIADA") {

        swal({
            title: "Ops!",
            text: "Você já tem uma proposta com esse CNPJ, selecione uma opção:",
            type: "warning",
            confirmButtonClass: "btn-danger",
            confirmButtonColor: "#1974CE",
            confirmButtonText: "Editar proposta existente",
            cancelButtonText: "Excluir proposta",
            showCancelButton: true,
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {

                    put("proposta", JSON.stringify(editado[0]));
                    window.location.href = "venda_pme_dados_proposta.html";

                } else {

                    swal({
                        title: "Ops!",
                        text: "Tem certeza que deseja excluir a proposta?",
                        type: "warning",
                        confirmButtonClass: "btn-danger",
                        confirmButtonColor: "#1974CE",
                        confirmButtonText: "Sim",
                        cancelButtonText: "Não",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                        function (isConfirm) {
                            if (isConfirm) {
                                var empresasExcetoExcluidas = empresas.filter(function (x) { return x.cnpj != $('#cnpjEmpresa').val() });
                                var beneficiarios = get("beneficiarios");
                                var beneficiariosExcetoExcluidos = beneficiarios.filter(function (x) { return x.cnpj != $('#cnpjEmpresa').val() });

                                put("empresas", JSON.stringify(empresasExcetoExcluidas));
                                put("beneficiarios", JSON.stringify(beneficiariosExcetoExcluidos));
                                window.location.href = "venda_pme_dados_proposta.html"
                                //buscarEmpresa();
                            } else {
                                verificarSePropostaExiste();
                            }
                        });
                }
            });
    }
}



function buscarEmpresa() {
    
    var cnpjValidado = $('#cnpjEmpresa').val().replace(/\D/g, '');
    var cnpj = get("dadosUsuario");
    var cnpjDaProposta = get("proposta");

    if (!validaCnpj(cnpjValidado)) {

        return;

    }

    if (cnpj.cnpjCorretora == cnpjValidado)
    {
        swal("Ops", "Esse é o CNPJ da sua corretora, digite o CNPJ do seu cliente", "info");
        $("#cnpjEmpresa").val("");
        return;
    }

    bloquearCampos();

    if (!navigator.onLine) {

        desbloqCampos();
        return;
    }

    limparCampos();

    //put('cpnjValido', "");
    callTokenProd(function (dataToken) {
        
        callSerasaPme(function (dataConsulta) {

                try {
                    try {
                        var situacaoEmpresa = dataConsulta.getElementsByTagName("situacao")[0].textContent;
                        var situacao = situacaoEmpresa.indexOf("ATIVA");
                    } catch (Exception) { }

                    try {
                        var naturezaJuridica = dataConsulta.getElementsByTagName("codigo")[0].textContent;
                        var dataAbertura = dataConsulta.getElementsByTagName("dataAbertura")[0].textContent;

                        if (naturezaJuridica == "2135")
                        {
                            var date = toDateSplitHifenSerasa(dataAbertura);

                            if (!validateDataMei(date)) {

                                swal("Ops", "Venda não autorizada para Empresa MEI com menos de 6 meses", "info");
                                return;
                            }
                        }

                    } catch (Exception) { }

                    if (situacao == undefined)
                    {
                        $("#razao-social").prop('disabled', false);
                        $("#ramo-atividade").prop('disabled', false);
                        $("#representante-legal").prop('disabled', false);
                        $("#cpf-representante").prop('disabled', false);
                        $("#nome-fantasia").prop('disabled', false);
                        $("#cnae").prop('disabled', false);
                        swal.close();
                        return;
                    }

                    if (!situacao == 0) {

                        swal("Ops", "Não é possível seguir com a contratação para esta empresa. Consulte o CNPJ e tente novamente.", "info");

                        $("#cnpjEmpresa").val("");
                        $("#razao-social").val("");
                        $("#ramo-atividade").val("");
                        $("#representante-legal").val("");
                        $("#cpf-representante").val("");
                        $("#nome-fantasia").val("");
                        $("#cnae").val("");
                        //$("#razao-social").removeProp("disabled", true);
                        return;
                    }
                } catch (Exception) { }

                try {
                    //put('cpnjValido', dataConsulta.getElementsByTagName("situacao")[0].textContent);
                    //console.log(dataConsulta.getElementsByTagName("codigo")[1].textContent.trim());
                    //console.log(empresaAtiva);
                    try { $("#rua").val(dataConsulta.getElementsByTagName("Nome")[0].textContent.trim()); } catch (Exception) { }
                    try { $("#razao-social").val(dataConsulta.getElementsByTagName("razaoSocial")[0].textContent.trim()); } catch (Exception) { $("#razao-social").prop('disabled', false); }
                    try { $("#ramo-atividade").val(dataConsulta.getElementsByTagName("descricao")[0].textContent.trim()); } catch (Exception) { $("#ramo-atividade").prop('disabled', false); }
                    try { $("#representante-legal").val(dataConsulta.getElementsByTagName("nome")[0].textContent.trim()); } catch (Exception) { $("#representante-legal").prop('disabled', false); }
                    try { $("#cpf-representante").val(dataConsulta.getElementsByTagName("documento")[0].textContent.trim()); } catch (Exception) { $("#cpf-representante").prop('disabled', false); }
                    try { $("#nome-fantasia").val(dataConsulta.getElementsByTagName("nomeFantasia")[0].textContent.trim()); } catch (Exception) { $("#nome-fantasia").prop('disabled', false); }
                    try { $("#cnae").val(dataConsulta.getElementsByTagName("codigo")[1].textContent.trim()); } catch (Exception) { $("#cnae").prop('disabled', false);  }
                    try { $("#cep").val(dataConsulta.getElementsByTagName("cep")[0].textContent.trim()); } catch (Exception) { }
                    try { $("#uf").val(dataConsulta.getElementsByTagName("uf")[0].textContent.trim()); } catch (Exception) { }
                    try { $("#cidade").val(dataConsulta.getElementsByTagName("cidade")[0].textContent.trim()); } catch (Exception) { }
                    try { $("#bairro").val(dataConsulta.getElementsByTagName("bairro")[0].textContent.trim()); } catch (Exception) { }
                    try { $("#numeroEndereco").val(dataConsulta.getElementsByTagName("Numero")[0].textContent.trim()); } catch (Exception) { }
                    try { $("#complemento").val(dataConsulta.getElementsByTagName("Complemento")[0].textContent.trim()); } catch (Exception) { }
                    //29294771000110

                    let adicionarValidacaoSerasa = get("proposta");
                    adicionarValidacaoSerasa.consultadaSerasa = true;
                    put("proposta", JSON.stringify(adicionarValidacaoSerasa));

                    swal.close();

                } catch (Exception) { swal.close();}

        }, dataToken.access_token, cnpjValidado);
    });
}

function bloquearCampos() {

    $("#razao-social").prop('disabled', true);
    $("#ramo-atividade").prop('disabled', true);
    $("#representante-legal").prop('disabled', true);
    $("#cpf-representante").prop('disabled', true);
    $("#nome-fantasia").prop('disabled', true);
    $("#cnae").prop('disabled', true);
}

function desbloqCampos() {

    $("#razao-social").prop('disabled', false);
    $("#ramo-atividade").prop('disabled', false);
    $("#representante-legal").prop('disabled', false);
    $("#cpf-representante").prop('disabled', false);
    $("#nome-fantasia").prop('disabled', false);
    $("#cnae").prop('disabled', false);
}

function salvarRascunho() {

    if ($("#cnpjEmpresa").val() == "") {
        swal("Ops!", "Preencha o CNPJ", "error");
        return;
    }

    if ($("#cnae").val().length < 7) {
        swal("Ops!", "O CNAE deve conter 7 dígitos", "error");
        return;
    }
    
    if ($("#telefone").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#telefone").val().length < 14) {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#celular").val() == "") {
        swal("Ops!", "Preencha o celular", "error");
        return;
    }

    if ($("#celular").val().length < 14) {
        swal("Ops!", "Preencha o celular", "error");
        return;
    }

    if ($("#email").val() == "") {
        swal("Ops!", "Preencha o email", "error");
        return;
    }

    if (!validateEmail($(".email").val())) {
        swal("Ops!", "Preencha um E-mail válido", "error");
        return;
    }

    if ($("#cep").val() == "") {
        swal("Ops!", "Preencha o cep", "error");
        return;
    }

    if ($("#rua").val() == "") {
        swal("Ops!", "Preencha o endereço", "error");
        return;
    }

    if ($("#bairro").val() == "") {
        swal("Ops!", "Preencha o bairro", "error");
        return;
    }

    if ($("#cidade").val() == "") {
        swal("Ops!", "Preencha o cidade", "error");
        return;
    }

    if ($("#estado").val() == "") {
        swal("Ops!", "Preencha o estado", "error");
        return;
    }


    salvarRascunhoMemoria();

    //swal("Feito","Proposta salva com sucesso", "success")
}

function salvarEContinuar() {

    if ($("#cnpjEmpresa").val() == "") {
        swal("Ops!", "Preencha o CNPJ", "error");
        return;
    }

    if (!validaCnpj($("#cnpjEmpresa").val())) {
        swal("Ops!", "Preencha um CNPJ válido", "error");
        return;
    }

    salvarRascunhoMemoria();

    swal("Feito", "Proposta salva com sucesso", "success");

}

function salvarRascunhoMemoria() {

    var proposta = get("proposta");
    proposta.status = "DIGITANDO";
    proposta.cnpj = $("#cnpjEmpresa").val().trim();
    proposta.razaoSocial = $("#razao-social").val().trim();
    proposta.incEstadual = $("#inscricao-estadual").val().trim();
    proposta.ramoAtividade = $("#ramo-atividade").val().trim();
    proposta.nomeFantasia = $("#nome-fantasia").val().trim();
    proposta.representanteLegal = $("#representante-legal").val().trim();
    proposta.contatoEmpresa = $("#squaredOne").is(":checked");
    proposta.telefone = $("#telefone").val().trim();
    proposta.celular = $("#celular").val().trim();
    proposta.email = $("#email").val().trim();
    proposta.enderecoEmpresa.cep = $("#cep").val().trim();
    proposta.enderecoEmpresa.logradouro = removerAcentos($("#rua").val().trim());
    proposta.enderecoEmpresa.numero = $("#numeroEndereco").val().trim();
    proposta.enderecoEmpresa.complemento = $("#complemento").val().trim();
    proposta.enderecoEmpresa.bairro = $("#bairro").val().trim();
    proposta.enderecoEmpresa.cidade = $("#cidade").val().trim();
    proposta.enderecoEmpresa.estado = $("#uf").val().trim();
    proposta.cnae = $("#cnae").val().trim();
    proposta.cpfRepresentante = $("#cpf-representante").val().trim();
    proposta.contatoEmpresa = true;

    if (!$("#squaredOne").is(':checked')) {
        proposta.contactEmpresa.nome = $("#nomeSegundoContato").val().trim();
        proposta.contactEmpresa.email = $("#emailSegundoContato").val().trim();
        proposta.contactEmpresa.celular = $("#celularSegundoContato").val().trim();
        proposta.contactEmpresa.telefone = $("#telefoneSegundoContato").val().trim();
        proposta.contatoEmpresa = false;
    }

    var empresas = get("empresas");

    if (empresas == null) {
        empresas = [];
        empresas.push(proposta);
        put("empresas", JSON.stringify(empresas));
    }
    else {
        atualizarEmpresas(proposta);
    }

    put("proposta", JSON.stringify(proposta));
}

function cnpjValido()
{


}

function carregarProposta() {

    var proposta = get("proposta");

    $("#cnpjEmpresa").val(proposta.cnpj.trim());

    if (proposta.razaoSocial == "" && $("#cnpjEmpresa").val() != "") $("#razao-social").prop('disabled', false);
    $("#razao-social").val(proposta.razaoSocial.trim());

    $("#inscricao-estadual").val(proposta.incEstadual.trim());

    if (proposta.ramoAtividade == "" && $("#cnpjEmpresa").val() != "") $("#ramo-atividade").prop('disabled', false);
    $("#ramo-atividade").val(proposta.ramoAtividade.trim());

    if (proposta.nomeFantasia == "" && $("#cnpjEmpresa").val() != "") $("#nome-fantasia").prop('disabled', false);
    $("#nome-fantasia").val(proposta.nomeFantasia.trim());

    if (proposta.representanteLegal == "" && $("#cnpjEmpresa").val() != "") $("#representante-legal").prop('disabled', false);
    $("#representante-legal").val(proposta.representanteLegal.trim());

    if (proposta.cnae == "" && $("#cnpjEmpresa").val() != "") $("#cnae").prop('disabled', false);
    $("#cnae").val(proposta.cnae.trim());

    if (proposta.contatoEmpresa || proposta.contatoEmpresa == "") {
        $("#squaredOne").attr("checked", true);
        $("#divSegundoContato").addClass('hide');
    }
    else if (!proposta.contatoEmpresa){
        $("#squaredOne").attr("checked", false);
        $("#divSegundoContato").removeClass('hide');
        $("#nomeSegundoContato").val(proposta.contactEmpresa.nome);
        $("#emailSegundoContato").val(proposta.contactEmpresa.email);
        $("#celularSegundoContato").val(proposta.contactEmpresa.celular);
        $("#telefoneSegundoContato").val(proposta.contactEmpresa.telefone);
    }

    $("#cpf-representante").val(proposta.cpfRepresentante);
    $("#telefone").val(proposta.telefone);
    $("#celular").val(proposta.celular);
    $("#email").val(proposta.email);
    $("#cep").val(proposta.enderecoEmpresa.cep);
    $("#rua").val(proposta.enderecoEmpresa.logradouro);
    $("#numeroEndereco").val(proposta.enderecoEmpresa.numero);
    $("#complemento").val(proposta.enderecoEmpresa.complemento);
    $("#bairro").val(proposta.enderecoEmpresa.bairro);
    $("#cidade").val(proposta.enderecoEmpresa.cidade);
    $("#uf").val(proposta.enderecoEmpresa.estado);
    $("#cnae").val(proposta.cnae);

}

function validarProposta() {
    var proposta = get("proposta");

    var beneficiarios = get("beneficiarios");
    if (beneficiarios == null) {
        swal("Ops!", "Proposta deve possuir no mínimo 3 vidas", "error");
        return;
    }

    beneficiarios = beneficiarios.filter(function (x) { return x.cnpj == proposta.cnpj });
    var qtdBenef = beneficiarios.length;
    var qtdDependente = 0;

    $.each(beneficiarios, function (i, item) {
        qtdDependente = qtdDependente + item.dependentes.length;
    });

    if ((qtdBenef + qtdDependente) < 3) {
        swal("Ops!", "Proposta deve possuir no mínimo 3 vidas", "error");
        return;
    }

    if ($(".cnpj").val() == "") {
        swal("Ops!", "Preencha o cnpj", "error");
        return;
    }

    if ($("#razao-social").val() == "") {
        swal("Ops!", "Preencha a razäo social", "error");
        return;
    }

    if ($("#nome-fantasia").val() == "") {
        swal("Ops!", "Preencha o nome fantasia", "error");
        return;
    }

    if ($("#ramo-atividade").val() == "") {
        swal("Ops!", "Preencha o ramo de atividade", "error");
        return;
    }

    if ($("#representante-legal").val() == "") {
        swal("Ops!", "Preencha o nome do representante legal", "error");
        return;
    }

    if (!ValidaNome($("#representante-legal").val())) {
        swal("Ops!", "Nome do representante legal inválido", "error");
        return;
    }

    if ($("#cpf-representante").val() == "") {
        swal("Ops!", "Preencha o cpf do representante legal", "error");
        return;
    }

    if (!TestaCPF($("#cpf-representante").val().replace(/\D/g, ''))) {
       
        swal("Ops!", "CPF do representante legal inválido", "error");
        return;
    }

    if ($(".telefone").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($(".celular").val() == "") {
        swal("Ops!", "Preencha o celular", "error");
        return;
    }

    if ($(".email").val() == "") {
        swal("Ops!", "Preencha o email", "error");
        return;
    }

    if (!validateEmail($(".email").val())) {
        swal("Ops!", "Preencha um E-mail válido", "error");
        return;
    }

    if (!$("#squaredOne").is(':checked')) {

        if ($("#nomeSegundoContato").val() == "") {
            swal("Ops!", "Preencha o nome do segundo contato", "error");
            return false;
        }


        if (!ValidaNome($("#nomeSegundoContato").val())) {
            swal("Ops!", "Nome do segundo contato é inválido", "error");
            return false;
        }

        if ($(".telefone-segundo-contato").val() == "") {
            swal("Ops!", "Preencha o telefone do segundo contato", "error");
            return;
        }

        if ($(".celular-segundo-contato").val() == "") {
            swal("Ops!", "Preencha o celular do segundo contato", "error");
            return;
        }

        if ($("#emailSegundoContato").val() == "") {
            swal("Ops!", "Preencha o e-mail do segundo contato", "error");
            return;
        }

        if (!validateEmail($("#emailSegundoContato").val())) {
            swal("Ops!", "Preencha um e-mail válido para o segundo contato", "error");
            return;
        }

    }
    //if (!validarData($(".nascimento").val())) {
    //    swal("Ops!", "Preencha uma data de nascimento correta", "error");
    //    return;
    //}

    if ($(".cep").val() == "") {
        swal("Ops!", "Preencha o cep", "error");
        return;
    }

    if ($(".endereco").val() == "") {
        swal("Ops!", "Preencha o endereço", "error");
        return;
    }

    if ($(".numero").val() == "") {
        swal("Ops!", "Preencha o número do endereço", "error");
        return;
    }

    if ($(".bairro").val() == "") {
        swal("Ops!", "Preencha o bairro", "error");
        return;
    }

    if ($(".cidade").val() == "") {
        swal("Ops!", "Preencha o cidade", "error");
        return;
    }

    if ($(".estado").val() == "") {
        swal("Ops!", "Preencha o estado", "error");
        return;
    }

    salvarRascunho();
    window.location.href = "vencimento_fatura_pme.html";
}

function limparCampos() {

    $("#razao-social").val("");
    $("#ramo-atividade").val("");
    $("#representante-legal").val("");
    $("#cpf-representante").val("");
    $("#nome-fantasia").val("");
    $("#telefone").val("");
    $("#celular").val("");
    $("#email").val("");
    $("#cep").val("");
    $("#rua").val("");
    $("#numeroEndereco").val("");
    $("#complemento").val("");
    $("#bairro").val("");
    $("#cidade").val("");
    $("#uf").val("");
    $("#cnae").val("");
}



