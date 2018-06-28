var preenchidos = false;

$(document).ready(function () {

    atualizarPropostaMundial();
    buscarPlanosSelecionados();
    carregarProposta();
    localStorage.removeItem("dependentePfEmEdicao");
    abrirPropostaComErros();

    $(".nome").blur(function () {

        $(".nome").val($(".nome").val().trim());

    });

    $("#adicionarPlano").click(function () {

        salvarRascunhoMemoria();
        window.location.href = "venda_index_pf.html";

    });

    $("#dataNascimentoTitular").blur(function () {

        if ($("#dataNascimentoTitular").val() == "") return;

        var date = toDate($("#dataNascimentoTitular").val());

        if (isMaiorDeIdade(date)) {

            $(".representanteContratual").addClass('hide');
            return;
        }

        $(".representanteContratual").removeClass('hide');

    });        
});

function atualizarPropostaMundial() {

    let planoProposta = get("propostaPf");



    if (planoProposta.planos[0].cdPlano == 66 || planoProposta.planos[0].cdPlano == 68) {

        planoProposta.planos[0].cdPlano = 85;

        put("propostaPf", JSON.stringify(planoProposta));


    } else if (planoProposta.planos[0].cdPlano == 67) {

        planoProposta.planos[0].cdPlano = 84;

        put("propostaPf", JSON.stringify(planoProposta));

    }

    let planoDaProposta = planoProposta.planos[0].cdPlano;

    if (planoDaProposta == 84 || planoDaProposta == 85) {
        $("#boxMundial").html('<div class="infoCopa"><p class="textCopa">#VAI<strong> TER</strong> JOGO</p><small>Durante o mundial venda planos BEM-ESTAR com condições especiais!</small></div>');

    }
}

function abrirPropostaComErros() {

    var propostaComErro = getUrlParameter("erro");

    if (propostaComErro == undefined) return;

    if (propostaComErro)
    {
        $("input").prop('disabled', true);
        $("#adicionarDependente").prop('disabled', true);
        $("#continuarProposta").prop('disabled', true);
        $("#btnExcluirPlano").addClass('hide');
        $(".btnEditar").addClass('hide');
        $(".btnExcluir").addClass('hide');

        var proposta = get("propostaPf");

        if (proposta.criticas.length > 0) {

            $("#divErros").removeClass('hide');
           
            $.each(proposta.criticas, function (i, item) {

                if (item.nome != null){
                    $("#divErros").append('<p class="labelRedErrosFontBenef">' + item.nome.toLowerCase().capitalize() + ':</p>');
                }
                
                var erros = item.dsErroRegistro.split('.');

                $.each(erros, function (indErro, erroSplit) {

                    if (erroSplit == "") return;

                    var capitalize = erroSplit.trim().split(" ");

                    $("#divErros").append('<p class="labelRedErrosFont">. ' + erroSplit.trim().toLowerCase().replace(capitalize[0].toLowerCase(), capitalize[0].toLowerCase().capitalize()) + '</p>');

                });

                $("#divErros").append("<br/>");

            });
            
        }   
    }
}

