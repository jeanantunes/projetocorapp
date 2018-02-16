$(document).ready(function(){

    //$("#btnCpfOdont").click(function(){
    //    $( "#celOdontCorretora" ).removeClass( "hide" )
    //    $( "#cpfOdont" ).addClass( "hide" )
    //    return false;
    //});

    $("#btnCelOdont").click(function(){
        $( "#celOdont" ).addClass( "hide" )
        $( "#keyOdont" ).removeClass( "hide" )
        return false;
    });

    $("#btnkeyOdont").click(function(){
        $( "#keyOdont" ).addClass( "hide" )
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
// End Menu //
