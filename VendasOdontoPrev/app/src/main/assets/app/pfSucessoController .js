var preenchidos = false;

$(document).ready(function () {
    var proposta = get("propostaPf");
    proposta.status = "PRONTA";
    atualizarPessoas(proposta);
    localStorage.removeItem("propostaPf");

    sincronizar();

    console.log("Sincrono");
});
