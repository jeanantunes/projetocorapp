$(document).ready(function () {
    especialidades();
    estados();

    $("#closeModalRedeCredenciada").click(function () {

        $('#myModal').modal('toggle');

    });

    $("#map").html('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYhoOl5Kervzx0pOvSAL8qIIWcPHg5Zyk&callback=mapa"></script>');

    $("#compartilharCard").click(function () {

        //let compartilharCard = "";
        //
        //compartilharCard += $("#nomeDentista").html();
        //compartilharCard +=$("#croDentista").html();
        //compartilharCard +=($("#especialidadeDentista").html());
        //compartilharCard +=($("#enderecoDentista").html());
        //compartilharCard +=($("#cepDentista").html());
        //compartilharCard +=($("#telefoneDentista").html());
        //compartilharCard +=($("#tipoPessoaDentista").html());
        //
        ob.compartilharString($(this).val());

    });

    $("#copiarLink").click(function () {

        let teste = "teste 123";
        ob.clipboardText(teste);
    });

});

function initMap(redeCredenciada) {
    var latlng = { lat: -23.5432147, lng: -46.7356894 };
    mapa(redeCredenciada);
}

var t;

var autoCompleteCidades = [];
var dadosCidades = [];
var autoCompleteBairros = [];
var dadosBairros = [];

