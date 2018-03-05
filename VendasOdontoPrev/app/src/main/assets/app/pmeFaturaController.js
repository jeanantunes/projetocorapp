var preenchidos = false;

$(document).ready(function () {
    var proposta = get("proposta");
    $(".selectListBlur").val(proposta.vencimentoFatura);
});


function atualizarFatura() {
    if ($(".selectListBlur").val() == null || $(".selectListBlur").val() == "Selecione...") {
        swal("Ops!", "Selecione a Data de vencimento da Fatura", "error");
        return;
    }

    var proposta = get("proposta");
    proposta.vencimentoFatura = $(".selectListBlur").val(); 

    atualizarEmpresas(proposta);
    put("proposta", JSON.stringify(proposta));

    window.location.href = "proposta_pme_enviada.html";

}