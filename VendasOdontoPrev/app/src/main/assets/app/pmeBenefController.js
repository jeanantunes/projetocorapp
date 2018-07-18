var problema = true;

$(document).ready(function () {
    localStorage.removeItem("beneficiarioEmEdicao");
    carregarLista();
    carregarBoxPlanos();
    carregarBenef();

    $(".dependentes").change(function () {



        var benef = get("beneficiario");

        if (benef != null) {
            if ($(".dependentes").val() < benef.dependentes.length) {

                swal("Ops!", "Para diminuir a quantidade de dependentes, use o botão excluir", "error");
                $(".dependentes").val(benef.dependentes.length);
                return;
            }
        }

        adicionarBenefMemoria();

        if (problema) {

            $(".dependentes").val(0);
            return;

        }

        var proposta = get("proposta");
        var benef = get("beneficiario");

        benef.dependentes = [];
        proposta.dependentes = [];
        atualizarEmpresas(proposta);

        put("proposta", JSON.stringify(proposta));
        put("beneficiario", JSON.stringify(benef));
        put("numeroDependentes", $(".dependentes").val());

        if ($(".dependentes").val() == 0) return;

        window.location.href = "venda_pme_dependentes.html";
    });
});

function carregarBoxPlanos() {

    var propostaPlanos = get("proposta");

    var sel = document.getElementById('planosPme');

    var planos = get("planos");

    $.each(propostaPlanos.planos, function (i, item) {

        var o = planos.filter(function (x) { return x.cdPlano == item.cdPlano });

        var plano = o[0].nome;
        var codigo = o[0].cdPlano;

        var opt = document.createElement('option');
        ////console.log(dataEspecialidades[i].descricao);
        opt.setAttribute('value', codigo);
        ////console.log(dataEspecialidades[i].codigo);
        opt.appendChild(document.createTextNode(plano));
        sel.appendChild(opt);

    });
}

function carregarLista() {

    var proposta = get("proposta");

    $("#razaoSocial").html(proposta.razaoSocial);
    $("#cnpjEmpresa").html(proposta.cnpj);


}

function salvarBenef() {

    adicionarBenefMemoria();

    if (problema)
        return;

    var benef = get("beneficiario");
    var beneficiarios = get("beneficiarios");

    if (beneficiarios == null) {
        beneficiarios = [];
    }

    var beneficiarioEmEdicao = get("cpfEmEdicaoPME");

    if (beneficiarioEmEdicao != null) {

        var beneficiariosExcetoEmEdicao = beneficiarios.filter(function (x) { return x.cpf != beneficiarioEmEdicao });
        beneficiarios = []; // limpa os beneficiarios
        beneficiarios = beneficiariosExcetoEmEdicao;
        put("beneficiarios", JSON.stringify(beneficiarios));

    }

    //if (benef.cpf != )

    beneficiarios.push(benef);

    put("beneficiarios", JSON.stringify(beneficiarios));

    swal({
        title: "Feito!",
        text: "Beneficiário cadastrado com sucesso.",
        type: "success",
        showCancelButton: false,
        confirmButtonText: 'OK',
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            window.location.href = "venda_pme_beneficiarios_lista.html";
        });
}

//$("#cpf").blur(function () {
//
//    if (!TestaCPF($("#cpf").val().replace(/\D/g, ''))) {
//        swal("Ops", "CPF inválido", "error");
//    }
//});

function carregarBenef() {
    var benef = get("beneficiario");

    if (benef == null) {
        return;
    }

    $("#nome-beneficiario").val(benef.nome);
    $(".nome-mae").val(benef.nomeMae);

    $(".dependentes").val(benef.dependentes.length);

    if (benef.sexo == "m") {
        $("#radio-2").attr("checked", true);
    }
    else {
        $("#radio-1").attr("checked", true);
    }

    $(".nascimento").val(benef.dataNascimento);
    $(".cpf").val(benef.cpf);
    $(".cep").val(benef.endereco.cep);
    $(".plano").val(benef.cdPlano);

    listarDependentes();
}

function listarDependentes() {
    var proposta = get("beneficiario");

    $.each(proposta.dependentes, function (i, item) {
        var dep = getComponent("dependente");
        dep = dep.replace("{CPF}", (item.cpf == "" ? item.nome : item.cpf));
        dep = dep.replace("{CPF-BT}", (item.cpf == "" ? item.nome : item.cpf));
        dep = dep.replace("{CPF-BTN-EDITAR}", (item.cpf == "" ? item.nome : item.cpf));
        dep = dep.replace("{NOME-BTN-EDITAR}", item.nome);
        dep = dep.replace("{NASCIMENTO-EDITAR}", item.dataNascimento);
        dep = dep.replace("{CPF-DESC}", item.cpf);
        dep = dep.replace("{NOME}", item.nome);
        dep = dep.replace("{NOME-DEP}", item.nome);
        $("#listaDep").append(dep);
    });
}

