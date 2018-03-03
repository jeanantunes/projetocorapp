

$(document).ready(function () {

    function validaNome(campo) {
        var regex = /^[a-zA-ZéúíóáÉÚÍÓÁèùìòàçÇÈÙÌÒÀõãñÕÃÑêûîôâÊÛÎÔÂëÿüïöäËYÜÏÖÄ\-\ \s]+$/;
        if (campo.match(regex)) {
            return false;
        } else { return true; }
    }
    function validarDependentes() {
        var myJSON = JSON.stringify($("#meu_formulario").serializeArray());
        window.localStorage.setItem('Beneficiario', myJSON);
        window.location = "venda_pme_dependentes.html";
    }


    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
    }
    var typingTimer; //timer identifier
    var doneTypingInterval = 500; //time in ms, 5 second for example
    //on keyup, start the countdown
    $('#cep').keyup(function () {

        if (!navigator.onLine)
        {
            return;
        }

        clearTimeout(typingTimer);
        if ($('#cep').val) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    });
    function doneTyping() {
        validar();
    }
    function validar() {
        //Nova variável "cep" somente com dígitos.
        var cep = $('#cep').val().replace(/\D/g, '');
        //Verifica se campo cep possui valor informado.
        if (cep != "" && cep.length == 8) {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;
            //Valida o formato do CEP.
            if (validacep.test(cep)) {
                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("");
                $("#bairro").val("");
                $("#cidade").val("");
                $("#uf").val("");

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

                try {
                    callToken(function (dataToken) {
                        callCep(function (dataCep) {
                            $("#bairro").val(dataCep[0].bairro);
                            $("#cidade").val(dataCep[0].cidade);
                            $("#rua").val(dataCep[0].logradouro);
                            $("#uf").val(dataCep[0].estado);
                        }, dataToken.access_token, cep);
                    });
                } catch (e) {
                    swal.close();
                }
                //Consulta o webservice viacep.com.br/
                //$.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados)
                //{
                //    if (!("erro" in dados)) {
                //    //Atualiza os campos com os valores da consulta.
                //        $("#rua").val(dados.logradouro);
                //        $("#bairro").val(dados.bairro);
                //        $("#cidade").val(dados.localidade);
                //        $("#uf").val(dados.uf);
                //    } //end if.
                //    else {
                //        //CEP pesquisado não foi encontrado.
                //        limpa_formulário_cep();
                //        alert("CEP não encontrado.");
                //    }
                //});
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    }
    //Quando o campo cep perde o foco.
});

function callToken(callback) {

    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/token/",
        method: "POST",
        headers: {
            "Authorization": "Basic Y3hHZXBoTzFkcERDd3U0VHlfRExWTWxXQ0R3YTp0WlJtSUN1eUJWajJZRVczRjdaNXdWM2E0YVlh",
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
            "grant_type": "client_credentials"
        },
        success: function (resp) {
            callback(resp)
        },
        error: function (xhr) {
            swal("Ops!", "Erro na conexão, tente mais tarde", "error");
        }
    });
}
function callCep(callback, token, cep) {
    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/cep/1.1/por/cep/" + cep,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
        },
        success: function (resp) {
            callback(resp)
            swal.close();
        },
        error: function () {
            swal.close();
        }
    });
}




// <!-- Função Valida CPF -->



function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;

    strCPF = strCPF.replace(/\D/g, '');
    if (strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222" || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555" || strCPF == "66666666666" || strCPF == "77777777777" || strCPF == "88888888888" || strCPF == "99999999999") return false;

    for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}


// <!--Mascara -->

function validaCnpj(str) {
    str = str.replace('.', '');
    str = str.replace('.', '');
    str = str.replace('.', '');
    str = str.replace('-', '');
    str = str.replace('/', '');
    cnpj = str;
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
    if (cnpj.length < 14 && cnpj.length < 15)
        return false;
    for (i = 0; i < cnpj.length - 1; i++)
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
        }

