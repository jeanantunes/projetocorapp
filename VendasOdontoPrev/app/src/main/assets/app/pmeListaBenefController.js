$(document).ready(function () {
    carregarLista();
});

function carregarLista() {

    var proposta = get("proposta");

    $("#razaoSocial").html(proposta.razaoSocial);
    $("#cnpjEmpresa").html(proposta.cnpj);

    var beneficiarios = get("beneficiarios");

    if (beneficiarios != null) {
        $("#lista").html("");
    }

    $.each(beneficiarios, function (i, item) {
        var benef = getComponent("beneficiario");
        benef = benef.replace("{CPF}", item.cpf);
        benef = benef.replace("{CPF-BT}", item.cpf);
        benef = benef.replace("{NOME}", item.nome);
        benef = benef.replace("{DEPENDENTES}", item.dependentes.length);

        $("#lista").append(benef);
    });

    if (beneficiarios.length == 0) {
        $("#lista").html("Você ainda não possui beneficiários cadastrados");
    }

}

function excluirBenef(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");
    var beneficiarios = get("beneficiarios");

    var beneficiariosExcetoExcluido = beneficiarios.filter(function (x) { return x.cpf != container.attr("data-id") });
    beneficiarios = [];
    $.each(beneficiariosExcetoExcluido, function (i, item) {
        beneficiarios.push(item);
    });

    put("beneficiarios", JSON.stringify(beneficiarios));
    container.remove();

    if ($("#lista").length == 0) {
        $("#lista").html("Você ainda não possui beneficiários cadastrados");
    }

    if (beneficiarios.length == 0) {
        $("#lista").html("Você ainda não possui beneficiários cadastrados");
    }
}

function adicionarBenef() {
    localStorage.removeItem("beneficiario");
    window.location.href = "venda_pme_beneficiarios.html";
}