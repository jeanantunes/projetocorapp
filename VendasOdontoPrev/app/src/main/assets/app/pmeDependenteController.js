$(document).ready(function () {
    carregarForm();
    $('.nascimento').mask('00/00/0000');
    $('.cpf').mask('000.000.000-00');

    var benef = get("beneficiario");
    benef.dependentes = [];
});

function carregarForm() {
    var benef = get("beneficiario");
    $("#nome-titular").html(benef.nome);

    var numero = get("numeroDependentes");

    for (var i = 0; i < numero; i++) {
        var form = getComponent("dependenteForm");

        form = form.replace("{NUMERO}", i + 1);
        form = form.replace("{DEP}", i + 1);
        form = form.replace("{DEP2}", i + 1);

        $("#lista").append(form);
    }
}

function SalvarDependentes() {
    var stop =false;
    $(".boxDependente").each(function () {
        if (stop)
            return;

        if ($(this).find(".nome-dependente").val() == "")
        {
            swal("Ops!", "Preencha o Nome do " + $(this).find(".depends").html(), "error");
            stop = true;
            return;
        }

        if ($(this).find(".sexo").val() == "") {
            swal("Ops!", "Selecione o Sexo do " + $(this).find(".depends").html(), "error");
            stop = true;
            return;
        }

        if ($(this).find(".nascimento").val() == "") {
            swal("Ops!", "Preencha a data de nascimento do " + $(this).find(".depends").html(), "error");
            stop = true;
            return;
        }

        if ($(this).find(".cpf").val() == "") {
            swal("Ops!", "Preencha o CPF do " + $(this).find(".depends").html(), "error");
            stop = true;
            return;
        }

        if ($(this).find(".nome-mae").val() == "") {
            swal("Ops!", "Preencha o Nome da Mãe do " + $(this).find(".depends").html(), "error");
            stop = true;
            return;
        }
    });


    $(".boxDependente").each(function () {

        var benef = get("beneficiario");
        var dependente = getRepository("dependente");
        dependente.nome = $(this).find(".nome-dependente").val();
        dependente.dataNascimento = $(this).find(".nascimento").val();
        dependente.cpf = $(this).find(".cpf").val();
        dependente.nomeMae = $(this).find(".nome-mae").val()
        dependente.dataNascimento = $(this).find(".nascimento").val();
        dependente.sexo = $(this).find(".sexo").val();

        if (benef.dependentes.length == 0) {
            benef.dependentes = [];
        }

        benef.dependentes.push(dependente);
        put("beneficiario", JSON.stringify(benef));
    });

    window.location.href = 'venda_pme_beneficiarios.html';  
}