function callEspecialidades(callback, token) {

    swal({
        title: "Aguarde",
        text: 'Estamos buscando as especialidades',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/icon-aguarde.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    })

    $.ajax({
        async: true,
        url: URLRedeCredenciada + "/redecredenciada/1.0/especialidades",
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
        imageUrl: "img/icon-aguarde.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    })

    $.ajax({
        async: true,
        url: URLRedeCredenciada + "/cep/1.1/estados",
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
        text: 'Estamos buscando as cidades',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/icon-aguarde.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    })

    $.ajax({
        async: true,
        url: URLRedeCredenciada + "/cep/1.1/cidades/uf?uf=" + uf,
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
        text: 'Estamos buscando os bairros',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/icon-aguarde.gif",
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    })
    
    var codigoBeneficiario = "375796040";

    $.ajax({
        async: true,
        url: URLRedeCredenciada + "/cep/1.1/bairros?uf=" + uf + "&codigoCidade=" + codigoCidade + "&codigoBeneficiario=" + codigoBeneficiario,
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
        text: 'Estamos procurando dentistas',
        content: "input",
        showCancelButton: false,
        showConfirmButton: false,
        imageUrl: "img/icon-aguarde.gif",
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

$('#bairros').blur(function () {

    $('#bairros').val($('#bairros').val().trim());

});

$("#estados").change(function () {

    $('#cidades').val("");
    $('#bairros').val("");

    dadosCidades = [];

    autoCompleteCidades = [];

    var uf = $("#estados").val().trim();

    callTokenProd(function (dataToken) {

        callCidade(function (dataCidade) {

            //var sel = document.getElementById('cidades');
            //
            //var opt = document.createElement('option');
            ////console.log(dataEspecialidades[i].descricao);
            //opt.setAttribute('value', "selecione");
            ////console.log(dataEspecialidades[i].codigo);
            //var selecione = "Selecione...";
            //opt.appendChild(document.createTextNode(selecione));
            //sel.appendChild(opt);

            autoCompleteCidades = [];
            dadosCidades = [];
            autoCompleteBairros = [];
            dadosBairros = [];

            for (var i = 0; i < dataCidade.length; i++) {

                //if (dataCidade[i].codigoUf == 0) continue

                //var opt = document.createElement('option');
                ////console.log(dataEspecialidades[i].descricao);
                //opt.setAttribute('value', dataCidade[i].codigoCidade);
                //opt.setAttribute('data-id', dataCidade[i].codigoMicroregiao);
                ////console.log(dataEspecialidades[i].codigo);
                //opt.appendChild(document.createTextNode(dataCidade[i].nome));
                //

                var cidades = new Object();
                cidades.nome = removerAcentos(dataCidade[i].nome.toUpperCase().trim());
                cidades.codigoMicroregiao = dataCidade[i].codigoMicroregiao;
                cidades.codigoCidade = dataCidade[i].codigoCidade;

                dadosCidades.push(cidades);

                autoCompleteCidades.push(removerAcentos(dataCidade[i].nome.toUpperCase()).trim());
                //
                //sel.appendChild(opt);
            }

            $("#cidades").autocomplete({
                source: autoCompleteCidades,
                minLength: 0,
                search: function (event, ui) {
                    $(this).val(removerAcentos($(this).val().toUpperCase()));
                }
            }).focus(function () {

                $(this).autocomplete("search");
            });

            //document.getElementById('cidades').value = "selecione";

            swal.close();
        }, dataToken.access_token, uf);
    });
});

$("#cidades").keyup(function () {

    if ($("#estados").val() == "selecione") swal("Ops!", "Escolha um estado", "info");

});

$("#cidades").focus(function () {
   
});

$("#cidades").blur(function () {

    if ($("#cidades").val() == "") return;

    var cidade = dadosCidades.filter(function (x) { if (x.nome == $("#cidades").val().trim()) { return x.nome; } });

    if (cidade.length == 0) return;

    $('#bairros').val("");

    var codigoCidade = cidade[0].codigoCidade;//$("#cidades").val();
    var uf = $("#estados").val().trim();

    callTokenProd(function (dataToken) {

        callBairro(function (dataBairro) {

            if (dataBairro.status == 422) {

                $('#bairros').val("");
                return;
            }

            //var opt = document.createElement('option');
            ////console.log(dataEspecialidades[i].descricao);
            //opt.setAttribute('value', "selecione");
            ////console.log(dataEspecialidades[i].codigo);
            //var selecione = "Selecione...";
            //opt.appendChild(document.createTextNode(selecione));
            //sel.appendChild(opt);

            autoCompleteBairros = [];
            dadosBairros = [];

            for (var i = 0; i < dataBairro.length; i++) {


                console.log(dataBairro.length);
                var bairros = new Object();

                bairros.nome = removerAcentos(dataBairro[i].nome.replace("JD", "JARDIM").toUpperCase()).trim();
                bairros.codigo = dataBairro[i].codigo;

                dadosBairros.push(bairros);

                autoCompleteBairros.push(removerAcentos(dataBairro[i].nome.replace("JD", "JARDIM").toUpperCase()).trim());

                //var opt = document.createElement('option');
                //console.log(dataEspecialidades[i].descricao);
                //opt.setAttribute('value', dataBairro[i].codigo);
                //console.log(dataEspecialidades[i].codigo);
                //opt.appendChild(document.createTextNode(dataBairro[i].nome));
                //sel.appendChild(opt);
            }

            $("#bairros").blur();

            $("#bairros").autocomplete({
                source: autoCompleteBairros,
                minLength: 0,
                search: function (event, ui) {
                    $(this).val(removerAcentos($(this).val().toUpperCase()));
                }

            }).focus(function () {

                $(this).autocomplete("search");
                });

            //document.getElementById('bairros').value = "selecione";

            swal.close();

        }, dataToken.access_token, uf, codigoCidade);
    });
});

$("#cidades").click(function () {

    dadosBairros = [];

});

$("#btnBuscar").click(function () {

    if ($("#estados").val() == "selecione") {

        swal("Ops!", "Selecione um estado", "info");
        return;
    }

    if ($('#cidades').val() == "") {

        swal("Ops!", "Digite uma cidade", "info");
        return;
    }

    if ($('#bairros').val() == "" && $('#cidades').val() == "SAO PAULO") {
    
        swal("Ops!", "Digite uma cidade", "info");
        return;
    }

    var codigoEspecialidade = $('#especs').val();
    var privian = "FALSE";
    var codigoMarca = "1";
    var codBeneficiario = "375796040";
    var estado = $("#estados").val();

    var bairro = dadosBairros.filter(function (x) { if (x.nome == $("#bairros").val().trim()) { return x.nome; } });
    var cidade = dadosCidades.filter(function (x) { if (x.nome == $("#cidades").val().trim()) { return x.nome; } });

    var codBairro = bairro.length > 0 ? bairro[0].codigo : "selecione";   //$("#bairros").val(); 

    var codigoMicroregiao = cidade[0].codigoMicroregiao;//$("#cidades").find(':selected').data('id');
    var codCidade = cidade[0].codigoCidade; //$("#cidades").val();

    callTokenProd(function (dataToken) {

        if (codBairro == "selecione") {
            callRedeCredenciada(function (dataRedeCredenciada) {
                console.log(dataRedeCredenciada);

                initMap(dataRedeCredenciada);



            }, dataToken.access_token, codBeneficiario, estado, codigoEspecialidade, codigoMicroregiao, privian, codigoMarca, "0", codCidade);

        }
        else if (codBairro != undefined) {
            callRedeCredenciada(function (dataRedeCredenciada) {

                console.log(dataRedeCredenciada);
                initMap(dataRedeCredenciada);
               
            }, dataToken.access_token, codBeneficiario, estado, codigoEspecialidade, codigoMicroregiao, privian, codigoMarca, codBairro, codCidade);
        } 
        else if (codBairro == 0) {
            callRedeCredenciada(function (dataRedeCredenciada) {

                console.log(dataRedeCredenciada);
                initMap(dataRedeCredenciada);

            }, dataToken.access_token, codBeneficiario, estado, codigoEspecialidade, codigoMicroregiao, privian, codigoMarca, "0", codCidade);
        } 


    });
});

function mapa(dataDentistas) {

    var latlng = { lat: -23.5432147, lng: -46.7356894 };
    var selectedMarker;

    //initMap(latlng);

    if (dataDentistas == null) {
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: latlng,
            disableDefaultUI: true
        });
    }
    else if (dataDentistas != null) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
            center: { lat: parseFloat(dataDentistas.dentistas[0].endereco.cidade.latitude), lng: parseFloat(dataDentistas.dentistas[0].endereco.cidade.longitude) },
            disableDefaultUI: true
        });

        var dentistas = [];

        for (var i = 0; i < dataDentistas.dentistas.length; i++) {

            var filter = dentistas.filter(function (x) { return x == dataDentistas.dentistas[i].codigoDentista });

            if (filter.length > 0) continue;

            dentistas.push(dataDentistas.dentistas[i].codigoDentista);

            var latlng2 = new google.maps.LatLng((dataDentistas.dentistas[i].endereco.cidade.latitude), (dataDentistas.dentistas[i].endereco.cidade.longitude));

            var marker = new google.maps.Marker({
                position: latlng2,
                map: map,
                center: latlng2,
                icon: 'img/pin_azul.png'
            });

            var infowindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {

                    if (selectedMarker) {
                        selectedMarker.setIcon('img/pin_azul.png');
                    }

                    marker.setIcon('img/pin_rosa.png');
                    selectedMarker = marker;


                    //console.log("Dentro da funcão Click:  " + contentString[i]);
                    //infowindow.setContent('<div><strong>' + dataDentistas.dentistas[i].nomeDentista + '</strong><br>');
                    //infowindow.open(map, marker);
                    let dadosDentista = "";
                                    
                    $("#nomeDentista").html("Dr(a). " + dataDentistas.dentistas[i].nomeDentista);
                    dadosDentista += "Dr(a). " + dataDentistas.dentistas[i].nomeDentista + "\n";

                    $("#croDentista").html("CRO: " + dataDentistas.dentistas[i].numeroCRO);
                    dadosDentista += "CRO " + dataDentistas.dentistas[i].numeroCRO + "\n\n" + "Endereço\n";

                    dadosDentista += dataDentistas.dentistas[i].endereco.enderecoCompleto + "-" +
                        dataDentistas.dentistas[i].endereco.bairro + "\n";

                    dadosDentista += "CEP " + dataDentistas.dentistas[i].endereco.cep + " " +
                        dataDentistas.dentistas[i].endereco.cidade.nome + '\\' +
                        dataDentistas.dentistas[i].endereco.cidade.siglaUF + "\n\n";

                    dadosDentista += "Contato\n";

                    dadosDentista += dataDentistas.dentistas[i].numeroFone + "\n\n";

                    dadosDentista += "Especialidades\n";

                    dadosDentista += dataDentistas.dentistas[i].especialidade.descricaoEspecialidade;

                    $("#enderecoDentista").html(dataDentistas.dentistas[i].endereco.enderecoCompleto);
                    $("#cepDentista").html(dataDentistas.dentistas[i].endereco.cep);
                    $("#telefoneDentista").html(dataDentistas.dentistas[i].numeroFone);
                    $("#tipoPessoaDentista").html(dataDentistas.dentistas[i].tipoPrestador);

                    var especialidades = dataDentistas.dentistas[i].especialidade.descricaoEspecialidade.split(",");
                    //dadosDentista += dataDentistas.dentistas[i].especialidade.descricaoEspecialidade;

                    var appendEspecs = "";
                    $("#especialidadeDentista").html("");
                    $.each(especialidades, function (i, item) {

                        $("#especialidadeDentista").append('<label class="labelBold marginEspecsRede" style="color:gray">' + item + '</label>');

                    });

                    $("#compartilharCard").val(dadosDentista);
                    $('#myModal').modal('show');
                }
            })(marker, i));
        }
    }
}

