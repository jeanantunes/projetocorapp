

$(document).ready(function () {

    especialidades();
    estados();

});

function initMap(redeCredenciada) {
    var latlng = { lat: -23.5432147, lng: -46.7356894 };
    mapa(redeCredenciada);
}

var t;

function callEspecialidades(callback, token) {

    swal({
        title: "Aguarde",
        text: 'Estamos buscando as especialidades',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/load.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    })

    $.ajax({
        async: true,
        url: URLBase + "/redecredenciada/1.0/especialidades",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: function (resp) {

            callback(resp)
        },
    });
}

function callEstados(callback, token) {

    swal({
        title: "Aguarde",
        text: 'Estamos buscando os estados',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/load.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    })

    $.ajax({
        async: true,
        url: URLBase + "/cep/1.1/estados",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: function (resp) {
            
            callback(resp)
        },
    });
}

function callCidade(callback, token, uf) {

    swal({
        title: "Aguarde",
        text: 'Estamos procurando as cidades',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/load.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    })

    $.ajax({
        async: true,
        url: URLBase + "/cep/1.1/cidades/uf?uf=" + uf,
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        success: function (resp) {
            callback(resp)
        },
    });
}

function callBairro(callback, token, uf, codigoCidade) {

    swal({
        title: "Aguarde",
        text: 'Estamos procurando dentistas',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/load.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    })
    
    var codigoBeneficiario = "375796040";

    $.ajax({
        async: true,
        url: URLBase + "/cep/1.1/bairros?uf=" + uf + "&codigoCidade=" + codigoCidade + "&codigoBeneficiario=" + codigoBeneficiario,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        success: function (resp) {
            callback(resp)
        },
        error: function (xhr) {
            swal.close();
            callback(xhr)
            
        }
    });
}

function especialidades() {
    callTokenProd(function (dataToken) {

        callEspecialidades(function (dataEspecialidades) {
            //console.log(dataEspecialidades);
            
            var sel = document.getElementById('especs');

            for (var i = 0; i < dataEspecialidades.length; i++) {

                var opt = document.createElement('option');
                //console.log(dataEspecialidades[i].descricao);
                opt.setAttribute('value', dataEspecialidades[i].codigo);
                //console.log(dataEspecialidades[i].codigo);
                opt.appendChild(document.createTextNode(dataEspecialidades[i].descricao));
                sel.appendChild(opt);
            }

            var especialidade = 0;

            var opt = document.createElement('option');
            //console.log(dataEspecialidades[i].descricao);
            opt.setAttribute('value', 0);
            //console.log(dataEspecialidades[i].codigo);
            var selecione = "Todas";
            opt.appendChild(document.createTextNode(selecione));
            sel.appendChild(opt);

            document.getElementById('especs').value = especialidade;

            swal.close();

        }, dataToken.access_token);
    });
}

