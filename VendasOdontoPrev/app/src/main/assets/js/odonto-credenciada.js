function initMap(redeCredenciada) {
    var latlng = { lat: -23.5432147, lng: -46.7356894 };
    mapa(redeCredenciada);
}




function especialidades() {
    callToken(function (dataToken) {
        callEspecialidades(function (dataEspecialidades) {
            console.log(dataEspecialidades);

            var sel = document.getElementById('especs');

            for (var i = 0; i < dataEspecialidades.length; i++) {

                var opt = document.createElement('option');
                console.log(dataEspecialidades[i].descricao);
                opt.setAttribute('value', dataEspecialidades[i].codigo);
                console.log(dataEspecialidades[i].codigo);
                opt.appendChild(document.createTextNode(dataEspecialidades[i].descricao));
                sel.appendChild(opt);
            }

            var especialidade = 1;
            document.getElementById('especs').value = especialidade;

        }, dataToken.access_token);
    });
}

function mapa(abc) {
    var latlng = { lat: -23.5432147, lng: -46.7356894 };
    //initMap(latlng);

    if (abc == null) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: latlng,
            disableDefaultUI: true
        });
    }
    else if (abc != null) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: { lat: parseFloat(abc.dentistas[0].endereco.cidade.latitude), lng: parseFloat(abc.dentistas[0].endereco.cidade.longitude) },
            disableDefaultUI: true
        });

        for (var i = 0; i < abc.dentistas.length; i++) {
            var latlng2 = new google.maps.LatLng((abc.dentistas[i].endereco.cidade.latitude), (abc.dentistas[i].endereco.cidade.longitude));

            var marker = new google.maps.Marker({
                position: latlng2,
                map: map,
                center: latlng2
            });
        }
    }
}

var t;

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
        },
    });
}

function callEspecialidades(callback, token) {

    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/redecredenciada/1.0/especialidades",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
        },
        success: function (resp) {
            callback(resp)
        },
    });
}

function callCidade(callback, token, uf, codigoCidade) {

    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/cep/1.1/cidades/uf?uf=" + uf + "&codigoCidade=" + codigoCidade,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache",
            "Content-Type": "application/json"
        },
        success: function (resp) {

            callback(resp)
        },
    });
}

function callBairro(callback, token, uf, codigoCidade, codigoBeneficiario) {


    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/cep/1.1/bairros?uf=" + uf + "&codigoCidade=" + codigoCidade + "&codigoBeneficiario=" + codigoBeneficiario,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache",
            "Postman-Token": "c7575dd9-1908-dcf4-12eb-9091693dd541"

        },
        success: function (resp) {

            callback(resp)

        },
    });
}

function callRedeCredenciada(callback, token, CodBeneficiario, uf, codigoEspecialidade, codigoMicroregiao, privian, codigoMarca, codigoBairro) {


    $.ajax({
        async: true,
        url: "https://api.odontoprev.com.br:8243/dcms/redecredenciada/1.0/dentistas?codigoBeneficiario=" + CodBeneficiario
        + "&siglaUf=" + uf + "&codigoEspecialidade=" + codigoEspecialidade + "&codigoRegiao=" + codigoMicroregiao + "&privian=" + privian + "&codigoMarca=" +
        codigoMarca + "&codigoBairro=" + codigoBairro,
        //url: "https://api.odontoprev.com.br:8243/cep/1.1/bairros?uf=" + uf + "&codigoCidade=" + codigoCidade + "&codigoBeneficiario=" + codigoBeneficiario,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache"
        },
        success: function (resp) {

            callback(resp)

        },
    });
}


function removerAcentos(newStringComAcento) {
    var string = newStringComAcento;
    var mapaAcentosHex = {
        a: /[\xE0-\xE6]/g,
        e: /[\xE8-\xEB]/g,
        i: /[\xEC-\xEF]/g,
        o: /[\xF2-\xF6]/g,
        u: /[\xF9-\xFC]/g,
        c: /\xE7/g,
        n: /\xF1/g
    };

    for (var letra in mapaAcentosHex) {
        var expressaoRegular = mapaAcentosHex[letra];
        string = string.replace(expressaoRegular, letra);
    }

    return string;
}

