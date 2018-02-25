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
    $("#btnInfoCorretoraNCpf").click(function(){
        $( "#infoCorretora" ).addClass( "hide" )
        $( "#cadastroSucessoCorretora" ).removeClass( "hide" )
        return false;
    });
});

$(".btnExcluir").click(function(){
    $( ".div-excluir" ).remove();
});

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

function validarCpf()
{
   var cpf = $('#cpf').val().replace(/\D/g, '');
   if(cpf == "46809897852")
   {
        $( "#celOdont" ).removeClass( "hide" )
        $( "#cpfOdont" ).addClass( "hide" )
        $("#nome").val("Yago");
        $("#celular").val("(11)1111-1111");
        $("#email").val("almeida_yago@hotmail.com")
   }
   else
   {
        $( "#celOdontCorretora" ).removeClass( "hide" )
        $( "#cpfOdont" ).addClass( "hide" )
   }
}


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