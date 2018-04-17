$(document).ready(function () {
    carregarLista();
    localStorage.removeItem("cpfEmEdicaoPME");
    localStorage.removeItem("beneficiario");
});

function carregarLista() {

    var proposta = get("proposta");

    $("#razaoSocial").html(proposta.razaoSocial);
    $("#cnpjEmpresa").html(proposta.cnpj);

    var beneficiarios = get("beneficiarios");
    beneficiarios = beneficiarios.filter(function (x) { return x.cnpj == proposta.cnpj });

    if (beneficiarios != null) {
        $("#lista").html("");
    }

    $.each(beneficiarios, function (i, item) {
        var benef = getComponent("beneficiario");
        benef = benef.replace("{CPF}", item.cpf);
        benef = benef.replace("{CPF-BT}", item.cpf);
        benef = benef.replace("{CPF-BTNEXCLUIR}", item.cpf);
        benef = benef.replace("{NASCIMENTO-EDITAR}", item.dataNascimento);
        benef = benef.replace("{NOME}", item.nome);
        benef = benef.replace("{DEPENDENTES}", item.dependentes.length);
        benef = benef.replace("{NOME-BENEF}", item.nome);

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

function editarBeneficiario(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");
    var beneficiarios = get("beneficiarios");
    var beneficiarioSelecionado = beneficiarios.filter(function (x) { return x.cpf == container.attr("data-id") });


    put("cpfEmEdicaoPME", JSON.stringify(beneficiarioSelecionado[0].cpf));
    put("beneficiario", JSON.stringify(beneficiarioSelecionado[0]));

    window.location.href = "venda_pme_beneficiarios.html";
}

function adicionarBenef() {
    localStorage.removeItem("beneficiario");
    window.location.href = "venda_pme_beneficiarios.html";
}