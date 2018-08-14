$(document).ready(function () {

    carregarDadosUsuario();

    $("#editarDados").click(function () {

        window.location.href = "meus_dados_edicao.html";   

    });

});

function carregarDadosUsuario() {

    var carregarDados = get("dadosUsuario");

    if (carregarDados == null)
        return;

    $("#nomeCorretor").html(carregarDados.nome);
    $("#nomeCorretora").html(carregarDados.nomeEmpresa);
    $("#emailCorretor").append(carregarDados.email);
    $("#numeroCorretor").append(aplicarMascaraTelefone(carregarDados.telefone));
    $('.telefone-edicao').mask('(00) 00000-0000');

}

function aplicarMascaraTelefone(telefone) {

    var telefoneReplace = telefone.replace(/\D/g, "");
    telefoneReplace = telefoneReplace.replace(/^0/, "");

    if (telefoneReplace.length > 10) {
        // 11+ digits. Format as 5+4.
        telefoneReplace = telefoneReplace.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    }
    else if (telefoneReplace.length < 11) {

        // 6..10 digits. Format as 4+4
        telefoneReplace = telefoneReplace.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    }

    return telefoneReplace;

}