$(document).ready(function () {
    $('.data').mask('00/00/0000');
    $('.tempo').mask('00:00:00');
    $('.data_tempo').mask('00/00/0000 00:00:00');
    $('.data').mask('00/00/0000');
    $('.cep').mask('00000-000');
    $('.tel').mask('00000-0000');
    $('.telefone').mask('(00) 0000-0000');
    $('.celular').mask('(00) 00000-0000');
    $('.cpf').mask('000.000.000-00');
    $('.cnpj').mask('00.000.000/0000-00');
    $('.dinheiro').mask('000.000.000.000.000,00', { reverse: true });
    $('.dinheiro2').mask("#.##0,00", { reverse: true });

    $('.cor_hex').mask('#xxxxxx', {

        translation: {
            'x': {
                pattern: /[a-fA-F0-9]/
            },
            '#': ''
        }
    });

    $('.placeholder').mask("00/00/0000", { placeholder: "__/__/____" });


    $('#unmask').click(function () {
        var unmask_value = $('.cpf').cleanVal();
        $('#clearcpf').html(unmask_value);
    });

    //CPF
    $(".cpf").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".cpf").css("color", "#1974CE");
            $(".label-cpf").css("color", "#1974CE");
        }
    });

    $(".cpf").blur(function () {

        var stringteste = $(this).val().replace(".", "");
        stringteste = stringteste.replace("-", "");
        stringteste = stringteste.replace(".", "");

        console.log(stringteste);

        if ($(this).val() == "" || TestaCPF(stringteste) == false) {
            $(this).css({ "border-color": "#F00" });
            $(".label-cpf").css("color", "red");
            $(".cpf").css("color", "red");
        }
    });

    $(".cpf").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".cpf").css("color", "#3A94FB");
            $(".label-cpf").css("color", "#3A94FB");
            $("input:-webkit-autofill").css("color", "#3A94FB");
        }
    });

    // CNPJ

    $(".cnpj").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".cnpj").css("color", "#1974CE");
            $(".label-cnpj").css("color", "#1974CE");
        }
    });

    $(".cnpj").blur(function () {
        if ($(this).val() == "" || validaCnpj($(".cnpj").val()) == false) {
            $(this).css({ "border-color": "#F00" });
            $(".label-cnpj").css("color", "red");
            $(".cnpj").css("color", "red");
        }
    });

    $(".cnpj").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".cnpj").css("color", "#3A94FB");
            $(".label-cnpj").css("color", "#3A94FB");
        }
    });

    // RAZÃO SOCIAL

    $(".razao-social").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".razao-social").css("color", "#1974CE");
            $(".label-razao-social").css("color", "#1974CE");
        }
    });

    $(".razao-social").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-razao-social").css("color", "red");
        }
    });

    $(".razao-social").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".razao-social").css("color", "#3A94FB");
            $(".label-razao-social").css("color", "#3A94FB");
        }
    });

    // NOME-FANTASIA

    $(".nome-fantasia").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".nome-fantasia").css("color", "#1974CE");
            $(".label-nome-fantasia").css("color", "#1974CE");
        }
    });

    $(".nome-fantasia").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-nome-fantasia").css("color", "red");
        }
    });

    $(".nome-fantasia").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".nome-fantasia").css("color", "#3A94FB");
            $(".label-nome-fantasia").css("color", "#3A94FB");
        }
    });

    // RAMO ATIVIDADE

    $(".ramo-atividade").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".ramo-atividade").css("color", "#1974CE");
            $(".label-ramo-atividade").css("color", "#1974CE");
        }
    });

    $(".ramo-atividade").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-ramo-atividade").css("color", "red");
        }
    });

    $(".ramo-atividade").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".ramo-atividade").css("color", "#3A94FB");
            $(".ramo-atividade").css("color", "#3A94FB");
        }
    });

    // MENSAGEM 

    $(".mensagem").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".mensagem").css("color", "#1974CE");
            $(".label-mensagem").css("color", "#1974CE");
        }
    });

    $(".mensagem").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-mensagem").css("color", "red");
            $("#enviar").addClass("disabled");
        }
    });

    $(".mensagem").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".mensagem").css("color", "#3A94FB");
            $(".mensagem").css("color", "#3A94FB");
            $("#enviar").removeClass("disabled");
        }
    });

    //Verica se o checkbox esta ativo e retira o "disabled"//

    $(document).ready(function () {
        $("#squaredOne").click(function (e) {
            if ($("#squaredOne").is(":checked")) {

                $("#btnTermo").removeClass("disabled");
                $("#btnTermoNCadastrado").removeClass('disabled');
            } else {
                $("#btnTermo").addClass("disabled");
                $("#btnTermoNCadastrado").addClass('disabled');
            }
        });
    });

    //Verica se o checkbox esta ativo e retira o "disabled"//

    //Verica se o select option esta selecionado e retira o "disabled"//
    $(document).ready(function () {
        $("#vencOdont").click(function (e) {
            if ($('#vencOdont :selected').text()) {

                $("#bntVenc").removeClass("disabled");
            } else {
                $("#bntVenc").addClass("disabled");
            }
        });
    });

    //Verica se o select option esta selecionado e retira o "disabled"//

    // INSCRIÇÃO ESTADUAL

    $(".inscricao-estadual").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".inscricao-estadual").css("color", "#1974CE");
            $(".label-inscricao-estadual").css("color", "#1974CE");
        }
    });

    $(".inscricao-estadual").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-inscricao-estadual").css("color", "red");
        }
    });

    $(".inscricao-estadual").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".inscricao-estadual").css("color", "#3A94FB");
            $(".inscricao-estadual").css("color", "#3A94FB");
        }
    });

    // REPRESENTANTE LEGAL 

    $(".representante-legal").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".representante-legal").css("color", "#1974CE");
            $(".label-representante-legal").css("color", "#1974CE");
        }
    });

    $(".representante-legal").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-representante-legal").css("color", "red");
        }
    });

    $(".representante-legal").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".representante-legal").css("color", "#3A94FB");
            $(".representante-legal").css("color", "#3A94FB");
        }
    });

    // NUMERO CARTAO

    $(".cartao").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".cartao").css("color", "#1974CE");
            $(".label-cartao").css("color", "#1974CE");
        }
    });

    $(".cartao").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-cartao").css("color", "red");
        }
    });

    $(".cartao").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".cartao").css("color", "#3A94FB");
            $(".label-cartao").css("color", "#3A94FB");
        }
    });

    // NOME CARTAO

    $(".nome-cartao").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".nome-cartao").css("color", "#1974CE");
            $(".label-nome-cartao").css("color", "#1974CE");
        }
    });

    $(".nome-cartao").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-nome-cartao").css("color", "red");
        }
    });

    $(".nome-cartao").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".nome-cartao").css("color", "#3A94FB");
            $(".label-nome-cartao").css("color", "#3A94FB");
        }
    });

    // VALIDADE

    $(".validade").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".validade").css("color", "#1974CE");
            $(".label-validade").css("color", "#1974CE");
        }
    });

    $(".validade").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-validade").css("color", "red");
        }
    });

    $(".validade").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".validade").css("color", "#3A94FB");
            $(".label-validade").css("color", "#3A94FB");
        }
    });

    // CARTA CVV

    $(".cvv").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".cvv").css("color", "#1974CE");
            $(".label-cvv").css("color", "#1974CE");
        }
    });

    $(".cvv").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-cvv").css("color", "red");
        }
    });

    $(".cvv").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".cvv").css("color", "#3A94FB");
            $(".label-cvv").css("color", "#3A94FB");
        }
    });

    // NOME CORRETORA

    $(".corretora").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".corretora").css("color", "#1974CE");
            $(".label-corretora").css("color", "#1974CE");
        }
    });

    $(".corretora").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-corretora").css("color", "red");
        }
    });

    $(".corretora").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".corretora").css("color", "#3A94FB");
            $(".label-corretora").css("color", "#3A94FB");
        }
    });

    // CIDADE

    $(".cidade").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".cidade").css("color", "#1974CE");
            $(".label-cidade").css("color", "#1974CE");
        }
    });

    $(".cidade").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-cidade").css("color", "red");
        }
    });

    $(".cidade").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".cidade").css("color", "#3A94FB");
            $(".label-cidade").css("color", "#3A94FB");
        }
    });

    // ESTADO

    $(".estado").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".estado").css("color", "#1974CE");
            $(".label-estado").css("color", "#1974CE");
        }
    });

    $(".estado").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-estado").css("color", "red");
        }
    });

    $(".estado").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".estado").css("color", "#3A94FB");
            $(".label-estado").css("color", "#3A94FB");
        }
    });

    // NOME

    $(".nome").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".nome").css("color", "#1974CE");
            $(".label-nome").css("color", "#1974CE");
        }
    });

    $(".nome").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-nome").css("color", "red");
        }
    });

    $(".nome").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".nome").css("color", "#3A94FB");
            $(".label-nome").css("color", "#3A94FB");
        }
    });

    // NOME MAE

    $(".nome-mae").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".nome-mae").css("color", "#1974CE");
            $(".label-nome-mae").css("color", "#1974CE");
        }
    });

    $(".nome-mae").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-nome-mae").css("color", "red");
        }
    });

    $(".nome-mae").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".nome-mae").css("color", "#3A94FB");
            $(".label-nome-mae").css("color", "#3A94FB");
        }
    });

    // ESPECIALIDADE

    $(".especialidade").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".especialidade").css("color", "#1974CE");
            $(".label-especialidade").css("color", "#1974CE");
        }
    });

    $(".especialidade").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-especialidade").css("color", "red");
        }
    });

    $(".especialidade").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".especialidade").css("color", "#3A94FB");
            $(".label-especialidade").css("color", "#3A94FB");
        }
    });


    // DEPENDENTES

    $(".dependentes").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".dependentes").css("color", "#1974CE");
            $(".label-dependentes").css("color", "#1974CE");
        }
    });

    $(".dependentes").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-dependentes").css("color", "red");
        }
    });

    $(".dependentes").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".dependentes").css("color", "#3A94FB");
            $(".label-dependentes").css("color", "#3A94FB");
        }
    });

    // NOME DEPENDENTE

    $(".nome-dependente").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".nome-dependente").css("color", "#1974CE");
            $(".label-nome-dependente").css("color", "#1974CE");
        }
    });

    $(".nome-dependente").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-nome-dependente").css("color", "red");
        }
    });

    $(".nome-dependente").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".nome-dependente").css("color", "#3A94FB");
            $(".label-nome-dependente").css("color", "#3A94FB");
        }
    });

    // GRAU PARENTESCO

    $(".parentesco").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".parentesco").css("color", "#1974CE");
            $(".label-parentesco").css("color", "#1974CE");
        }
    });

    $(".parentesco").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-parentesco").css("color", "red");
        }
    });

    $(".parentesco").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".parentesco").css("color", "#3A94FB");
            $(".label-parentesco").css("color", "#3A94FB");
        }
    });

    // telefone

    $(".telefone").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".telefone").css("color", "#1974CE");
            $(".label-telefone").css("color", "#1974CE");
        }
    });


    $(".telefone").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-telefone").css("color", "red");
        }
    });

    $(".telefone").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".telefone").css("color", "#3A94FB");
            $(".label-telefone").css("color", "#3A94FB");
        }
    });

    // Celular

    $(".celular").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".celular").css("color", "#1974CE");
            $(".label-celular").css("color", "#1974CE");
        }
    });


    $(".celular").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-celular").css("color", "red");
        }
    });


    $(".celular").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".celular").css("color", "#3A94FB");
            $(".label-celular").css("color", "#3A94FB");
        }
    });

    // CEP

    $(".cep").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".cep").css("color", "#1974CE");
            $(".label-cep").css("color", "#1974CE");
        }
    });

    $(".cep").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-cep").css("color", "red");
        }
    });

    $(".cep").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".cep").css("color", "#3A94FB");
            $(".label-cep").css("color", "#3A94FB");
        }
    });

    // RAZAO SOCIAL

    $(".razao-social").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".razao-social").css("color", "#1974CE");
            $(".label-razao-social").css("color", "#1974CE");
        }
    });

    $(".razao-social").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00", "padding": "2px" });
            $(".label-razao-social").css("color", "red");
        }
    });

    $(".razao-social").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".razao-social").css("color", "#3A94FB");
            $(".label-razao-social").css("color", "#3A94FB");
        }
    });

    // endereço
    $(".endereco").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".endereco").css("color", "blue");
            $(".label-endereco").css("color", "blue");
        }
    });

    $(".endereco").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-endereco").css("color", "red");
        }
    });

    $(".endereco").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".endereco").css("color", "#3A94FB");
            $(".label-endereco").css("color", "#3A94FB");
        }
    });

    // numero
    $(".numero").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".numero").css("color", "blue");
            $(".label-numero").css("color", "blue");
            $(".label-numero").css("font-weight", "bold");
        }
    });

    $(".numero").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-numero").css("color", "red");

        }
    });

    $(".numero").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".numero").css("color", "#3A94FB");
            $(".label-numero").css("color", "#3A94FB");
        }
    });

    function validateEmail(email) {
        var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        if (reg.test(email)) {
            return true;
        }

        return false;
    }

    $(".email").focus(function () {

        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".email").css("color", "#1974CE");
            $(".label-email").css("color", "#1974CE");
        }
    });

    $("#emailNaoCadastrado").blur(function () {

        var teste = $("#emailNaoCadastrado").val();

        if (validateEmail(teste)) {
            console.log(teste);
            $(".label-email").css("color", "#3A94FB");
            $(".email").css("color", "#3A94FB");
            $(".email").css("border-color", "#3A94FB");

            return;
        }

        $(".label-email").css("color", "red");
        $(".email").css("color", "red");
        $(".email").css("border-color", "red");

    });

    $(".email").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".email").css("color", "#3A94FB");
            $(".label-email").css("color", "#3A94FB");
        }
    });


    // COMPLEMENTO
    //$(".complemento").focus(function () {
    //    if ($(this).val() == "") {
    //        $(this).css({ "border-color": "blue" });
    //        $(".complemento").css("color", "#1974CE");
    //        $(".label-complemento").css("color", "#1974CE");
    //    }
    //});
    //
    //$(".complemento").blur(function () {
    //    if ($(this).val() == "") {
    //        $(this).css({ "border-color": "#F00" });
    //        $(".label-complemento").css("color", "red");
    //    }
    //});
    //
    //$(".complemento").keyup(function () {
    //    if ($(this).val() != "") {
    //        $(this).css({ "border-color": "#3A94FB" });
    //        $(".complemento").css("color", "#3A94FB");
    //        $(".label-complemento").css("color", "#3A94FB");
    //    }
    //});

    // BAIRRO
    $(".bairro").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".bairro").css("color", "blue");
            $(".label-bairro").css("color", "blue");
        }
    });

    $(".bairro").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-bairro").css("color", "red");
        }
    });

    $(".bairro").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".bairro").css("color", "#3A94FB");
            $(".label-bairro").css("color", "#3A94FB");
        }
    });




 //  // sennha
 //  $(".password").focus(function () {
 //      if ($(this).val() == "") {
 //          $(this).css({ "border-color": "1974CE" });
 //          $(".password").css("color", "#1974CE");
 //          $(".label-password").css("color", "#1974CE");
 //      }
 //  });
 //
 //  // $(".password").blur(function(){
 //  //      if($(this).val() == "")
 //  //          {
 //  //              $(this).css({"border-color" : "#F00"});
 //  //              $(".label-password").css("color", "red");
 //  //          }
 //  //     });
 //
 //  //  $(".password").keyup(function(){
 //  //  if($(this).val() != "")
 //  //      {
 //  //          $(this).css({"border-color" : "#3A94FB"});
 //  //          $(".password").css("color", "#3A94FB");
 //  //          $(".label-password").css("color", "#3A94FB");
 //  //      }
 //  //  });
 //
 //  // sennha corfimar
 //
 //  $(".password-confirm").focus(function () {
 //      if ($(this).val() == "") {
 //          $(this).css({ "border-color": "3A94FB" });
 //          $(".password").css("color", "#1974CE"); // se clicar dentro fica azul
 //          $(".label-password-confirm").css("color", "#1974CE");
 //      }
 //  });
 //
 //  //    $(".password-confirm").blur(function(){
 //  //        if($(this).val() == "" || $(this).val() != $(".password").val())
 //  //            {
 //  //                $(this).css({"border-color" : "#F00"});
 //  //                $(".label-password-confirm").css("color", "red"); // se estiver vazio fica vermelho
 //  //            }
 //  //       });
 //
 //  //    $(".password-confirm").keyup(function(){
 //  //    if($(this).val() != "" && $(this).val() == $(".password").val())
 //  //        {
 //  //            $(this).css({"border-color" : "#3A94FB"});
 //  //            $(".password-confirm").css("color", "#3A94FB");// se nao tiver vazio, fica azul
 //  //            $(".label-password-confirm").css("color", "#3A94FB");
 //  //        }
 //  //    });
 //
 //  $("#senhaCpfTrue").blur(function () {
 //
 //      console.log("executou keyup");
 //
 //      if ($(this).val().length < 8) {
 //          console.log("TesteKeyUp");
 //
 //          $(this).css({ "border-color": "#F00" });
 //          $(".password").css("color", "red");
 //          $(".label-password").css("color", "red");
 //          $(".label-password-confirm-8").css("color", "red");
 //      }
 //      else {
 //          $(this).css({ "border-color": "#3A94FB" });
 //          $(".password").css("color", "#3A94FB");
 //          $(".label-password").css("color", "#3A94FB");
 //          $(".label-password-confirm-8").css("color", "#3A94FB");
 //
 //      }
 //  });
 //
 //
 //
 //
 //
 //  $("#confirmar-senhaCpfTrue").blur(function () {
 //
 //      if ($(this).val() != $("#senhaCpfTrue").val()) {
 //          console.log("Teste Valor incorreto");
 //          $(this).css({ "border-color": "#F00" });
 //          $(".password-confirm").css("color", "red");
 //          $(".label-password-confirm").css("color", "red");
 //
 //      } else {
 //          console.log("Teste Valor correto");
 //          $(this).css({ "border-color": "#3A94FB" });
 //          $(this).css("color", "#3A94FB");// se nao tiver vazio, fica azul
 //          $(".label-password-confirm").css("color", "#3A94FB");
 //      }
 //  });


    // CIDADE

    $(".cidade").focus(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "blue" });
            $(".cidade").css("color", "#1974CE");
            $(".label-cidade").css("color", "#1974CE");
        }
    });

    $(".cidade").blur(function () {
        if ($(this).val() == "") {
            $(this).css({ "border-color": "#F00" });
            $(".label-cidade").css("color", "red");
        }
    });

    $(".cidade").keyup(function () {
        if ($(this).val() != "") {
            $(this).css({ "border-color": "#3A94FB" });
            $(".cidade").css("color", "#3A94FB");
            $(".label-cidade").css("color", "#3A94FB");
        }
    });

});