/*function adicionarBenefMemoria() {
    var proposta = get("proposta");
    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade;


    if ($("#nome-beneficiario").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        $(".dependentes").val(0);
        return;
    }

    if (!ValidaNome($("#nome-beneficiario").val())) {
        swal("Ops!", "Nome inválido", "error");
        return false;
    }

    if ($("#radio-1").is(":checked") == false && $("#radio-2").is(":checked") == false) {
        swal("Ops!", "Selecione o Sexo", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a Data de Nascimento", "error");
        $(".dependentes").val(0);
        return;
    }

    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if (($(".cpf").val() == "" || !TestaCPF($(".cpf").val().replace(/\D/g, ''))) && menor > 17) {

        swal("Ops!", "CPF está inválido", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha o Nome da Mãe", "error");
        $(".dependentes").val(0);
        return;
    }

    if (!ValidaNome($(".nome-mae").val())) {
        swal("Ops!", "Nome da mãe inválido", "error");
        return false;
    }

    if ($(".cep").val() == "") {
        swal("Ops!", "Preencha o CEP", "error");
        $(".dependentes").val(0);
        return;
    }

    if (!validarData($(".nascimento").val())) {
        swal("Ops!", "Preencha uma data de nascimento correta", "error");
        return;
    }

    var cpfAtual = $(".cpf").val();
    var propostaA = get("proposta");
    var benefs = get("beneficiarios");
    var dependsCpf = false;
    benefs = benefs.filter(function (x) { return x.cnpj == propostaA.cnpj });
    var oe = benefs.filter(function (x) { return x.cpf == cpfAtual });

    if (oe.length >= 1) {
        swal("Conflito!", "Você informou o mesmo CPF de outro titular para este titular, por favor verifique.", "error");
        stop = true;
        return;
    }

    $.each(benefs, function (i, item) {
        $.each(item.dependentes, function (i, param) {
            if (param.cpf == cpfAtual) {
                dependsCpf = true;
            }
        });
    });

    if (dependsCpf) {
        swal("Conflito!", "Você informou o mesmo CPF de outro Dependente para este Titular, por favor verifique.", "error");
        stop = true;
        return;
    }


    //if (menor < 18) {
    //    swal("Ops!", "O Titular não pode ser menor de idade", "error");
    //    $(".dependentes").val(0);
    //    return;
    //}

    var benef = getRepository("beneficiario");
    var benefMemoria = get("beneficiario");
    var benefTodos = get("beneficiarios");

    if (benefTodos != null && $("#cpf").val() != "") {
        var existe = benefTodos.filter(function (x) { return x.cpf == $("#cpf").val() });

        if (existe.length > 0) {
            swal("Conflito!", "Já existe um Beneficiário com este CPF", "error");
            $(".dependentes").val(0);
            return;
        }
    }

    if (benefMemoria != null) {
        benef.dependentes = benefMemoria.dependentes;
    }

    problema = false;

    benef.nome = removerAcentos($("#nome-beneficiario").val());
    benef.nomeMae = removerAcentos($(".nome-mae").val());

    if ($("#radio-1").is(":checked") == true) {
        benef.sexo = $("#radio-1").val();
    }
    else {
        benef.sexo = $("#radio-2").val();
    }

    benef.dataNascimento = $(".nascimento").val();
    benef.cpf = $(".cpf").val();
    benef.cnpj = proposta.cnpj;
    benef.endereco.cep = $(".cep").val();
    benef.cdPlano = $(".plano").val();

    put("beneficiario", JSON.stringify(benef));

    return benef;
}
*/


