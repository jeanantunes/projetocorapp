var problema = true;

$(document).ready(function () {
    carregarProposta();
    $('.nascimento').mask('00/00/0000');
    $('.cpf').mask('000.000.000-00');

    $('.cpf').off('blur').on();
});

function carregarProposta() {

    var dependenteEmEdicao = get("dependentePfEmEdicao");

    $("#nomeDependente").val(dependenteEmEdicao.nome);
    $(".email").val(dependenteEmEdicao.email);
    $("#celularDependenteEdicao").val(dependenteEmEdicao.celular);
    $(".nascimento").val(dependenteEmEdicao.dataNascimento);
    $(".cpf").val(dependenteEmEdicao.cpf);
    $("#nomeMae").val(dependenteEmEdicao.nomeMae);

    if (dependenteEmEdicao.sexo == "m") {
        $("#radio-2").attr("checked", true);
    }
    else {
        $("#radio-1").attr("checked", true);
    }
}

function SalvarDependente() {

    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if ($(".nome").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        return;
    }

    if (!ValidaNome($("#nomeDependente").val())) {
        swal("Ops!", "Nome inválido", "error");
        return false;
    }

    if ($(".email").val() == "") {
        swal("Ops!", "Preencha o E-mail", "error");
        return;
    }

    if (!validateEmail($(".email").val())) {
        swal("Ops!", "Preencha um E-mail válido", "error");
        return;
    }

    if ($(".celular").val() == "") {
        swal("Ops!", "Preencha o Celular", "error");
        return;
    }

    var benef = get("propostaPf");
    if (benef.cpf == $(".cpf").val() && $(".cpf").val() != "") {
        swal("Conflito!", "Você informou o mesmo CPF do titular para este dependente, por favor verifique.", "error");
        return;
    }

    if (benef.cpf == $(".cpf").val() && $(".cpf").val() != "") {
        swal("Conflito!", "Você informou o mesmo CPF do titular para este dependente, por favor verifique.", "error");
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a data de nascimento", "error");
        return;
    }

    if (!validarData($(".nascimento").val())) {
        swal("Ops!", "Preencha uma data de nascimento correta", "error");
        return;
    }

    var validacaoNascimento = validarNascimentoBeneficiario();

    if (!validacaoNascimento) return false;

    var proposta = get("propostaPf");
    var planos = get("CodPlanos");
    var plano = planos.filter(function (x) { return x.cdPlano == proposta.planos[0].cdPlano });

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha o Nome da Mãe", "error");
        return;
    }

    if (!ValidaNome($("#nomeMae").val())) {
        swal("Ops!", "Nome da mãe inválido", "error");
        return false;
    }

    var proposta = get("propostaPf");

    var dependenteEmEdicao = get("dependentePfEmEdicao");

    var cpf = $(".cpf").val();
    var qtdDep = proposta.dependentes.filter(function (x) { return x.cpf == cpf }).length;
    if (qtdDep == 1 && dependenteEmEdicao.cpf != cpf && cpf != "") {
        swal("Ops!", "Existem dependentes com o mesmo CPF, por favor verifique.", "error");
        return;
    }

    var listBeneficiarios = listCpfPropostaPf();
    var responsavelContratual = listBeneficiarios.filter(function (x) { return x.tipo == "responsavelContratual" });
    var dependentes = listBeneficiarios.filter(function (x) { return x.tipo == "dependente" });
    var checkDependentes = dependentes.filter(function (x) { return x.cpf == $(".cpf").val() && x.cpf != "" && dependenteEmEdicao.cpf != $(".cpf").val() });

    var checkDependentesSemCpf = dependentes.filter(function (x) {
        return x.cpf == "" && x.nome == $(".nome").val() && x.dataNascimento == $(".nascimento").val() && dependenteEmEdicao.nome != $(".nome").val() && dependenteEmEdicao.dataNascimento != $(".nascimento").val()
    });

    if (checkDependentes.length > 0) {

        swal("Ops!", "Ops! Não será possível adicionar um dependente com dados duplicados em uma venda", "error")
        return false;

    }

    if (checkDependentesSemCpf.length > 0) {

        swal("Ops!", "Ops! Não será possível adicionar um dependente com dados duplicados em uma venda", "error")
        return;

    }

    if (responsavelContratual.length > 0) {

        if (responsavelContratual[0].cpf == $(".cpf").val()) {

            if ($(".nome").val().trim() != responsavelContratual[0].nome) {

                swal("Ops!", "O nome digitado é diferente do nome do responsável contratual", "error")
                return false;

            }

            if ($(".nascimento").val() != responsavelContratual[0].dataNascimento) {

                swal("Ops!", "A data de nascimento digitada é diferente do data de nascimento do responsável contratual", "error")
                return false;
            }
        }
    }

    problema = false;

    var dependente = getRepository("dependente");
    dependente.nome = $(".nome").val();
    dependente.nome = dependente.nome.toUpperCase();
    dependente.dataNascimento = $(".nascimento").val();
    dependente.cpf = $(".cpf").val();
    dependente.email = $(".email").val();
    dependente.nomeMae = $(".nome-mae").val();
    dependente.nomeMae = dependente.nomeMae.toUpperCase();
    dependente.dataNascimento = $(".nascimento").val();

    if ($("#radio-1").is(":checked") == true) {
        dependente.sexo = $("#radio-1").val();
    }
    else {
        dependente.sexo = $("#radio-2").val();
    }

    dependente.celular = $("#celularDependenteEdicao").val();
    
    if (proposta.dependentes.length == 0) {
        proposta.dependentes = [];
    }

    var dependentesSemCpf = proposta.dependentes.filter(function (x) {
        return x.cpf == "";
    });

    var dependentesComCpf= proposta.dependentes.filter(function (x) {
        return x.cpf != dependenteEmEdicao.cpf && x.cpf != "";
    });

    var dependentesExcetoEditadoSemCpf = dependentesSemCpf.filter(function (x) {
        return x.nome != dependenteEmEdicao.nome && x.dataNascimento != dependenteEmEdicao.dataNascimento;
    });

    var dependentesExcetoEditado = [];

    $.each(dependentesExcetoEditadoSemCpf, function (i, item) {

        dependentesExcetoEditado.push(item);

    });

    $.each(dependentesComCpf, function (i, item) {

        dependentesExcetoEditado.push(item);

    });

    proposta.dependentes = [];

    if (dependentesExcetoEditado.length > 0) {

        $.each(dependentesExcetoEditado, function (i, item) {

            proposta.dependentes.push(item);

        });
        
    }

    proposta.dependentes.push(dependente);

    put("propostaPf", JSON.stringify(proposta));

    atualizarPessoas(proposta);
}

