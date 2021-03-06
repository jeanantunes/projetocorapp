﻿$(document).ready(function () {
    carregarForm();
    $('.nascimento').mask('00/00/0000');
    $('.cpf').mask('000.000.000-00');

    var benef = get("beneficiario");
    benef.dependentes = [];

    $('.cpf').off('blur');
    
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

        $("#dataNascimentoDep").prop('type', 'tel');
    }

    $(".cpf").focusout(function () {

        if ($(this).parent().parent().find(".nascimento").val() == "") {
            swal("Ops!", "Antes de digitar o CPF, por favor preencha a Data de Nascimento", "error");
            $(this).val("");
            stop = true;
            return;
        }
    });

    $(function () {
        var regex = new RegExp('[^A-Za-z \]', 'g');


        // repare a flag "g" de global, para substituir todas as ocorrências
        $('.nomeRegex').bind('input', function () {

            $(this).val(removerAcentos($(this).val()).toUpperCase());
            $(this).val($(this).val().replace(regex, ''));

            var capturandoEspaco = $(this).val().substring($(this).val().length - 2, $(this).val().length);

            if (capturandoEspaco == "  ") {

                $(this).val($(this).val().substring(0, $(this).val().length - 1))

            }
        });
    });
}

function SalvarDependentes() {
    var stop = false;
    $(".boxDependente").each(function () {
        if (stop)
            return;

        if ($(this).find(".nome-dependente").val() == "") {
            swal("Ops!", "Preencha o Nome do " + $(this).find(".depends").html(), "error");
            stop = true;
            return;
        }

        if (!ValidaNome($(this).find(".nome-dependente").val())) {
            swal("Ops!", $(this).find(".depends").html() + ": nome inválido", "error");
            stop = true;
            return false;
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

        if ($(this).find(".cpf").val() != "" && getInputsByValue($(this).find(".cpf").val()).length > 1) {
            swal("Ops!", "Existem dependentes com o mesmo CPF, por favor verifique.", "error");
            stop = true;
            return;
        }

        if (!validarData($(this).find(".nascimento").val())) {
            swal("Ops!", "Preencha uma data de nascimento correta do " + $(this).find(".depends").html(), "error");
            stop = true;
            return;
        }

        var currentYear = (new Date).getFullYear();
        var idade = $(this).find(".nascimento").val().split("/");
        var menor = currentYear - idade[2];

        var dateNascimento = toDate($(this).find(".nascimento").val());

        if (isMaiorDeIdade(dateNascimento)) {

            if ($(this).find(".cpf").val() == "") {
                swal("Ops!", "O CPF do " + $(this).find(".depends").html() + " é inválido.", "error");      
                stop = true;
                return;
            }

        }

        if ($(this).find(".cpf").val() != "" && !TestaCPF($(this).find(".cpf").val().replace(/\D/g, ''))) {
            swal("Ops!", "O CPF do " + $(this).find(".depends").html().toLowerCase() + " é inválido.", "error");           
            stop = true;
            $(this).find(".cpf").focus();
            return;
        }

        var benef = get("beneficiario");
        if ($(this).find(".cpf").val() != "" && benef.cpf == $(this).find(".cpf").val()) {
            swal("Conflito!", "Você informou o mesmo CPF do titular para este dependente, por favor verifique.", "error");
            stop = true;
            return;
        }

        let cpfsProposta = listCpfPropostaPme();

        if (cpfsProposta.length > 0) {

            let cpfPesquisa = $(this).find(".cpf").val();

            let checkCpf = cpfsProposta.filter(function (x) { return x == cpfPesquisa });

            if (checkCpf.length > 0) {

                swal("Ops!", "CPF do "+ $(this).find(".depends").html().toLowerCase() +" já informado anteriormente.", "error");
                stop = true;
                return;
            }

        }

        var benefs = get("beneficiarios");
        if (benefs != null) {
            var cpfAtual = $(this).find(".cpf").val();
            benefs = benefs.filter(function (x) { return x.cnpj == benef.cnpj });
            var oe = benefs.filter(function (x) { return x.cpf == cpfAtual });
            var dependsCpf = false;

            if (oe.length >= 1 && cpfAtual != "") {
                swal("Conflito!", "Você informou o mesmo CPF de outro titular para este dependente, por favor verifique.", "error");
                stop = true;
                return;
            }

            $.each(benefs, function (i, item) {
                $.each(item.dependentes, function (i, param) {
                    if (param.cpf == cpfAtual && cpfAtual != "") {
                        dependsCpf = true;
                    }
                });
            });

            if (dependsCpf) {
                swal("Conflito!", "Você informou o mesmo CPF de outro Dependente para este dependente, por favor verifique.", "error");
                stop = true;
                return;
            }
        }

        if ($(this).find(".nome-mae").val() == "") {
            swal("Ops!", "Preencha o Nome da Mãe do " + $(this).find(".depends").html(), "error");
            stop = true;
            return;
        }

        if (!ValidaNome($(this).find(".nome-mae").val())) {
            swal("Ops!", $(this).find(".depends").html() + ": nome da mãe inválido", "error");
            stop = true;
            return false;
        }
    });

    if (stop)
        return;

    $(".boxDependente").each(function () {

        var benef = get("beneficiario");
        var dependente = getRepository("dependente");
        dependente.nome = $(this).find(".nome-dependente").val();
        dependente.dataNascimento = $(this).find(".nascimento").val();
        dependente.cpf = $(this).find(".cpf").val();
        dependente.nomeMae = $(this).find(".nome-mae").val();
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