function callRedeCredenciada(callback, token, CodBeneficiario, uf, codigoEspecialidade, codigoMicroregiao, privian, codigoMarca, codigoBairro, codigoCidade) {

    swal({
        title: "Aguarde",
        text: 'Estamos procurando dentitas',
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

    if (codigoCidade == undefined) {

        var urlTratada = "dentistas?codigoBeneficiario=" + CodBeneficiario + "&siglaUf=" + uf + "&codigoEspecialidade=" + codigoEspecialidade + "&codigoRegiao=" + codigoMicroregiao + "&privian=" + privian + "&codigoMarca=" + codigoMarca + "&codigoBairro=" + codigoBairro;
    }
    else if (codigoBairro == undefined) {

        var urlTratada = "dentistas?codigoBeneficiario=" + CodBeneficiario + "&siglaUf=" + uf + "&codigoEspecialidade=" + codigoEspecialidade + "&codigoRegiao=" + codigoMicroregiao + "&privian=" + privian + "&codigoMarca=" + codigoMarca + "&codigoCidade=" + codigoCidade;

    }
    else{
        var urlTratada = "dentistas?codigoBeneficiario=" + CodBeneficiario + "&siglaUf=" + uf + "&codigoEspecialidade=" + codigoEspecialidade + "&codigoRegiao=" + codigoMicroregiao + "&privian=" + privian + "&codigoMarca=" + codigoMarca + "&codigoBairro=" + codigoBairro + "&codigoCidade=" + codigoCidade;
    }

    $.ajax({
        async: true,
        url: URLBase + "/dcms/redecredenciada/1.0/" + urlTratada,
        //url: "https://api.odontoprev.com.br:8243/cep/1.1/bairros?uf=" + uf + "&codigoCidade=" + codigoCidade + "&codigoBeneficiario=" + codigoBeneficiario,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token,
            "Cache-Control": "no-cache"
        },

        success: function (resp) {
            swal.close();
            callback(resp)

        },
        error: function (xhr) {
            swal(":(", "Nenhum dentista encontrado", "info");
        }
    });
}

function estados() {
    callTokenProd(function (dataToken) {

        callEstados(function (dataEstados) {
            //console.log(dataEspecialidades);

            var sel = document.getElementById('estados');

            var opt = document.createElement('option');
            //console.log(dataEspecialidades[i].descricao);
            opt.setAttribute('value', "selecione");
            //console.log(dataEspecialidades[i].codigo);
            var selecione = "Selecione...";
            opt.appendChild(document.createTextNode(selecione));
            sel.appendChild(opt);

            for (var i = 0; i < dataEstados.length; i++) {

                if (dataEstados[i].codigoUf == 0) continue

                var opt = document.createElement('option');
                //console.log(dataEspecialidades[i].descricao);
                opt.setAttribute('value', dataEstados[i].uf);
                //console.log(dataEspecialidades[i].codigo);
                opt.appendChild(document.createTextNode(dataEstados[i].nome));
                sel.appendChild(opt);
            }

            document.getElementById('estados').value = "selecione";


            swal.close();
        }, dataToken.access_token);
    });
}

$("#estados").change(function () {

    $('#cidades').empty();
    $('#bairros').empty();

    var uf = $("#estados").val();

    callTokenProd(function (dataToken) {

        callCidade(function (dataCidade) {

            var sel = document.getElementById('cidades');

            var opt = document.createElement('option');
            //console.log(dataEspecialidades[i].descricao);
            opt.setAttribute('value', "selecione");
            //console.log(dataEspecialidades[i].codigo);
            var selecione = "Selecione...";
            opt.appendChild(document.createTextNode(selecione));
            sel.appendChild(opt);

            for (var i = 0; i < dataCidade.length; i++) {

                //if (dataCidade[i].codigoUf == 0) continue

                var opt = document.createElement('option');
                //console.log(dataEspecialidades[i].descricao);
                opt.setAttribute('value', dataCidade[i].codigoCidade);
                opt.setAttribute('data-id', dataCidade[i].codigoMicroregiao);
                //console.log(dataEspecialidades[i].codigo);
                opt.appendChild(document.createTextNode(dataCidade[i].nome));
                sel.appendChild(opt);
            }

            document.getElementById('cidades').value = "selecione";

            swal.close();
        }, dataToken.access_token, uf);
    });
});

$("#cidades").change(function () {

    $('#bairros').empty();

    var codigoCidade = $("#cidades").val();
    var uf = $("#estados").val();

    callTokenProd(function (dataToken) {

        callBairro(function (dataBairro) {

            var sel = document.getElementById('bairros');

            if (dataBairro.status == 422) {

                var opt = document.createElement('option');
                //console.log(dataEspecialidades[i].descricao);
                opt.setAttribute('value', 0);
                //console.log(dataEspecialidades[i].codigo);
                var selecione = "TODOS";
                opt.appendChild(document.createTextNode(selecione));
                sel.appendChild(opt);

                return;
            }

            var opt = document.createElement('option');
            //console.log(dataEspecialidades[i].descricao);
            opt.setAttribute('value', "selecione");
            //console.log(dataEspecialidades[i].codigo);
            var selecione = "Selecione...";
            opt.appendChild(document.createTextNode(selecione));
            sel.appendChild(opt);

            for (var i = 0; i < dataBairro.length; i++) {

                //if (dataCidade[i].codigoUf == 0) continue

                var opt = document.createElement('option');
                //console.log(dataEspecialidades[i].descricao);
                opt.setAttribute('value', dataBairro[i].codigo);
                //console.log(dataEspecialidades[i].codigo);
                opt.appendChild(document.createTextNode(dataBairro[i].nome));
                sel.appendChild(opt);
            }

            document.getElementById('bairros').value = "selecione";

            swal.close();

        }, dataToken.access_token, uf, codigoCidade);
    });
});

$("#btnBuscar").click(function () {

    if ($("#estados").val() == "selecione") {

        swal("Ops!", "Selecione um estado", "info");
        return;
    }

    if ($('#cidades').val() == "selecione") {

        swal("Ops!", "Selecione uma cidade", "info");
        return;
    }

    var codigoEspecialidade = $('#especs').val();
    var privian = "FALSE";
    var codigoMarca = "1";
    var codBeneficiario = "375796040";
    var estado = $("#estados").val();
    var codBairro = $("#bairros").val();
    var codigoMicroregiao = $("#cidades").find(':selected').data('id');
    var codCidade = $("#cidades").val();

    callTokenProd(function (dataToken) {

        if (codBairro == "selecione") {
            callRedeCredenciada(function (dataRedeCredenciada) {
                console.log(dataRedeCredenciada);

                initMap(dataRedeCredenciada);

        

            }, dataToken.access_token, codBeneficiario, estado, codigoEspecialidade, codigoMicroregiao, privian, codigoMarca, "0", codCidade);

        }
        else if (codBairro != undefined) {
            callRedeCredenciada(function (dataRedeCredenciada) {


                initMap(dataRedeCredenciada);
               
            }, dataToken.access_token, codBeneficiario, estado, codigoEspecialidade, codigoMicroregiao, privian, codigoMarca, codBairro, codCidade);
        } 
        else if (codBairro == 0) {
            callRedeCredenciada(function (dataRedeCredenciada) {


                initMap(dataRedeCredenciada);

            }, dataToken.access_token, codBeneficiario, estado, codigoEspecialidade, codigoMicroregiao, privian, codigoMarca, "0", codCidade);
        } 


    });
});


