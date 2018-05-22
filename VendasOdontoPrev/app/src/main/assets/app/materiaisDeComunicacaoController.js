$(document).ready(function () {

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



    setarItensSlick();


});

function setarItensSlick() {

    for (i = 0; i < 5; i++) {

        console.log(i);
        var appendItem = '<div class="boxMateriasPlanos"><div style="background-color:#e5e5e5; width: 100%; height: 100%;"></div></div>';
        $("#carousel").append(appendItem);

    }

}