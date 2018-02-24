// Mantém os inputs em cache:
var inputs = $('input');

// Chama a função de verificação quando as entradas forem modificadas
// Usei o 'keyup', mas 'change' ou 'keydown' são também eventos úteis aqui
inputs.on('keyup', verificarInputs);

function verificarInputs() {
    var preenchidos = true;  // assumir que estão preenchidos
    inputs.each(function () {
        // verificar um a um e passar a false se algum falhar
        // no lugar do if pode-se usar alguma função de validação, regex ou outros
        var id = this.id;
        //console.log(id);
        if (id != "razao-social" && id != "nome-fantasia" && id != "ramo-atividade" && id != "inscricao-estadual" && id != "representante-legal"
            && id != "cpf-representante") {
            if (!this.value || !validaCnpj($("#cnpjEmpresa").val())) {
                preenchidos = false;
                $('button').prop('disabled', preenchidos);
                // parar o loop, evitando que mais inputs sejam verificados sem necessidade
                return false;
            }
        }
    });
    // Habilite, ou não, o <button>, dependendo da variável:
    $('button').prop('disabled', !preenchidos); //,
    return true;
}


function callSerasa(callback, cnpj) {
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
            callback(resp)
        },
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

function validarProposta() {
    if (verificarInputs()) {
        console.log("Executou a function e entro no if");
        window.localStorage.setItem('quantidadeBeneficiarios', 0);
        var jsonProposta = JSON.stringify($("#formulario-proposta").serializeArray());
        window.localStorage.setItem('Proposta', jsonProposta);

        window.location = "venda_pme_beneficiarios.html";

        //href="venda_pme_beneficiarios.html" 
    }
    else console.log("Erro");
}