function addDependente() {

    if ($("#cpf").val() == "") {
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if (!ValidaNome($(".nome").val())) {
        swal("Ops!", "Nome inválido", "error");
        return false;
    }

    if (!TestaCPF($("#cpf").val())) {
        swal("Ops!", "CPF inválido", "error");
        return;
    }

    if ($(".nome").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        return;
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
        swal("Ops!", "Preencha o celular do titular", "error");
        return;
    }

    if ($(".celular").val().length < 14) {
        swal("Ops!", "Preencha o celular do titular", "error");
        return;
    }

    if ($(".cpf").val() == "" || !TestaCPF($("#cpf").val().replace().replace(/\D/g, ''))) {

        $("#cpf").focus();
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if (!validarData($(".nascimento").val())) {
        swal("Ops!", "Preencha uma data de nascimento válida", "error");
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a Data de Nascimento", "error");
        return;
    }

    var date = toDate($("#dataNascimentoTitular").val());

    if (!isMaiorDeIdade(date)) {

        if ($("#nomeResponsavel").val() == "") {
            swal("Ops!", "Preencha o nome do representante legal", "error");
            return;
        }

        if (!ValidaNome($("#nomeResponsavel").val())) {
            swal("Ops!", "Nome do representante legal inválido", "error");
            return false;
        }

        if ($("#emailRepresentanteLegal").val() == "") {
            swal("Ops!", "Preencha o e-mail do representante legal", "error");
            return;
        }

        if (!validateEmail($("#emailRepresentanteLegal").val())) {
            swal("Ops!", "Email do representante legal inválido", "error");
            return;
        }

        if ($(".celular-representante-legal").val() == "") {
            swal("Ops!", "Preencha o celular do representante legal", "error");
            return;
        }

        if ($(".celular-representante-legal").val().length < 14) {
            swal("Ops!", "Preencha o celular do representante legal", "error"); 
            return;
        }

        if ($("#cpf-representante").val() == "") {

            swal("Ops!", "Preencha o CPF do representante legal", "error");
            return;
        }

        if (!TestaCPF($("#cpf-representante").val().replace().replace(/\D/g, ''))) {
            swal("Ops!", "CPF do representante legal está inválido", "error");
            return;
        }

        if ($("#cpf-representante").val() == $("#cpf").val()) {

            swal("Ops!", "O representante legal não pode ter o mesmo CPF do titular", "error");
            return;
        }

        if ($("#dataNascimentoResponsavel").val() == "") {
            swal("Ops!", "Preencha a data de nascimento do responsável", "error");
            return;
        }

        var dateResponsavelLegal = toDate($("#dataNascimentoResponsavel").val());

        if (!isMaiorDeIdade(dateResponsavelLegal)) {
            swal("Ops!", "O responsável legal não pode ser menor de idade", "error");
            return;
        }

        if ($("#radio-3").is(":checked") == false && $("#radio-4").is(":checked") == false) {
            swal("Ops!", "Selecione o sexo do responsável legal", "error");
            return;
        }
    }

    var proposta = get("propostaPf");
    var planos = get("CodPlanos");
    var plano = planos.filter(function (x) { return x.cdPlano == proposta.planos[0].cdPlano });



    if (!menorQueSeteAnos(date) && plano[0].nome.indexOf("DENTE DE LEITE") !== -1) {

        swal("Ops!", "No plano dente de leite o titular deve ter menos que 7 anos", "error");
        return false;
    }

    if ($("#radio-1").is(":checked") == false && $("#radio-2").is(":checked") == false) {
        swal("Ops!", "Selecione o Sexo", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha Nome da Mãe", "error");
        return;
    }

    if (!ValidaNome($("#nomeMae").val())) {
        swal("Ops!", "Nome da mãe inválido", "error");
        return false;
    }

    if ($(".cep").val() == "") {
        swal("Ops!", "Preencha o cep", "error");
        return;
    }

    if ($("#rua").val() == "") {
        swal("Ops!", "Preencha o endereço", "error");
        return;
    }

    if ($(".numero").val() == "") {
        swal("Ops!", "Preencha o número do endereço", "error");
        return;
    }

    if ($("#bairro").val() == "") {
        swal("Ops!", "Preencha o bairro", "error");
        return;
    }

    if ($(".cidade").val() == "") {
        swal("Ops!", "Preencha o cidade", "error");
        return;
    }

    if ($(".estado").val() == "") {
        swal("Ops!", "Preencha o estado", "error");
        return;
    }

    //var idade = toDate($(".nascimento").val());
    //
    //if (!isMaiorDeIdade(idade)) {
    //    swal("Ops!", "O Titular não pode ser menor de idade", "error");
    //    return;
    //}

    salvarRascunhoMemoria();
    window.location = "venda_pf_dados_dependentes.html";
}

function buscarPlanosSelecionados() {

    var proposta = get("propostaPf");
    var planos = get("planos");

    if (proposta == null) {
        window.location.href = "venda_index_pf.html";
    }

    if (proposta.planos.length > 0) {

        $("#adicionarPlano").addClass('hide');

    }

    $.each(proposta.planos, function (i, item) {
        var o = planos.filter(function (x) { return x.cdPlano == item.cdPlano });
        var plano = getComponent("plano");

        plano = plano.replace("{CDPLANO}", o[0].cdPlano);
        plano = plano.replace("{CDPLANO-BT}", o[0].cdPlano);
        plano = plano.replace("{NOME}", o[0].nome.replace("Principal",""));
        plano = plano.replace("{DESC}", o[0].desc);
        plano = plano.replace("{VALOR}", o[0].valor);
        plano = plano.replace("{CENTAVO}", o[0].centavo);
        plano = plano.replace("{CSS}", o[0].css);
        plano = plano.replace("{CSSVALOR}", o[0].css);

        $("#planos").append(plano);
    });

    $(".labelQuantidadeBeneficiarios").addClass('hide');
}

function excluirPlano(obj) {

    if ($("#cpf").val() == "") {

        swal("Ops!", "Preencha o CPF do titular", "error");
        return;
    }

    var container = $(".div-excluir[data-id=" + $(obj).attr("data-id") + "]");
    var proposta = get("propostaPf");

    if (proposta == null) {
        proposta = getRepository("proposta");
    }

    var planosExcetoExcluido = proposta.planos.filter(function (x) { return x.cdPlano != container.attr("data-id") });
    proposta.planos = [];

    $.each(planosExcetoExcluido, function (i, item) {
        proposta.planos.push(item);
    });

    put("propostaPf", JSON.stringify(proposta));
    container.remove();

    swal({
        title: "Exclusão de Plano",
        text: "Você precisa escolher outro plano.",
        type: "info",
        showCancelButton: false,
        confirmButtonText: 'OK',
        closeOnConfirm: false,
        closeOnCancel: false
    },
        function (isConfirm) {
            salvarRascunhoMemoria();
            window.location.href = "venda_index_pf.html";
        });
}

function salvarRascunho() {

    if ($(".nome").val() == "") {
        swal("Ops!", "Preencha o Nome", "error");
        return;
    }

    if (!ValidaNome($(".nome").val())) {
        swal("Ops!", "Nome inválido", "error");
        return false;
    }

    if ($(".email").val() == "") {
        swal("Ops!", "Preencha o E-mail", "error");
        return;
    }

    if (!validateEmail($(".email").val())) {
        swal("Ops!", "Email do titular inválido", "error");
        return;
    }

    if ($(".celular").val() == "") {
        swal("Ops!", "Preencha o celular do titular", "error");
        return;
    }

    if ($(".celular").val().length < 14) {
        swal("Ops!", "Preencha o celular do titular", "error");
        return;
    }

    if ($(".cpf").val() == "" || !TestaCPF($("#cpf").val().replace().replace(/\D/g, ''))) {

        $("#cpf").focus();
        swal("Ops!", "Preencha o CPF", "error");
        return;
    }

    if ($(".nascimento").val() == "") {
        swal("Ops!", "Preencha a Data de Nascimento", "error");
        return;
    }

    if (!validarData($(".nascimento").val())) {
        swal("Ops!", "Preencha uma data de nascimento correta", "error");
        return;
    }

    if ($("#radio-1").is(":checked") == false && $("#radio-2").is(":checked") == false) {
        swal("Ops!", "Selecione o Sexo", "error");
        $(".dependentes").val(0);
        return;
    }

    if ($(".nome-mae").val() == "") {
        swal("Ops!", "Preencha Nome da Mãe", "error");
        return;
    }

    var date = toDate($("#dataNascimentoTitular").val());

    if (!isMaiorDeIdade(date)) {

        if ($("#nomeResponsavel").val() == "") {
            swal("Ops!", "Preencha o nome do representante legal", "error");
            return;
        }

        if (!ValidaNome($("#nomeResponsavel").val())) {
            swal("Ops!", "Nome do representante legal inválido", "error");
            return false;
        }

        if ($("#emailRepresentanteLegal").val() == "") {
            swal("Ops!", "Preencha o e-mail do representante legal", "error");
            return;
        }

        if (!validateEmail($("#emailRepresentanteLegal").val())) {
            swal("Ops!", "Email do representante legal inválido", "error");
            return;
        }

        if ($(".celular-representante-legal").val() == "") {
            swal("Ops!", "Preencha o celular do representante legal", "error");
            return;
        }

        if ($(".celular-representante-legal").val().length < 14) {
            swal("Ops!", "Preencha o celular do representante legal", "error");
            return;
        }

        if ($("#cpf-representante").val() == "") {

            swal("Ops!", "Preencha o CPF do representante legal", "error");
            return;
        }

        if (!TestaCPF($("#cpf-representante").val().replace().replace(/\D/g, '')))
        {
            swal("Ops!", "CPF do representante legal está inválido", "error");
            return;
        }

        if ($("#dataNascimentoResponsavel").val() == "") {
            swal("Ops!", "Preencha a data de nascimento do responsável", "error");
            return;
        }

        var dateResponsavelLegal = toDate($("#dataNascimentoResponsavel").val());

        if (!isMaiorDeIdade(dateResponsavelLegal)) {
            swal("Ops!", "O responsável legal não pode ser menor de idade", "error");
            return;
        }

        if ($("#radio-3").is(":checked") == false && $("#radio-4").is(":checked") == false) {
            swal("Ops!", "Selecione o sexo do responsável legal", "error");
            $(".dependentes").val(0);
            return;
        }
    }

    var proposta = get("propostaPf");

    if (proposta.planos.length == 0) {

        swal("Ops!", "Por favor, escolha um plano!", "error");
        return;
    }

    var planos = get("CodPlanos");
    var plano = planos.filter(function (x) { return x.cdPlano == proposta.planos[0].cdPlano });



    if (!menorQueSeteAnos(date) && plano[0].nome.indexOf("DENTE DE LEITE") !== -1) {

        swal("Ops!", "No plano dente de leite o titular deve ter menos que 7 anos", "error");
        return false;
    }

    if (!ValidaNome($("#nomeMae").val())) {
        swal("Ops!", "Nome da mãe inválido", "error");
        return false;
    }

    if ($(".cep").val() == "") {
        swal("Ops!", "Preencha o cep", "error");
        return;
    }

    if ($("#rua").val() == "") {
        swal("Ops!", "Preencha o endereço", "error");
        return;
    }

    if ($(".numero").val() == "") {
        swal("Ops!", "Preencha o número do endereço", "error");
        return;
    }

    if ($("#bairro").val() == "") {
        swal("Ops!", "Preencha o bairro", "error");
        return;
    }

    if ($(".cidade").val() == "") {
        swal("Ops!", "Preencha o cidade", "error");
        return;
    }

    if ($(".estado").val() == "") {
        swal("Ops!", "Preencha o estado", "error");
        return;
    }


    //var currentYear = (new Date).getFullYear();
    //var idade = $(".nascimento").val().split("/");
    //var menor = currentYear - idade[2];
    //
    //if (menor < 18) {
    //    swal("Ops!", "O Titular não pode ser menor de idade", "error");
    //    return;
    //}

    salvarRascunhoMemoria();
    window.location.href = "resumo_pf_proposta.html";
}

function salvarRascunhoMemoria() {

    var proposta = get("propostaPf");
    proposta.status = "DIGITANDO";
    proposta.nome = $(".nome").val();
    proposta.cpf = $(".cpf").val();
    proposta.nomeMae = $("#nomeMae").val();
    proposta.dataNascimento = $(".nascimento").val();

    var date = toDate($("#dataNascimentoTitular").val());

    if (!isMaiorDeIdade(date)) {
        //$(".representanteContratual").addClass('hide');

        proposta.responsavelContratual.nome = $("#nomeResponsavel").val();
        proposta.responsavelContratual.cpf = $("#cpf-representante").val();
        proposta.responsavelContratual.dataNascimento = $("#dataNascimentoResponsavel").val();
        proposta.responsavelContratual.email = $("#emailRepresentanteLegal").val();
        proposta.responsavelContratual.celular = $(".celular-representante-legal").val();

        if ($("#radio-3").is(":checked") == true) {
            proposta.responsavelContratual.sexo = $("#radio-3").val();
        }
        else {
            proposta.responsavelContratual.sexo = $("#radio-4").val();
        }

        proposta.responsavelContratual.endereco.cep = $(".cep").val();
        proposta.responsavelContratual.endereco.logradouro = $(".endereco").val();
        proposta.responsavelContratual.endereco.numero = $(".numero").val();
        proposta.responsavelContratual.endereco.complemento = $(".complemento").val();
        proposta.responsavelContratual.endereco.bairro = $(".bairro").val();
        proposta.responsavelContratual.endereco.cidade = ($(".cidade").val());
        proposta.responsavelContratual.endereco.estado = $(".estado").val();
    }

    proposta.contatoEmpresa = $("#squaredOne").is(":checked");
    proposta.telefone = $(".telefone").val();
    proposta.celular = $(".celular").val();
    proposta.email = $(".email").val();
    proposta.endereco.cep = $(".cep").val();
    proposta.endereco.logradouro = $(".endereco").val();
    proposta.endereco.numero = $(".numero").val();
    proposta.endereco.complemento = $(".complemento").val();
    proposta.endereco.bairro = $(".bairro").val();
    proposta.endereco.cidade = ($(".cidade").val());
    proposta.endereco.estado = $(".estado").val();

    if ($("#radio-1").is(":checked") == true) {
        proposta.sexo = $("#radio-1").val();
    }
    else {
        proposta.sexo = $("#radio-2").val();
    }

    var pessoas = get("pessoas");

    if (pessoas == null) {
        pessoas = [];
        pessoas.push(proposta);
    }
    else {
        var propostas = pessoas.filter(function (x) { return x.cpf != proposta.cpf });
        pessoas = []; //limpar

        $.each(propostas, function (i, item) {
            pessoas.push(item);
        });

        pessoas.push(proposta);
    }

    put("pessoas", JSON.stringify(pessoas));
    put("propostaPf", JSON.stringify(proposta));
}

function carregarProposta() {
    var proposta = get("propostaPf");
    $("#nomeBeneficiario").val(proposta.nome);
    $(".cpf").val(proposta.cpf);

    //if (proposta.contatoEmpresa) {
    //    $("#squaredOne").attr("checked", true);
    //}
    //else {
    //    $("#squaredOne").attr("checked", false);
    //}

    if (proposta.sexo == "m") {
        $("#radio-2").attr("checked", true);
    }
    else {
        $("#radio-1").attr("checked", true);
    }

    $("#nomeMae").val(proposta.nomeMae);
    $(".telefone").val(proposta.telefone);
    $(".nascimento").val(proposta.dataNascimento);

    if (proposta.dataNascimento != "") {

        var date = toDate(proposta.dataNascimento);

        if (!isMaiorDeIdade(date)) {

            $(".representanteContratual").removeClass('hide');

            $("#nomeResponsavel").val(proposta.responsavelContratual.nome);
            $("#cpf-representante").val(proposta.responsavelContratual.cpf);
            $("#dataNascimentoResponsavel").val(proposta.responsavelContratual.dataNascimento);
            $("#emailRepresentanteLegal").val(proposta.responsavelContratual.email);
            $(".celular-representante-legal").val(proposta.responsavelContratual.celular);

            if (proposta.responsavelContratual.sexo == "m") {
                $("#radio-4").attr("checked", true);
            }
            else {
                $("#radio-3").attr("checked", true);
            }
        }
    }

    $(".celular").val(proposta.celular);
    $(".email").val(proposta.email);
    $(".cep").val(proposta.endereco.cep);
    $(".endereco").val(proposta.endereco.logradouro);
    $(".numero").val(proposta.endereco.numero);
    $(".complemento").val(proposta.endereco.complemento);
    $(".bairro").val(proposta.endereco.bairro);
    $(".cidade").val(proposta.endereco.cidade);
    $(".estado").val(proposta.endereco.estado);

    listarDependentes();
}

function listarDependentes() {
    var proposta = get("propostaPf");

    $.each(proposta.dependentes, function (i, item) {

        var dep = getComponent("dependente");
        dep = dep.replace("{CPF}", (item.cpf == "" ? item.nome : item.cpf));
        dep = dep.replace("{CPF-BT}", (item.cpf == "" ? item.nome : item.cpf));
        dep = dep.replace("{CPF-BTN-EDITAR}", (item.cpf == "" ? item.nome : item.cpf));
        dep = dep.replace("{CPF-DESC}", item.cpf);
        dep = dep.replace("{NOME}", item.nome);
        dep = dep.replace("{NOME-DEP}", item.nome);
        $("#listaDep").append(dep);
    });

    //$(".btnEditar").addClass('hide');
}

function editarDependente(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");
    var beneficiario = get("propostaPf");

    var beneficiarioEmEdicao = beneficiario.dependentes.filter(function (x) {

        if (container.attr("data-id") == container.attr("data-nome")) return x.nome == container.attr("data-nome")

        return x.cpf == container.attr("data-id")
    });

    put("dependentePfEmEdicao", JSON.stringify(beneficiarioEmEdicao[0]));

    window.location.href = "venda_pf_dependente_edicao.html";
}


function excluirDep(obj) {

    var container = $(".div-excluir[data-id='" + $(obj).attr("data-id") + "']");

    //if (container.length == 0) {
    //
    //    var container = $(".div-excluir[data-id='" + $(obj).attr("data-nome") + "']");
    //}
    var proposta = get("propostaPf");

    var propostaExcetoExcluido = proposta.dependentes.filter(function (x) {

        if (container.attr("data-id") == container.attr("data-nome")) return x.nome != container.attr("data-nome")

        return x.cpf != container.attr("data-id")
    });

    proposta.dependentes = [];

    $.each(propostaExcetoExcluido, function (i, item) {
        proposta.dependentes.push(item);
    });

    put("propostaPf", JSON.stringify(proposta));
    container.remove();

    atualizarPessoas(proposta);
}


// Mantém os inputs em cache:
var inputs = $('input');

// Chama a função de verificação quando as entradas forem modificadas
// Usei o 'keyup', mas 'change' ou 'keydown' são também eventos úteis aqui
inputs.on('keyup', verificarInputs);

function verificarInputs() {
    inputs.each(function () {
        // verificar um a um e passar a false se algum falhar
        // no lugar do if pode-se usar alguma função de validação, regex ou outros
        var id = this.id;
        //console.log(id);

        if (!this.value) {
            preenchidos = false;
            //swal("Ops!", "Por Favor preencha todos os Dados");

            // parar o loop, evitando que mais inputs sejam verificados sem necessidade
            return false;
        }

    });

    preenchidos = true;  // assumir que estão preenchidos

    // Habilite, ou não, o <button>, dependendo da variável:
    $("#continuarVendaPf").removeClass('disabled'); //,
    return true;
}