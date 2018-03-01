var preenchidos = false;
var cnae;

$(document).ready(function () {
    buscarPlanosSelecionados();
    carregarProposta();
});

function addBenef() {
    salvarRascunhoMemoria();
    window.location = "venda_pme_beneficiarios_lista.html";
}

function buscarPlanosSelecionados() {

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
    });
}

function excluirPlano(obj) {

    var container = $(".div-excluir[data-id=" + $(obj).attr("data-id") + "]");
    var proposta = get("proposta");

    if (proposta == null) {
        proposta = getRepository("proposta");
    }


    var planosExcetoExcluido = proposta.planos.filter(function (x) { return x.cdPlano != container.attr("data-id") });
    proposta.planos = [];
    $.each(planosExcetoExcluido, function (i, item) {
        proposta.planos.push(item);
    });

    put("proposta", JSON.stringify(proposta));
    container.remove();

    atualizarEmpresas(proposta);
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

function callSerasa(callback, cnpj) {

    console.log(cnpj);
    if (cnpj.length < 14)
        return;



    if ($("#cnpjEmpresa").val() != "") {
        var empresas = get("empresas");
        
        if (empresas != null) {
            var existe = empresas.filter(function (x) { return x.cnpj == $("#cnpjEmpresa").val() });
            
            if (existe.length > 0) {
                swal("Ops!", "CNPJ já cadastrado, por favor verifique.", "error");
                $("#cnpjEmpresa").val("");
                return;
            }
        }
    }

    //swal("Aguarde!", "Estamos buscando seus dados.");
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
    })

    $.ajax({
        async: true,
        crossDomain: true,
        url: "https://sitenethomologa.serasa.com.br:443/experian-data-licensing-ws/dataLicensingService",
        method: "POST",
        headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "no-cache"
        },
        data: "<soapenv:Envelope \n\txmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" \n\txmlns:dat=\"http://services.experian.com.br/DataLicensing/DataLicensingService/\" \n\txmlns:dat1=\"http://services.experian.com.br/DataLicensing/\">\n<soapenv:Header>\n            <wsse:Security  xmlns:wsse=\n                        \"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd\">\n            <wsse:UsernameToken>\n                        <wsse:Username>81935697</wsse:Username>\n            <wsse:Password Type=\n                        \"http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-username-token-profile-1.0#PasswordText\">Prj@2018</wsse:Password>\n            </wsse:UsernameToken>\n            </wsse:Security>\n   </soapenv:Header>\n   <soapenv:Body>\n      <dat:ConsultarPJ>\n         <parameters>\n            <cnpj>" + cnpj + "</cnpj>\n            <RetornoPJ>\n               <razaoSocial>true</razaoSocial>\n               <nomeFantasia>true</nomeFantasia>\n               <endereco>true</endereco>\n               <dataAbertura>true</dataAbertura>\n               <representanteLegal>true</representanteLegal>\n               <cnae>true</cnae>\n               <telefone>true</telefone>\n               <situacaoCadastral>ONLINE</situacaoCadastral>\n               <simplesNacional>ONLINE</simplesNacional>\n            </RetornoPJ>\n         </parameters>\n      </dat:ConsultarPJ>\n   </soapenv:Body>\n</soapenv:Envelope>",
        success: function (resp) {

            
            callback(resp);
            swal.close();
        },
        error: function () {
            swal("Falha Serasa", "Você está sem conexão de internet.", "error");
        }
    });
}

$('#cnpjEmpresa').blur(function () {
        buscarEmpresa();
});

function buscarEmpresa() {

    var cnpjValidado = $('#cnpjEmpresa').val().replace(/\D/g, '');

    callSerasa(function (dataConsulta) {
        console.log(dataConsulta);
        try {

            cnae = dataConsulta.getElementsByTagName("codigo")[0].textContent;

            console.log(cnae);
            $("#razao-social").val(dataConsulta.getElementsByTagName("razaoSocial")[0].textContent);
            $("#ramo-atividade").val(dataConsulta.getElementsByTagName("descricao")[0].textContent);
            $("#representante-legal").val(dataConsulta.getElementsByTagName("nome")[0].textContent);
            $("#cpf-representante").val(dataConsulta.getElementsByTagName("documento")[0].textContent);
            $("#nome-fantasia").val(dataConsulta.getElementsByTagName("nomeFantasia")[0].textContent);
        }
        catch (Exception) {
            console.log(Exception);
        }

    }, cnpjValidado);
}

function salvarRascunho() {

    if ($("#cnpjEmpresa").val() == "") {
        swal("Ops!", "Preencha o CNPJ", "error");
        return;
    }


    if ($("#telefone").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#celular").val() == "") {
        swal("Ops!", "Preencha o celular", "error");
        return;
    }

    if ($("#email").val() == "") {
        swal("Ops!", "Preencha o email", "error");
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

    if ($("#numeroEndereco").val() == "") {
        swal("Ops!", "Preencha o número do endereço", "error");
        return;
    }

    if ($("#complemento").val() == "") {
        swal("Ops!", "Preencha o complemento", "error");
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

    swal("Feito","Proposta salva com sucesso", "success")
}

function salvarRascunhoMemoria() {
    var proposta = get("proposta");
    proposta.status = "DIGITANDO";
    proposta.cnpj = $("#cnpjEmpresa").val();
    proposta.cnae = cnae;
    proposta.razaoSocial = $("#razao-social").val();
    proposta.incEstadual = $("#inscricao-estadual").val();
    proposta.ramoAtividade = $("#ramo-atividade").val();
    proposta.nomeFantasia = $("#nome-fantasia").val();
    proposta.representanteLegal = $("#representante-legal").val();
    proposta.contatoEmpresa = $("#squaredOne").is(":checked");
    proposta.telefone = $("#telefone").val();
    proposta.celular = $("#celular").val();
    proposta.email = $("#email").val();
    proposta.enderecoEmpresa.cep = $("#cep").val();
    proposta.enderecoEmpresa.logradouro = $("#rua").val();
    proposta.enderecoEmpresa.numero = $("#numeroEndereco").val();
    proposta.enderecoEmpresa.complemento = $("#complemento").val();
    proposta.enderecoEmpresa.bairro = $("#bairro").val();
    proposta.enderecoEmpresa.cidade = $("#cidade").val();
    proposta.enderecoEmpresa.estado = $("#uf").val();

    console.log(proposta);


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

function carregarProposta() {
    var proposta = get("proposta");
    $("#cnpjEmpresa").val(proposta.cnpj);
    $("#razao-social").val(proposta.razaoSocial);
    $("#inscricao-estadual").val(proposta.incEstadual);
    $("#ramo-atividade").val(proposta.ramoAtividade);
    $("#nome-fantasia").val(proposta.nomeFantasia);
    $("#representante-legal").val(proposta.representanteLegal);

    if (proposta.contatoEmpresa) {
        $("#squaredOne").attr("checked", true);
    }
    else {
        $("#squaredOne").attr("checked", false);
    }

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

    salvarRascunho();
    window.location.href = "vencimento_fatura_pme.html";
}