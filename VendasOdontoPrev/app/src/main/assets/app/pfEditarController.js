$(document).ready(function () {

    var pessoas = get("pessoas");
    var idProposta = getUrlParameter("id");
    var propostaEmEdicao = pessoas.filter(function (x) { return x.idProposta == idProposta });
    
    put("propostaPf", JSON.stringify(propostaEmEdicao[0]));
    window.location.href = "venda_pf_dados_proposta.html";
});
