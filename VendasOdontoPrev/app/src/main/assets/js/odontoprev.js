$(document).ready(function(){
    // $("#btnCpfOdont").click(function(){
    //     $( "#celOdontCorretora" ).removeClass( "hide" )
    //     $( "#cpfOdont" ).addClass( "hide" )
    //     return false;
    // });


    $(".sair").click(function(){
      SairDaConta.removerRegistroLogin();       
    });

    $("#btnCelOdont").click(function(){
        $( "#celOdont" ).addClass( "hide" )
        $( "#keyOdont" ).removeClass( "hide" )
        return false;
    });
    $("#btnkeyOdont").click(function(){
        $( "#keyOdont" ).addClass( "hide" )
        $( "#termoOdont" ).removeClass( "hide" )
        return false;
    });
    $("#btnTermo").click(function(){
        $( "#termoOdont" ).addClass( "hide" )
        $( "#cadastroSucesso" ).removeClass( "hide" )
        return false;
    });

    // $("#btnCpfOdont").click(function(){
    //     $( "#celOdontCorretora" ).removeClass( "hide" )
    //     $( "#cpfOdontCorretora" ).addClass( "hide" )
    //     return false;
    // });
    $("#btnCelOdontNCpf").click(function(){
        $( "#celOdontCorretora" ).addClass( "hide" )
        $( "#keyOdontCorretora" ).removeClass( "hide" )
        return false;
    });
    // $("#linkBuscarCorretora").click(function(){
    //     $( "#infoCorretora" ).addClass( "hide" )
    //     $( "#buscarCorretora" ).removeClass( "hide" )
    //     return false;
    // });
 	$("#btnkeyOdontNCpf").click(function(){
        $( "#keyOdontCorretora" ).addClass( "hide" )
        $( "#infoCorretora" ).removeClass( "hide" )
        return false;
    });


});

$(".btnExcluir").click(function(){
    $( ".div-excluir" ).remove();
});

//Meus Dados//

$("#editMeusDados1").click(function () {
    $("#imgEmail").removeClass("hide")
    $("#imgCel").removeClass("hide")
    $("#emailInput").removeClass("hide")
    $("#celInput").removeClass("hide")

    $("#emailLabel").addClass("hide")
    $("#imgLabEmail").addClass("hide")
    $("#celLabel").addClass("hide")
    $("#imgLabCel").addClass("hide")
    return false;
});

$("#editMeusDados2").click(function () {
    $("#imgEmail").removeClass("hide")
    $("#imgCel").removeClass("hide")
    $("#emailInput").removeClass("hide")
    $("#celInput").removeClass("hide")

    $("#emailLabel").addClass("hide")
    $("#imgLabEmail").addClass("hide")
    $("#celLabel").addClass("hide")
    $("#imgLabCel").addClass("hide")
    return false;
});

$("#editMeusDados1").click(function () {
    $("#salvarEditDados").removeClass("disabled")
    $("#editMeusDados1").addClass("hide")
    $("#editMeusDados2").addClass("hide")
    return false;
});

$("#editMeusDados2").click(function () {
    $("#salvarEditDados").removeClass("disabled")
    $("#editMeusDados1").addClass("hide")
    $("#editMeusDados2").addClass("hide")
    return false;
});


$("#salvarEditDados").click(function () {
    $("#salvarEditDados").addClass("disabled")

    $("#imgEmail").addClass("hide")
    $("#imgCel").addClass("hide")
    $("#emailInput").addClass("hide")
    $("#celInput").addClass("hide")

    $("#emailLabel").removeClass("hide")
    $("#imgLabEmail").removeClass("hide")
    $("#celLabel").removeClass("hide")
    $("#imgLabCel").removeClass("hide")
    return false;
    return false;
});

//End Meus Dados//

// Menu //

    $(".btnMenu").click(function(){
        $("html,body").css({"overflow":"hidden"});
    });

    $(".closeNav").click(function(){
        $("html,body").css({"overflow":"auto"});
    });

    $('#mySidenav .modal-content').bind('scroll', function() {

        var $conteudo = $(this);

        if ($conteudo.scrollTop() + $conteudo.innerHeight() >= this.scrollHeight) {
            $("html, body").css({"overflow":"auto"});
        }
    });

    $(".btnMenu").click(function(){
        $( ".closeNav" ).removeClass( "hide" )
        $( ".container-fluid" ).addClass( "fixed" )
    });

    $(".closeNav").click(function(){
        $( ".closeNav" ).addClass( "hide" )
        $( ".container-fluid" ).removeClass( "fixed" )
    });

    function openNav() {
        document.getElementById("mySidenav").style.width = "256px";
        
    }   

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
// End Menu //

//Grafico Vendas//
    $(document).ready(function() {
        $('.barras').each(function() {
            var dataWidth = $(this).data('value');
            $(this).css("width", dataWidth + "%");
            $(this).css("max-width", "100%");
            if (dataWidth <=25) { $(this).css("background-color", "red"); }
            else if (dataWidth >25 && dataWidth <=50){ $(this).css("background-color", "#FF4141"); }
            else if (dataWidth >50 && dataWidth <=75) { $(this).css("background-color", "#4ED6FF"); }
            else if (dataWidth >75 && dataWidth <=100) { $(this).css("background-color", "#C3EB3B"); } 
        });
    });

  //End Grafico Vendas//