$(document).ready(function () {

    setarItensSlick();

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