$(".cpf").focusout(function () {
    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if (menor >= 18) {
        var stringteste = $(this).val().replace(".", "");
        stringteste = stringteste.replace("-", "");
        stringteste = stringteste.replace(".", "");

        console.log(stringteste);

        if ($(this).val() == "" || TestaCPF(stringteste) == false) {
            $(this).css({ "border-color": "#F00" });
            $(".label-cpf").css("color", "red");
            $(".cpf").css("color", "red");
        }
    }
});

function salvarEVoltar() {
    SalvarDependente();

    if (problema == false)
        window.location.href = 'venda_pf_dados_proposta.html';
}

function validarNascimentoBeneficiario() {

    if ($(".nascimento").val() == "") return false;

    var date = toDate($(".nascimento").val());

    var planosInfantisJson = getRepository("planosInfantis"); // variaveis utilizada para verificar se nascimento do beneficiario 
    var planosInfantis = [];                                  // estah de acordo com as regras do plano

    $.each(planosInfantisJson, function (indicePlano, itemPlano) {

        planosInfantis.push(itemPlano);

    });

    var possuiErros = false;
    var propostaPf = get("propostaPf");

    if (isMaiorDeIdade(date)) {

        $.each(propostaPf.planos, function (i, item) {

            var planoInfantil = planosInfantis.filter(function (x) { return x == item.cdPlano });

            if (planoInfantil.length > 0) {

                if (planoInfantil[0] == planosInfantisJson.dentalJuriorMensal || planoInfantil[0] == planosInfantisJson.dentalJuriorAnual) {

                    if ($(".cpf").val() != "" && !TestaCPF($("#cpf").val().replace(/\D/g, ''))) {

                        $("#cpf").focus();
                        exibirSwalCpfInvalidoInfantil();
                        possuiErros = true;
                        return;

                    }

                    var fraseSwal = getRepository("fraseMaiorDeIdadePlanoJunior");
                    swal(fraseSwal.title, fraseSwal.descricao, fraseSwal.tipo);
                    possuiErros = true;
                    return;

                } else if (planoInfantil[0] == planosInfantisJson.dentalDenteDeLeiteMensal || planoInfantil[0] == planosInfantisJson.dentalDenteDeLeiteAnual) {

                    if ($(".cpf").val() != "" && !TestaCPF($("#cpf").val().replace(/\D/g, ''))) {

                        $("#cpf").focus();
                        exibirSwalCpfInvalidoInfantil();
                        possuiErros = true;
                        return;

                    }

                    var fraseSwal = getRepository("fraseMaiorDeIdadePlanoDenteLeite");
                    swal(fraseSwal.title, fraseSwal.descricao, fraseSwal.tipo);
                    possuiErros = true;
                    return;

                }

            } else if ($(".cpf").val() == "" || !TestaCPF($("#cpf").val().replace(/\D/g, ''))) {

                $("#cpf").focus();
                swal("Ops!", "CPF inválido", "error");
                possuiErros = true;
                return;
            }

        })

        if (possuiErros) return false;

    } else {

        $.each(propostaPf.planos, function (i, item) {

            if (item.cdPlano == planosInfantisJson.dentalDenteDeLeiteMensal || item.cdPlano == planosInfantisJson.dentalDenteDeLeiteAnual) {

                if ($(".cpf").val() != "" && !TestaCPF($("#cpf").val().replace(/\D/g, ''))) {

                    $("#cpf").focus();
                    exibirSwalCpfInvalidoInfantil();
                    possuiErros = true;
                    return;
                }

                if (!menorQueOitoAnos(date)) {

                    var fraseSwal = getRepository("fraseMaiorDeIdadePlanoDenteLeite");
                    swal(fraseSwal.title, fraseSwal.descricao, fraseSwal.tipo);
                    possuiErros = true;
                    return;

                }

            } else if (item.cdPlano == planosInfantisJson.dentalJuriorMensal || item.cdPlano == planosInfantisJson.dentalJuriorAnual) {

                if ($(".cpf").val() != "" && !TestaCPF($("#cpf").val().replace(/\D/g, ''))) {

                    $("#cpf").focus();
                    exibirSwalCpfInvalidoInfantil();
                    possuiErros = true;
                    return;
                }

                if (menorQueOitoAnos(date) || isMaiorDeIdade(date)) {

                    var fraseSwal = getRepository("fraseMaiorDeIdadePlanoJunior");
                    swal(fraseSwal.title, fraseSwal.descricao, fraseSwal.tipo);
                    possuiErros = true;
                    return;

                }

            } else if (!TestaCPF($("#cpf").val())) {

                swal("Ops!", "CPF inválido", "error");
                $("#cpf").focus();
                possuiErros = true;
                return;

            }

        })

        if (possuiErros) return false;

    }

    return true;

}

function exibirSwalCpfInvalidoInfantil() {

    var fraseSwal = getRepository("fraseCpfInvalidoPlanoInfantil");
    swal(fraseSwal.title, fraseSwal.descricao, fraseSwal.tipo);

}