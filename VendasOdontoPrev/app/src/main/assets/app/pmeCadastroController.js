var preenchidos = false;

$(document).ready(function () {
    buscarPlanosSelecionados();
});

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
    //swal("Aguarde!", "Estamos buscando seus dados.");
    swal({
        title: "Aguarde",
        text: 'Estamos procurando seus dados',
        content: "input",
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
            swal.close();
        }
    });
}

$('#cnpjEmpresa').blur(function () {

    buscarEmpresa();
});

function buscarEmpresa() {

    var cnpjValidado = $('#cnpjEmpresa').val().replace(/\D/g, '');

    callSerasa(function (dataConsulta) {
        try {
            $("#nome-fantasia").val(dataConsulta.getElementsByTagName("nomeFantasia")[0].textContent);
            $("#razao-social").val(dataConsulta.getElementsByTagName("razaoSocial")[0].textContent);
            $("#ramo-atividade").val(dataConsulta.getElementsByTagName("descricao")[0].textContent);
            $("#representante-legal").val(dataConsulta.getElementsByTagName("nome")[0].textContent);
            $("#cpf-representante").val(dataConsulta.getElementsByTagName("documento")[0].textContent);
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
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }


    if ($("#email").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#cep").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#rua").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#numeroEndereco").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#complemento").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#bairro").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#cidade").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }

    if ($("#estado").val() == "") {
        swal("Ops!", "Preencha o telefone", "error");
        return;
    }



    var proposta = get("proposta");
    proposta.status = "DIGITANDO";
    proposta.cnpj = $("#cnpjEmpresa").val();
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
    proposta.enderecoEmpresa.endereco = $("#rua").val();
    proposta.enderecoEmpresa.numero = $("#numeroEndereco").val();
    proposta.enderecoEmpresa.complemento = $("#complemento").val();
    proposta.enderecoEmpresa.bairro = $("#bairro").val();
    proposta.enderecoEmpresa.cidade = $("#cidade").val();
    proposta.enderecoEmpresa.estado = $("#estado").val();


    var empresas = get("empresas");

    if (empresas == null) {
        empresas = getRepository("proposta");
    }

    empresas.push(proposta);

    put("empresas", empresas);

    swal("Feito!", "Sua proposta foi salva", "success");

    //window.location = "venda_pme_beneficiarios.html";

    //href="venda_pme_beneficiarios.html" 

}