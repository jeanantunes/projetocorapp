var preenchidos = false;

$(document).ready(function () {
    var pessoas = get("pessoas");

    var cpf = getUrlParameter("cpf");
    var editado = pessoas.filter(function (x) { return x.cpf == cpf });
    
    put("propostaPf", JSON.stringify(editado[0]));
    window.location.href = "venda_pf_dados_proposta.html";
});
