$(document).ready(function () { });

$("#sugestao").click(function () {

    var dadosUser = get("dadosUsuario");
    faleConosco = getRepository("faleConosco");
    faleConosco.subject = "[SUGESTAO]";
    faleConosco.nomeRemetente = dadosUser.nome;
    faleConosco.emailRemetente = dadosUser.email;
  
    put("faleConosco", JSON.stringify(faleConosco));
});

$("#duvida").click(function () {

    var dadosUser = get("dadosUsuario");
    faleConosco = getRepository("faleConosco");
    faleConosco.subject = "[DUVIDA]";
    faleConosco.nomeRemetente = dadosUser.nome;
    faleConosco.emailRemetente = dadosUser.email;

    put("faleConosco", JSON.stringify(faleConosco));

});

$("#suporte").click(function () {

    var dadosUser = get("dadosUsuario");
    faleConosco = getRepository("faleConosco");
    faleConosco.subject = "[SUPORTE]";
    faleConosco.nomeRemetente = dadosUser.nome;
    faleConosco.emailRemetente = dadosUser.email;

    put("faleConosco", JSON.stringify(faleConosco));


});