// BANCOS 

$(".bancos").focus(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "blue" });
        $(".bancos").css("color", "#1974CE");
        $(".label-bancos").css("color", "#1974CE");
    }
});

$(".bancos").blur(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "#F00" });
        $(".label-bancos").css("color", "red");
    }
});

$(".bancos").keyup(function () {
    if ($(this).val() != "") {
        $(this).css({ "border-color": "#3A94FB" });
        $(".bancos").css("color", "#3A94FB");
        $(".bancos").css("color", "#3A94FB");
    }
});

// AGENCIA 

$(".agencia").focus(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "blue" });
        $(".agencia").css("color", "#1974CE");
        $(".label-agencia").css("color", "#1974CE");
    }
});

$(".agencia").blur(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "#F00" });
        $(".label-agencia").css("color", "red");
    }
});

$(".agencia").keyup(function () {
    if ($(this).val() != "") {
        $(this).css({ "border-color": "#3A94FB" });
        $(".agencia").css("color", "#3A94FB");
        $(".agencia").css("color", "#3A94FB");
    }
});

// CONTA-CORRENTE 

$(".conta-corrente").focus(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "blue" });
        $(".conta-corrente").css("color", "#1974CE");
        $(".label-conta-corrente").css("color", "#1974CE");
    }
});

