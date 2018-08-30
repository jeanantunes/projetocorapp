$(document).ready(function () {

    preencherMateriaisDivulgacao();   
    
});

function buscarMateriaisDivulgacao(callback, token) {

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/materiaisdivulgacao/app",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
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
        imageUrl: "img/icon-aguarde.gif",
        showCancelButton: false,
        showConfirmButton: false,
        icon: "info",
        button: {
            text: "...",
            closeModal: false,
        },
    });

    callTokenVendas(function (dataToken) {

        if (dataToken.status != undefined) {

            swal({
                title: "Ops",
                text: "Erro no carregamento da página, tente novamente.",
                type: "error",
                closeOnConfirm: false
            }, function () {

                window.location = "logado.html";

                });

            return;

        }

        buscarMateriaisDivulgacao(function (dataMateriais) {

            if (dataMateriais.status != undefined) {

                swal({
                    title: "Ops",
                    text: "Erro no carregamento da página, tente novamente.",
                    type: "error",
                    closeOnConfirm: false
                }, function () {

                    window.location = "logado.html";

                });

                return;
            }

            $.each(dataMateriais.categoriasMaterialDivulgacao, function (iCategoria, itemCategoria) {

                let componentTitle = getComponent("titleMateriais");
                componentTitle = componentTitle.replace("{LABEL}", itemCategoria.nome);
                componentTitle = componentTitle.replace("{DESCRICAO}", itemCategoria.descricao);
                $("#conteudoPage").append(componentTitle);

                $.each(itemCategoria.subCategoriasMaterialDivulgacao, function (iSubcategoria, itemSubcategoria) {

                    let subCategoriaMateriais = getComponent("subCategoriaMateriais");
                    subCategoriaMateriais = subCategoriaMateriais.replace("{LABEL}", itemSubcategoria.nome);
                    $("#conteudoPage").append(subCategoriaMateriais);

                    let idCarousel = itemSubcategoria.nome.replaceAll(" ", "-");

                    if (itemSubcategoria.materiaisDivulgacao.length > 0) $("#conteudoPage").append('<div class="carousel" id="' + idCarousel + '"></div>');

                    $.each(itemSubcategoria.materiaisDivulgacao, function (iMateriais, itemMateriais) {

                        let boxThumbNail = getComponent("boxMateriaisPlanos");
                        boxThumbNail = boxThumbNail.replace("{IMAGEM}", 'data:' + itemMateriais.tipoConteudo + ';base64, ' + itemMateriais.thumbnail);
                        boxThumbNail = boxThumbNail.replace("{NOME}", itemMateriais.nome);
                        boxThumbNail = boxThumbNail.replace("{CODIGO}", itemMateriais.codigoMaterialDivulgacao);
                        boxThumbNail = boxThumbNail.replace("{NOMEIMAGEM}", itemMateriais.nome);
                        boxThumbNail = boxThumbNail.replace("{CODIGOIMAGEM}", itemMateriais.codigoMaterialDivulgacao);
                        boxThumbNail = boxThumbNail.replace("{DESCRICAO}", itemMateriais.descricao);

                        $('#' + idCarousel).append(boxThumbNail);

                    });

                });

            });

            $('.carousel').slick({
                dots: true,
                infinite: true,
                centerMode: true,
                speed: 700,
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
                        dots: true,
                        speed: 1000,
                        autoplaySpeed: 500
                    }
                }
                ]
            });

            $(".img-materiais").click(function () {

                let codigoImagem = $(this).data("codigo");

                swal({
                    title: "Aguarde",
                    text: 'Estamos carregando a imagem',
                    content: "input",
                    imageUrl: "img/icon-aguarde.gif",
                    showCancelButton: false,
                    showConfirmButton: false,
                    icon: "info",
                    button: {
                        text: "...",
                        closeModal: false,
                    },
                });

                callTokenVendas(function (dataToken) {

                    if (dataToken.status == undefined) {

                        getImagemFull(function (dataImage) {

                            if (dataImage.status == undefined) {

                                let extensao = dataImage.tipoConteudo.split("/")[1];
                                let nomeArquivo = dataImage.nome.replace("." + extensao, "").trim();

                                $("#imagem").html('<img class="img-responsive center-block imagemDownload" src="' + 'data:' + dataImage.tipoConteudo + ';base64, ' + dataImage.arquivo + '" data-extensao = "' + extensao + '" data-nome = "' +
                                    nomeArquivo + '" />' +

                                    '<div><label class="descricaoSlick">' + dataImage.descricao + '</label><div><a class="downloadSlick" onclick="downloadImage()">Download</a></div></div>');

                                swal.close();
                                $('#myModal').modal('show');
                                
                            } else {

                                swal("Ops!", "Erro no carregamento da imagem", "error");
                                return;

                            }

                        }, dataToken.access_token, codigoImagem)

                    } else {

                        swal("Ops!", "Erro no carregamento da imagem", "error");
                        return;

                    }

                });

            });

            downloadSlick();
            swal.close();

        }, dataToken.access_token);

    });
}

function downloadSlick() {

    $(".downloadSlick").click(function () {

        swal({
            title: "Aguarde",
            text: 'Estamos baixando a imagem',
            content: "input",
            imageUrl: "img/icon-aguarde.gif",
            showCancelButton: false,
            showConfirmButton: false,
            icon: "info",
            button: {
                text: "...",
                closeModal: false,
            },
        });

        let codigoImagem = $(this).data("codigo");

        callTokenVendas(function (dataToken) {

            if (dataToken.status == undefined) {

                getImagemFull(function (dataImage) {

                    if (dataImage.status == undefined) {

                        ob.gerarArquivo(dataImage.arquivo.trim(), dataImage.nome, dataImage.tipoConteudo.split("/")[1]);
                        swal.close();

                    } else {

                        swal("Ops!", "Erro no carregamento da imagem", "error");
                        return;

                    }

                }, dataToken.access_token, codigoImagem)

            } else {

                swal("Ops!", "Erro no carregamento da imagem", "error");
                return;

            }

        });

    });
}

function downloadImage() {

    ob.gerarArquivo($('.imagemDownload').prop('src').split(",")[1].trim(), $('.imagemDownload').data('nome'), $('.imagemDownload').data('extensao'));

}

function getImagemFull(callback, token, codigoDaImagem) {

    $.ajax({
        async: true,
        url: URLBase + "/corretorservicos/1.0/materialdivulgacao/" + codigoDaImagem,
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        success: function (resp) {
            callback(resp);
        },
        error: function (xhr) {
            callback(xhr);
        }
    });
}