﻿var preenchidos = false;

$(document).ready(function () {
    var proposta = get("proposta");

    //if (proposta.vencimentoFatura != "") {
    //    $(".selectListBlur").val(proposta.vencimentoFatura);
    //}
    
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

function isEffectiveDate(dayDueDate) {

    if (!dayDueDate) {

        console.log('dia informado invalido');

        return false;

    }

    var currentTime = new Date();
    currentTime.setHours(0, 0, 0, 0);
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();

    //data vencimento
    var DueDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);

    //data movimento
    var movingDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);

    // vigencia
    var effectiveDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);

    var addMonth = 1;

    switch (dayDueDate) {

        case 5:
            effectiveDate = new Date(year, month, 1, 0, 0, 0, 0);
            movingDate = new Date(year, month, 25, 0, 0, 0, 0);
            break;

        case 15:
            effectiveDate = new Date(year, month, 10, 0, 0, 0, 0);
            movingDate = new Date(year, month, 5, 0, 0, 0, 0);
            break;

        case 25:
            effectiveDate = new Date(year, month, 20, 0, 0, 0, 0);
            movingDate = new Date(year, month, 15, 0, 0, 0, 0);
            break;
    }

    if (DueDate <= currentTime) {

        DueDate.setMonth(DueDate.getMonth() + addMonth);
    }

    if (effectiveDate <= currentTime) {

        effectiveDate.setMonth(effectiveDate.getMonth() + addMonth);
    }

    if (movingDate <= currentTime) {

        movingDate.setMonth(movingDate.getMonth() + addMonth);
    }

    console.log('Data Atual: ' + currentTime);

    console.log('Data Vencimento: ' + DueDate);

    console.log('Data de vigencia: ' + effectiveDate);

    console.log('Data de movimentação: ' + movingDate);

    if (movingDate < currentTime) {

        console.log('Para o vencimento escolhido, a vigência deste contrato ficará para o próximo mês.');

        return false;
    }

    return true;
}