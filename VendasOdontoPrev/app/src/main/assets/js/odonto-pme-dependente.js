

$(document).ready(function () {

});

function onloadd() {
    var json = window.localStorage.getItem('Proposta');
    obj = JSON.parse(json);
    console.log(obj);
    console.log(json);
    document.getElementById('nome-titular').innerHTML = obj[0].value;
    if (obj[6].value > 0) adicionarBoxDependentes();
}

function adicionarBoxDependentes() {
    var radioButtonSexo = 3;
    var itemCont = 2;

    while (itemCont <= obj[6].value) {
        console.log("Foi");
        var novoItem = $("#dependente1").clone();

        // modifica o id do item recem criado
        $(novoItem).attr("id", "item" + itemCont);

        // modifica o id da label baneficiario
        var novoSelect = $(novoItem).children()[0];
        var novoSelect = $(novoSelect).children()[0];
        $(novoSelect).attr("id", "label-dependente" + itemCont);

        // modifica o id do input nome-dependente
        var novoSelect = $(novoItem).children()[2];
        var novoSelect = $(novoSelect).children()[0];
        $(novoSelect).attr("id", "nome-dependente" + itemCont);


        ///////////////////////////////////////////////////
        // modifica o id do primeiro radioButton
        var novoSelect = $(novoItem).children()[4];
        var novoSelect = $(novoSelect).children()[0];
        var novoSelect = $(novoSelect).children()[0];
        //
        // modifica o id do input Feminino
        $(novoSelect).attr("id", "radio-" + radioButtonSexo);
        $(novoSelect).attr("name", "radio" + itemCont);
        //
        // modifica o for da label Feminino
        var novoSelect = $(novoItem).children()[4];
        var novoSelect = $(novoSelect).children()[0];
        var novoSelect = $(novoSelect).children()[1];
        $(novoSelect).attr("for", "radio-" + radioButtonSexo);
        radioButtonSexo++;
        //
        // modifica o id do segundo radioButton
        var novoSelect = $(novoItem).children()[4];
        var novoSelect = $(novoSelect).children()[1];
        var novoSelect = $(novoSelect).children()[0];
        //
        // modifica o id do input Masculino
        $(novoSelect).attr("id", "radio-" + radioButtonSexo);
        $(novoSelect).attr("name", "radio" + itemCont);
        //
        // modifica o for da label Masculino
        var novoSelect = $(novoItem).children()[4];
        var novoSelect = $(novoSelect).children()[1];
        var novoSelect = $(novoSelect).children()[1];
        $(novoSelect).attr("for", "radio-" + radioButtonSexo);
        radioButtonSexo++;
        //////////////////////////////////////////////////////

        // modifica o id do input data-nascimento
        var novoSelect = $(novoItem).children()[6];
        var novoSelect = $(novoSelect).children()[0];
        $(novoSelect).attr("id", "data-nascimento" + itemCont);


        // modifica o id do input cpf-dependente
        var novoSelect = $(novoItem).children()[8];
        var novoSelect = $(novoSelect).children()[0];
        $(novoSelect).attr("id", "cpf-dependente" + itemCont);

        // modifica o id do input nome-mae
        var novoSelect = $(novoItem).children()[10];
        var novoSelect = $(novoSelect).children()[0];
        $(novoSelect).attr("id", "nome-mae" + itemCont);

        // modifica o id do select parentesco-dependente
        var novoSelect = $(novoItem).children()[11];
        var novoSelect = $(novoSelect).children()[1];
        $(novoSelect).attr("id", "parentesco-dependente" + itemCont);


        $("#formulario").append(novoItem);
        document.getElementById('label-dependente' + itemCont).innerHTML = 'Dependente ' + itemCont;

        itemCont++;
    }
}