function callTokenBack() {

    ob.logString("Foi");
    callToken(function (dataToken) {
        ob.logString("Foi dnv");
    });
}


$(document).ready(function () {
    var t1;

    $("#btnTeste").click(function (e) {

        var cep = $("#cep").val().replace(/\D/g, '');

        callToken(function (dataToken) {
            t1 = dataToken;

            callCep(function (dataCep) {
                var teste = removerAcentos(dataCep[0].cidade);
                teste = teste.toUpperCase();


                callCidade(function (dataCidade) {
                    var result = $.grep(dataCidade, function (e) { return e.nome == removerAcentos(dataCep[0].cidade).toUpperCase(); });

                    var CodBeneficiario = "375796040";


                    callBairro(function (dataBairro) {


                        var codigoEspecialidade = $('#especs').val();
                        var privian = "FALSE";
                        var codigoMarca = "1";

                        //var bairro = dataCep[0].bairro.toUpperCase();

                        var codigoBairro = $.grep(dataBairro, function (e) { return e.nome == dataCep[0].bairro.toUpperCase() });

                        console.log(codigoBairro);
                        console.log(result[0].codigoMicroregiao);


                        if (codigoBairro.length == 0) {
                            callRedeCredenciada(function (dataRedeCredenciada) {
                                console.log(dataRedeCredenciada);
                                initMap(dataRedeCredenciada);

                            }, dataToken.access_token, CodBeneficiario, dataCep[0].estado, codigoEspecialidade, result[0].codigoMicroregiao, privian, codigoMarca, "0");

                        }
                        else if (codigoBairro != null) {
                            callRedeCredenciada(function (dataRedeCredenciada) {
                                initMap(dataRedeCredenciada);
                            }, dataToken.access_token, CodBeneficiario, dataCep[0].estado, codigoEspecialidade, result[0].codigoMicroregiao, privian, codigoMarca, codigoBairro[0].codigo);
                        }

                    }, dataToken.access_token, dataCep[0].estado, result[0].codigoCidade, CodBeneficiario);

                }, dataToken.access_token, dataCep[0].estado, dataCep[0].idCidade);

            }, dataToken.access_token, cep);

        });
    });
});


$(document).ready(function () {

    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#bairro").val("");
        $("#cidade").val("");
    }

    var typingTimer; //timer identifier
    var doneTypingInterval = 500; //time in ms, 5 second for example

    //on keyup, start the countdown
    $('#cepRedeCredenciada').keyup(function () {
        clearTimeout(typingTimer);
        if ($('#cepRedeCredenciada').val) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
    });

    function doneTyping() {
        validar();
    }

    function validar() {
        //Nova variável "cep" somente com dígitos.
        var cep = $('#cepRedeCredencida').val().replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "" && cep.length == 8) {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                $("#bairro").val("");
                $("#cidade").val("");

                $("#cepRedeCredenciada").val("00000-000");
                callToken(function (dataToken) {
                    callCep(function (dataCep) {
                        $("#cepRedeCredenciada").val("00000-000");
                        $("#bairroRedeCredenciada").val(dataCep[0].bairro);
                        $("#cidadeRedeCredenciada").val(dataCep[0].cidade);

                    }, dataToken.access_token, cep);
                });

                //    //Consulta o webservice viacep.com.br/
                //    $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados)
                //    {
                //        if (!("erro" in dados)) {
                //        //Atualiza os campos com os valores da consulta.
                //            $("#rua").val(dados.logradouro);
                //            $("#bairro").val(dados.bairro);
                //            $("#cidade").val(dados.localidade);
                //            $("#uf").val(dados.uf);
                //        } //end if.
                //        else {
                //            //CEP pesquisado não foi encontrado.
                //            limpa_formulário_cep();
                //            alert("CEP não encontrado.");
                //        }
                //    });




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