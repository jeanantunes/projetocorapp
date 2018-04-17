var preenchidos = false;

$(document).ready(function () {
    var empresas = get("empresas");

    var cnpj = getUrlParameter("cnpj");
    var editado = empresas.filter(function (x) { return x.cnpj == cnpj });
    
    put("proposta", JSON.stringify(editado[0]));
    window.location.href = "venda_pme_dados_proposta.html";
});


$(".cpf").click(function () {
    $(this).prop('type', 'tel');

});