$(".conta-corrente").blur(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "#F00" });
        $(".label-conta-corrente").css("color", "red");
    }
});

$(".conta-corrente").keyup(function () {
    if ($(this).val() != "") {
        $(this).css({ "border-color": "#3A94FB" });
        $(".conta-corrente").css("color", "#3A94FB");
        $(".conta-corrente").css("color", "#3A94FB");
    }
});

// DATA NASCIMENTO

$(".nascimento").focus(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "blue" });
        $(".nascimento").css("color", "#1974CE");
        $(".label-nascimento").css("color", "#1974CE");
    }
});

$(".nascimento").blur(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "#F00" });
        $(".label-nascimento").css("color", "red");
    }
});

$(".nascimento").keyup(function () {
    if ($(this).val() != "") {
        $(this).css({ "border-color": "#3A94FB" });
        $(".nascimento").css("color", "#3A94FB");
        $(".label-nascimento").css("color", "#3A94FB");
    }

});

// SEXO

$(".sexo").focus(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "blue" });
        $(".sexo").css("color", "#1974CE");
        $(".label-sexo").css("color", "#1974CE");
    }
});

$(".sexo").blur(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "#F00" });
        $(".label-sexo").css("color", "red");
    }
});

$(".sexo").keyup(function () {
    if ($(this).val() != "") {
        $(this).css({ "border-color": "#3A94FB" });
        $(".sexo").css("color", "#3A94FB");
        $(".label-sexo").css("color", "#3A94FB");
    }

});

// CHECKBOX

$(".checkbox").focus(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "blue" });
        $(".checkbox").css("color", "#1974CE");
        $(".label-checkbox").css("color", "#1974CE");
    }
});

$(".checkbox").blur(function () {
    if ($(this).val() == "") {
        $(this).css({ "border-color": "#F00" });
        $(".label-checkbox").css("color", "red");
    }
});

$(".checkbox").keyup(function () {
    if ($(this).val() != "") {
        $(this).css({ "border-color": "#3A94FB" });
        $(".checkbox").css("color", "#3A94FB");
        $(".label-checkbox").css("color", "#3A94FB");
    }

});

