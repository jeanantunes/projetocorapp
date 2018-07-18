$(document).ready(function () {

    //setarItensSlick();

    preencherMateriaisDivulgacao();
    
});

function buscarMateriaisDivulgacao(callback, token) {

    $.ajax({
        async: true,
        //url: URLBase + "/corretorservicos/1.0/dashboardPropostaPME/" + statusTodasPropostas + "/" + dadosForca.cpf,
        url: "https://65cc8550-6dac-4e6c-bc80-9b88091f36d5.mock.pstmn.io/materiaisdivulgacao",
        //url: "http://172.16.244.160:8090/materiaisdivulgacao",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": "Bearer " + Token,
            "Postman-Token": "5299ba38-9752-4f3f-93de-5a6adecf1726"
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });
}

function preencherMateriaisDivulgacao() {

    swal({
        title: "Aguarde",
        text: 'Estamos carregando a página',
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

    buscarMateriaisDivulgacao(function (dataMateriais) { //TO DO: adicionar o nome do retorno correto

        var dataMateriais = JSON.parse(dataMateriais);

        $.each(dataMateriais.categorias, function (iCategoria, itemCategoria) {

            let componentTitle = getComponent("titleMateriais");
            componentTitle = componentTitle.replace("{LABEL}", itemCategoria.nome);
            componentTitle = componentTitle.replace("{DESCRICAO}", itemCategoria.descricao);
            $("#conteudoPage").append(componentTitle);

            $.each(itemCategoria.subcategorias, function (iSubcategoria, itemSubcategoria) {

                let subCategoriaMateriais = getComponent("subCategoriaMateriais");
                subCategoriaMateriais = subCategoriaMateriais.replace("{LABEL}", itemSubcategoria.nome);
                $("#conteudoPage").append(subCategoriaMateriais);
                //$("#conteudoPage").append('<div style: "white-space: nowrap;" id="' + itemSubcategoria.nome.replaceAll(" ", "-") + '"></div>');
                
                let idCarousel = itemSubcategoria.nome.replaceAll(" ", "-");

                if (itemSubcategoria.materiaisDivulgacao.length > 0) $("#conteudoPage").append('<div class="carousel" id="' + idCarousel + '"></div>');

                $.each(itemSubcategoria.materiaisDivulgacao, function (iMateriais, itemMateriais) {

                    let boxThumbNail = getComponent("boxMateriaisPlanos");
                    boxThumbNail = boxThumbNail.replace("{IMAGEM}", 'data:' + itemMateriais.tipoConteudo + ';base64, ' + itemMateriais.thumbnail);
                    boxThumbNail = boxThumbNail.replace("{NOME}", itemMateriais.nome);
                    boxThumbNail = boxThumbNail.replace("{CODIGO}", itemMateriais.codigoMaterialDivulgacao);
                    boxThumbNail = boxThumbNail.replace("{NOMEIMAGEM}", itemMateriais.nome);
                    boxThumbNail = boxThumbNail.replace("{CODIGOIMAGEM}", itemMateriais.nome);
                    boxThumbNail = boxThumbNail.replace("{DESCRICAO}", itemMateriais.descricao);
                    
                    //boxThumbNail = boxThumbNail.replace("{METODO}", 'downloadSlick($(this))');
                    $('#' + idCarousel).append(boxThumbNail);

                });

            });

        });

        $('.carousel').slick({
            dots: true,
            infinite: true,
            centerMode: true,
            speed: 700,
            centerPadding: '40px',
            autoPlay: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    autoPlay: true,
                    centerPadding: '40px',
                    speed: 1000,
                    autoplaySpeed: 500
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    autoPlay: true,
                    infinite: true,
                    centerPadding: '40px',
                    dots: true,
                    speed: 1000,
                    autoplaySpeed: 500
                }
            }, {
                breakpoint: 480,
                settings: {
                    autoPlay: true,
                    slidesToShow: 1,
                    autoPlay: true,
                    slidesToScroll: 1,
                    infinite: true,
                    centerPadding: '50px',
                    dots: true,
                    speed: 1000,
                    autoplaySpeed: 500
                }
            }
            ]
        });

        $(".img-materiais").click(function () {

            swal({
                title: "Aguarde",
                text: 'Estamos carregando a imagem',
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

            getImagemFull(function (dataImage) {

                var dataImage = JSON.parse(dataImage);

                let extensao = dataImage.tipoConteudo.split("/")[1];
                let nomeArquivo = dataImage.nome.replace("." + extensao, "").trim();

                console.log(extensao);
                console.log(nomeArquivo);
                $("#imagem").html('<img class="img-responsive center-block imagemDownload" src="' + 'data:' + dataImage.tipoConteudo + ';base64, ' + dataImage.arquivo + '" data-extensao = "' + extensao + '" data-nome = "' +
                    nomeArquivo  + '" />' +

                    '<div><label class="descricaoSlick">' + dataImage.descricao + '</label><div><a class="downloadSlick" onclick="downloadImage()">Download</a></div></div>');

                swal.close();
                $('#myModal').modal('show');
            
            }, "dadada", $(this).data("codigo"))

        });

        downloadSlick();
        swal.close();

    }, "saasdasdasdd");
}

function downloadSlick() {

    $(".downloadSlick").click(function () {

        swal({
            title: "Aguarde",
            text: 'Estamos baixando a imagem',
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

        getImagemFull(function (dataImage) {

            var dataImage = JSON.parse(dataImage);

            ob.gerarArquivo(dataImage.arquivo.trim(), dataImage.nome, dataImage.tipoConteudo.split("/")[1]);
            swal.close();

        }, "dadada", $(this).data("codigo"))

    });
}

function downloadImage() {

    console.log($('.imagemDownload').prop('src'));

    ob.gerarArquivo($('.imagemDownload').prop('src').split(",")[1].trim(), $('.imagemDownload').data('nome'), $('.imagemDownload').data('extensao'));
}

function getImagemFull(callback, token, codigoDaImagem) {

    console.log(token);
    console.log(codigoDaImagem);

    $.ajax({
        async: true,
        //url: URLBase + "/corretorservicos/1.0/dashboardPropostaPME/" + statusTodasPropostas + "/" + dadosForca.cpf,
        url: "https://c42d3c16-88e2-4ec3-b461-495a0af2ebfc.mock.pstmn.io/materialfull",
        //url: "http://172.16.244.160:8090/materialdivulgacao/1",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            //"Authorization": "Bearer " + Token,
            "Postman-Token": "5299ba38-9752-4f3f-93de-5a6adecf1726"
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });
}