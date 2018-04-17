$(document).ready(function () {
    carregarDependente();

});



function carregarDependente() {
    var benef = get("beneficiario");
    $("#nome-titular").html(benef.nome);
    var beneficiarioEmEdicao = get("beneficiarioEmEdicao");
    $(".boxDependente").each(function () {

        $(this).find(".nome-dependente").val(beneficiarioEmEdicao.nome);
        $(this).find(".sexo").val(beneficiarioEmEdicao.sexo);
        $(this).find(".nascimento").val(beneficiarioEmEdicao.dataNascimento);
        $(this).find(".cpf").val(beneficiarioEmEdicao.cpf);
        $(this).find(".nome-mae").val(beneficiarioEmEdicao.nomeMae);
    });
}


function SalvarDependentes() {
    var stop = false;


        if ($(".nome-dependente").val() == "") {
            swal("Ops!", "Preencha o Nome do " + $(".depends").html(), "error");
            stop = true;
            return;
        }

        if (!ValidaNome($(".nome-dependente").val())) {
            swal("Ops!", $(".depends").html() + ": nome inválido", "error");
            stop = true;
            return false;
        }

        if ($(".sexo").val() == "") {
            swal("Ops!", "Selecione o Sexo do " + $(".depends").html(), "error");
            stop = true;
            return;
        }

        if ($(".nascimento").val() == "") {
            swal("Ops!", "Preencha a data de nascimento do " + $(".depends").html(), "error");
            stop = true;
            return;
        }

        if ($(".cpf").val() != "" && getInputsByValue($(".cpf").val()).length > 1) {
            swal("Ops!", "Existem dependentes com o mesmo CPF, por favor verifique.", "error");
            stop = true;
            return;
        }

        if (!validarData($(".nascimento").val())) {
            swal("Ops!", "Preencha uma data de nascimento correta do " + $(".depends").html(), "error");
            stop = true;
            return;
        }

        var currentYear = (new Date).getFullYear();
        var idade = $(".nascimento").val().split("/");
        var menor = currentYear - idade[2];

        if (menor >= 18) {
            if ($(".cpf").val() == "") {
                console.log("Validando cpf");
                swal("Ops!", "CPF está inválido", "error");
                stop = true;
                return;
            }
        }

        if ($(".cpf").val() != "" && !TestaCPF($(".cpf").val().replace(/\D/g, ''))) {
            swal("Ops!", "CPF está inválido", "error");
            stop = true;
            return;
        }

        var benef = get("beneficiario");
        if ($(".cpf").val() != "" && benef.cpf == $(".cpf").val()) {
            swal("Conflito!", "Você informou o mesmo CPF do titular para este dependente, por favor verifique.", "error");
            stop = true;
            return;
        }

        var cpfAtual = $(".cpf").val();
        var checkSeDependenteExiste = benef.dependentes.filter(function (x) { return x.cpf == cpfAtual });
        var beneficiarioEmEdicao = get("beneficiarioEmEdicao");

        if (checkSeDependenteExiste.length > 0 && cpfAtual != beneficiarioEmEdicao.cpf) {

            swal("Conflito!", "Você informou o mesmo CPF de outro dependente para este dependente, por favor verifique.", "error");
            stop = true;
            return;
        }

        
        if (benefs != null) {
            var benefs = get("beneficiarios");
            var cpfAtual = $(".cpf").val();
            benefs = benefs.filter(function (x) { return x.cnpj == benef.cnpj });
            var oe = benefs.filter(function (x) { return x.cpf == cpfAtual });
            var dependsCpf = false;

            if (oe.length >= 1 && cpfAtual != "") {
                swal("Conflito!", "Você informou o mesmo CPF de outro titular para este dependente, por favor verifique.", "error");
                stop = true;
                return;
            }

            $.each(benefs, function (i, item) {


                    var dependentesIguais = item.dependentes.filter(function (x) {

                        if (x.cpf == cpfAtual && cpfAtual != "" && x.cpf != "") return x.cpf;

                        return;
                    });

                    //console.log(param);
                    if (dependentesIguais.length > 0) {
                        
                        dependsCpf = true;
                    }


            });

            if (dependsCpf) {
                swal("Conflito!", "Você informou o mesmo CPF de outro Dependente para este dependente, por favor verifique.", "error");
                stop = true;
                return;
            }
        }

        if ($(".nome-mae").val() == "") {
            swal("Ops!", "Preencha o Nome da Mãe do " + $(".depends").html(), "error");
            stop = true;
            return;
        }

        if (!ValidaNome($(".nome-mae").val())) {
            swal("Ops!", $(".depends").html() + ": nome da mãe inválido", "error");
            stop = true;
            return false;
        }


    if (stop)
        return;

    $(".boxDependente").each(function () {

        var benef = get("beneficiario");
        var dependente = getRepository("dependente");
        var dependenteEmEdicao = get("beneficiarioEmEdicao");
        dependente.nome = removerAcentos($(".nome-dependente").val());
        dependente.dataNascimento = $(".nascimento").val();
        dependente.cpf = $(".cpf").val();
        dependente.nomeMae = removerAcentos($(".nome-mae").val());
        dependente.dataNascimento = $(".nascimento").val();
        dependente.sexo = $(".sexo").val();
        dependente.celular = $(".celular").val();


        var dependentesExcetoEditado = benef.dependentes.filter(function (x) {

            if (dependenteEmEdicao.cpf == "")
            {
                return x.nome != dependenteEmEdicao.nome && x.dataNascimento != dependenteEmEdicao.dataNascimento;               
            }

            return x.cpf != dependenteEmEdicao.cpf
        });

        benef.dependentes = [];

        if (dependentesExcetoEditado.length > 0) benef.dependentes.push(dependentesExcetoEditado[0]);
        
        benef.dependentes.push(dependente);

        put("beneficiario", JSON.stringify(benef));
    });

    window.location.href = 'venda_pme_beneficiarios.html';
}