function adicionarBenefMemoria() {
    var proposta = get("proposta");
    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade;


    if ($("#nome-beneficiario").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        $(".dependentes").val(0);
        return;
    }

    if (!ValidaNome($("#nome-beneficiario").val())) {
        swal("Ops!", "Nome inválido", "error");
        $(".dependentes").val(0);
        return false;
    }

    if ($("#radio-1").is(":checked") == false && $("#radio-2").is(":checked") == false) {
        swal("Ops!", "Selecione o Sexo", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a Data de Nascimento", "error");
        $(".dependentes").val(0);
        return;
    }

    var currentYear = (new Date).getFullYear();
    var idade = $(".nascimento").val().split("/");
    var menor = currentYear - idade[2];

    if (($(".cpf").val() == "")) {

        swal("Ops!", "Preencha o campo CPF", "error");
        $(".dependentes").val(0);
        return;
    }

    if (($(".cpf").val() == "" || !TestaCPF($(".cpf").val().replace(/\D/g, '')))) {

        swal("Ops!", "CPF está inválido", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha o Nome da Mãe", "error");
        $(".dependentes").val(0);
        return;
    }

    if (!ValidaNome($(".nome-mae").val())) {
        swal("Ops!", "Nome da mãe inválido", "error");
        $(".dependentes").val(0);
        return false;
    }

    if ($(".cep").val() == "") {
        swal("Ops!", "Preencha o CEP", "error");
        $(".dependentes").val(0);
        return;
    }

    if (!validarData($(".nascimento").val())) {
        swal("Ops!", "Preencha uma data de nascimento correta", "error");
        $(".dependentes").val(0);
        return;
    }

    let cpfsProposta = listCpfPropostaPme();

    let cpfEmEdicao = get("cpfEmEdicaoPME");

    if (cpfEmEdicao == null && cpfsProposta.length > 0) {

        let checkCpf = cpfsProposta.filter(function (x) { return x == $("#cpf").val() });

        if (checkCpf.length > 0) {

            swal("Ops!", "CPF já informado anteriormente.", "error");
            return;
        }

    } else if (cpfEmEdicao != null && cpfsProposta.length > 0) {

        let removeCpfEdicao = cpfsProposta.filter(function (x) { return x != cpfEmEdicao });
        let checkCpf = removeCpfEdicao.filter(function (x) { return x == $("#cpf").val() });

        if (checkCpf.length > 0) {

            swal("Ops!", "CPF já informado anteriormente.", "error");
            return;
        }

    }

    //if (menor < 18) {
    //    swal("Ops!", "O Titular não pode ser menor de idade", "error");
    //    $(".dependentes").val(0);
    //    return;
    //}

    var benef = getRepository("beneficiario");
    var benefMemoria = get("beneficiario");
    var benefTodos = get("beneficiarios");

    if (benefTodos != null && $("#cpf").val() != "") {

        var beneficiarioSendoEditado = false;

        if (benefMemoria != null) {

            if (benefMemoria.cpf == $("#cpf").val()) beneficiarioSendoEditado = true;

        }

        var existe = benefTodos.filter(function (x) { return x.cpf == $("#cpf").val() });

        if (existe.length > 0 && !beneficiarioSendoEditado) {
            swal("Conflito!", "Já existe um Beneficiário com este CPF", "error");
            $(".dependentes").val(0);
            return;
        }
    }

    if (benefMemoria != null) {
        benef.dependentes = benefMemoria.dependentes;
    }

    problema = false;

    benef.nome = removerAcentos($("#nome-beneficiario").val());
    benef.nomeMae = removerAcentos($(".nome-mae").val());

    if ($("#radio-1").is(":checked") == true) {
        benef.sexo = $("#radio-1").val();
    }
    else {
        benef.sexo = $("#radio-2").val();
    }

    benef.dataNascimento = $(".nascimento").val();
    benef.cpf = $(".cpf").val();
    benef.cnpj = proposta.cnpj;
    benef.endereco.cep = $(".cep").val();
    benef.cdPlano = $(".plano").val();

    put("beneficiario", JSON.stringify(benef));

    return benef;
}

function excluirDep(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");

    //if (container.length == 0) {
    //
    //    var container = $(".div-excluir[data-id='" + $(obj).attr("data-nome") + "']");
    //}
    var beneficiario = get("beneficiario");

    var beneficiarioExcetoExcluido = beneficiario.dependentes.filter(function (x) {

        if (container.attr("data-id") == container.attr("data-nome")) return x.nome != container.attr("data-nome")

        return x.cpf != container.attr("data-id")
    });

    beneficiario.dependentes = [];

    $.each(beneficiarioExcetoExcluido, function (i, item) {
        beneficiario.dependentes.push(item);
    });

    $("#dependentesPME").val(beneficiario.dependentes.length);

    put("beneficiario", JSON.stringify(beneficiario));
    container.remove();

    //atualizarPessoas(proposta);
}

function editarDependente(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");
    var beneficiario = get("beneficiario");

    var beneficiarioEmEdicao = beneficiario.dependentes.filter(function (x) {

        if (container.attr("data-id") == container.attr("data-nome")) return x.nome == container.attr("data-nome")

        return x.cpf == container.attr("data-id")
    });

    put("beneficiarioEmEdicao", JSON.stringify(beneficiarioEmEdicao[0]));

    window.location.href = "venda_pme_dependente_edicao.html";
}




