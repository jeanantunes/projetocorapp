$(document).ready(function () {

    //setarItensSlick();

    preencherMateriaisDivulgacao();

    $('.carousel').slick({
        dots: true,
        infinite: true,
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
                speed: 1000
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 480,
            settings: {
                autoPlay: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        }
        ]
    });

    $("img").click(function () {

        var imgSrc = $(this).attr('src');
        var nome = imgSrc.split("/");


        $("#imagem").html('<img class="img-responsive center-block" src="' + imgSrc + '" />' +

            '<div><label class="descricaoSlick">Descrição</label><div><a class="downloadSlick" href="' + imgSrc + '"' +
            'download= "' + nome[nome.length - 1] + '" > Download</a ></div ></div > ');
        $('#myModal').modal('show');
        $("html,body").css({ "overflow": "hidden" });
        //$(".container-fluid").addClass("fixed");
        $('#myModal').modal('hide');
    });

    $("#myModal").on("hidden.bs.modal", function () {

        $("html,body").css({ "overflow": "auto" });
        //$(".container-fluid").removeClass("fixed");

    });

    $("#escolherOutraData").click(function () {
        console.log("teste");
        $('#myModal').modal("hide");
    });

});

function setarItensSlick() {

    var imagens = getRepository("repositorioImagens");
    var carousel = getComponent("carousel");
    var itens = "";

    $.each(imagens, function (i, item) {

        var boxMateriais = getComponent("boxMateriaisPlanos");

        var nomeItem = item.split("/");

        boxMateriais = boxMateriais.replace("{IMAGEM}", item).replace("{IMGSRC}", "https://www.facebook.com/images/fb_icon_325x325.png").replace("{NOMEARQUIVO}", nomeItem[nomeItem.length - 1]);

        itens += boxMateriais;
    });

    $("#slickPme").append(itens);
    $("#slickPf").append(itens);
}

function buscarMateriaisDivulgacao(callback, token) {

    $.ajax({
        async: true,
        //url: URLBase + "/corretorservicos/1.0/dashboardPropostaPME/" + statusTodasPropostas + "/" + dadosForca.cpf,
        url: "https://f9260c80-30d2-4306-b5c0-02e4cc6a4758.mock.pstmn.io/materiaisdivulgacao",
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

    buscarMateriaisDivulgacao(function (dataMateriai) { //TO DO: adicionar o nome do retorno correto

        console.log(dataMateriai);
        let dataMateriais = JSON.parse(dataMateriai);

        $.each(dataMateriais.categorias, function (iCategoria, itemCategoria) {

            let componentTitle = getComponent("titleMateriais");
            componentTitle = componentTitle.replace("{LABEL}", itemCategoria.nome);
            $("#conteudoPage").append(componentTitle);

            $.each(itemCategoria.subcategorias, function (iSubcategoria, itemSubcategoria) {

                let subCategoriaMateriais = getComponent("subCategoriaMateriais");
                subCategoriaMateriais = subCategoriaMateriais.replace("{LABEL}", itemSubcategoria.nome);
                $("#conteudoPage").append(subCategoriaMateriais);
                $("#conteudoPage").append('<div style: "white-space: nowrap;" id="' + itemSubcategoria.nome.replaceAll(" ", "-") + '"></div>');
                
                let idCarousel = itemSubcategoria.nome.replaceAll(" ", "-");

               // if (itemSubcategoria.materiaisDivulgacao.length > 0) $("#conteudoPage").append('<div class="carousel" id="' + idCarousel + '"></div>');

                $.each(itemSubcategoria.materiaisDivulgacao, function (iMateriais, itemMateriais) {

                    let boxThumbNail = getComponent("boxMateriaisPlanos");
                    boxThumbNail = boxThumbNail.replace("{IMAGEM}", "data:image/png;base64, " + itemMateriais.thumbnail);
                    $('#' + idCarousel).append(boxThumbNail);

                });



            });

        });

    }, "saasdasdasdd");

}


