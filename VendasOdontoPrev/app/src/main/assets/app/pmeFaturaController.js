var preenchidos = false;

$(document).ready(function () {
    var proposta = get("proposta");

    //if (proposta.vencimentoFatura != "") {
    //    $(".selectListBlur").val(proposta.vencimentoFatura);
    //}
    
});

$(".selectListBlur").change(function () {

    if ($(".selectListBlur").val() == "Selecione...") {

        $("#divProximoMes").addClass('hide');
        $("#corte").html("");
        $("#vencimento").html("");
        $("#vigencia").html("");

        return;
    }

    isEffectiveDate($(".selectListBlur").val());
    
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

    window.location.href = "resumo_pme_proposta.html";

}

//function isEffectiveDate(dayDueDate) {
//
//    if (!dayDueDate) {
//
//        console.log('dia informado invalido');,
//
//        return false;
//
//    }
//
//    var currentTime = new Date();
//    currentTime.setHours(0, 0, 0, 0);
//    var month = currentTime.getMonth();
//    var year = currentTime.getFullYear();
//
//    //data vencimento
//    var DueDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);
//
//    //data movimento
//    var movingDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);
//
//    // vigencia
//    var effectiveDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);
//
//    var addMonth = 1;
//
//    switch (dayDueDate) {
//
//        case "05":
//            effectiveDate = new Date(year, month, 1, 0, 0, 0, 0);
//            movingDate = new Date(year, month, 25, 0, 0, 0, 0);
//            break;
//
//        case "15":
//            effectiveDate = new Date(year, month, 10, 0, 0, 0, 0);
//            movingDate = new Date(year, month, 5, 0, 0, 0, 0);
//            break;
//
//        case "25":
//            effectiveDate = new Date(year, month, 20, 0, 0, 0, 0);
//            movingDate = new Date(year, month, 15, 0, 0, 0, 0);
//            break;
//    }
//
//    if (DueDate <= currentTime) {
//
//        DueDate.setMonth(DueDate.getMonth() + addMonth);
//    }
//
//    if (effectiveDate <= currentTime || movingDate <= effectiveDate) {
//
//        effectiveDate.setMonth(effectiveDate.getMonth() + addMonth);
//    }
//
//    if (movingDate <= currentTime) {
//
//        movingDate.setMonth(movingDate.getMonth() + addMonth);
//    }
//
//    console.log('Data Atual: ' + currentTime.toLocaleDateString());
//
//    console.log('Data Vencimento: ' + DueDate.toLocaleDateString());
//
//    console.log('Data de vigencia: ' + effectiveDate.toLocaleDateString());
//
//    console.log('Data de movimentação: ' + movingDate.toLocaleDateString());
//
//    $("#vencimento").html('Data de vencimento <br>' + DueDate.toLocaleDateString());
//    $("#vigencia").html('Data de vigencia <br>' + effectiveDate.toLocaleDateString());
//    $("#movimentacao").html('Data de movimentação <br>' + movingDate.toLocaleDateString());
//    $("#proximoMes").html('Para o vencimento escolhido, a vigência deste contrato ficará para o próximo mês.');
//
//    if (movingDate < currentTime) {
//
//        $("#proximoMes").html('Para o vencimento escolhido, a vigência deste contrato ficará para o próximo mês.');
//        console.log('Para o vencimento escolhido, a vigência deste contrato ficará para o próximo mês.');
//
//        return false;
//    }
//
//    return true;
//}

function isEffectiveDate(dayDueDate) {

    var currentTime = moment();
    currentTime.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    currentTime.toISOString();
    currentTime.format();

    var month = currentTime.format('MM');
    var day = currentTime.format('DD');
    var year = currentTime.format('YYYY');


    $("#divProximoMes").addClass('hide');


    switch (dayDueDate) {

        case "05":

            var vencimento;
            var dataVencimento = moment("05-" + month.toString() + "-" + year, "DD-MM-YYYY");
            var dataVencimento = dataVencimento.add(1, 'M');

            var olderDate = moment(dataVencimento).add(-11, "days");

            if (currentTime.isAfter(olderDate)) vencimento = dataVencimento.add(1, 'M');
            else vencimento = dataVencimento;

            var dataDeCorteDeMovimentacao = moment(dataVencimento).add(-11, "days");

            $("#corte").html('Data de corte de movimentação:<br>' + dataDeCorteDeMovimentacao.format("DD/MM/YYYY"));
            $("#vencimento").html('Data de vencimento:<br>' + vencimento.format("DD/MM/YYYY"));
            $("#vigencia").html('Data de vigência:<br>' + vencimento.format("DD/MM/YYYY"));

            break;

        case "15": 

            var vencimento;
            var dataVencimento = moment("15-" + month.toString() + "-" + year, "DD-MM-YYYY");
            var olderDate = moment(dataVencimento).add(-11, "days");

            if (currentTime.isAfter(olderDate)) vencimento = dataVencimento.add(1, 'M');
            else vencimento = dataVencimento;

            var dataDeCorteDeMovimentacao = moment(dataVencimento).add(-11, "days");

            $("#corte").html('Data de corte de movimentação:<br>' + dataDeCorteDeMovimentacao.format("DD/MM/YYYY"));
            $("#vencimento").html('Data de vencimento:<br>' + vencimento.format("DD/MM/YYYY"));
            $("#vigencia").html('Data de vigência:<br>' + vencimento.format("DD/MM/YYYY"));

            break;

        case "25":

            var vencimento;
            var dataVencimento = moment("25-" + month.toString() + "-" + year, "DD-MM-YYYY");
            var olderDate = moment(dataVencimento).add(-11, "days");

            if (currentTime.isAfter(olderDate)) vencimento = dataVencimento.add(1, 'M');
            else vencimento = dataVencimento;

            var dataDeCorteDeMovimentacao = moment(dataVencimento).add(-11, "days");

            $("#corte").html('Data de corte de movimentação:<br>' + dataDeCorteDeMovimentacao.format("DD/MM/YYYY"));
            $("#vencimento").html('Data de vencimento:<br>' + vencimento.format("DD/MM/YYYY"));
            $("#vigencia").html('Data de vigência:<br>' + vencimento.format("DD/MM/YYYY"));

            break;

    }

}


/*function isEffectiveDate(dayDueDate) {

    if (!dayDueDate) {
        console.log('dia informado invalido');
        return false;
    }

    var currentTime = new Date();

    currentTime.setHours(0, 0, 0, 0);

    var dateCurt = new Date();
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();
    var day = currentTime.getDate();

    //data vencimento
    var DueDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);

    //data movimento
    var movingDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);
    // vigencia
    var effectiveDate = new Date(year, month, dayDueDate, 0, 0, 0, 0);

    var addMonth = 1;

    switch (dayDueDate) {
        case "05":

            effectiveDate = new Date(year, month, 5, 0, 0, 0, 0);
            movingDate = new Date(year, month, 25, 0, 0, 0, 0);
            OlderMovingDate = moment(movingDate).subtract(11, 'days').toDate();

            OlderMovingDate.diff(currentTime);



            movingDate = new Date(year, month, 25, 0, 0, 0, 0);


            var mes = moment(movingDate, "DD-MM-YYYY");
            var ProxMes = moment("24-05-2018", "DD-MM-YYYY");

            var olderDate = ProxMes.diff(mes, 'days');

            var olderDate = moment(movingDate).subtract(currentTime, 'month').toDate();

            dateCurt = new Date(movingDate);


            //year, month, 24, 0, 0, 0, 0
            break;

        case "15":
            effectiveDate = new Date(year, month, 15, 0, 0, 0, 0);
            movingDate = new Date(year, month, 5, 0, 0, 0, 0);
            dateCurt = new Date(year, month, 4, 0, 0, 0, 0);
            break;

        case "25":
            effectiveDate = new Date(year, month, 25, 0, 0, 0, 0);
            movingDate = new Date(year, month, 15, 0, 0, 0, 0);
            dateCurt = new Date(year, month, 14, 0, 0, 0, 0);
            break;
    }

    if (DueDate <= currentTime || currentTime > dateCurt) {
        DueDate.setMonth(DueDate.getMonth() + addMonth);
    }

    if (effectiveDate <= currentTime || effectiveDate <= DueDate) {
        effectiveDate.setMonth(effectiveDate.getMonth() + addMonth);
    }

    if (movingDate <= currentTime && currentTime > dateCurt) {
        movingDate.setMonth(movingDate.getMonth() + addMonth);
    }

    //console.log('Data Atual: ' + currentTime);
    //console.log('Data de corte: ' + dateCurt);
    //console.log('Data Vencimento: ' + DueDate);
    //console.log('Data de vigencia: ' + effectiveDate);
    //console.log('Data de movimentação: ' + movingDate);

    var newdate = new Date(DueDate);

    newdate.setDate(newdate.getDate() - 11); // minus the date

    var newDateCurt = new Date(newdate);

    $("#divProximoMes").addClass('hide');
    $("#corte").html('Data de corte de movimentação:<br>' + newDateCurt.toLocaleDateString());
    $("#vencimento").html('Data de vencimento:<br>' + DueDate.toLocaleDateString());
    $("#vigencia").html('Data de vigência:<br>' + effectiveDate.toLocaleDateString());

    //$("#movimentacao").html('Data de movimentação <br>' + movingDate.toLocaleDateString());

    if (movingDate < currentTime) {
        $("#divProximoMes").removeClass('hide');
        $("#proximoMes").html('Para o vencimento escolhido, a vigência deste contrato ficará para o próximo mês.');
        //console.log('Para o vencimento escolhido, a vigência deste contrato ficará para o próximo mês.');
        return false;
    }
    return true;
}
*/