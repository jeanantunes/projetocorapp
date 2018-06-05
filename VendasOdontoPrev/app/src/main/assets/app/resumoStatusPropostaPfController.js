$(document).ready(function () {

    popularCamposProposta();
})

function popularCamposProposta() {

    let resumoProposta = get("resumoStatusPropostaPf");
    //retorno.cdVenda;
    $("#nomeTitular").html(resumoProposta.nome);
    $("#emailTitular").html(resumoProposta.email);
    $("#celularTitular").html(resumoProposta.celular);
    $("#cpfTitular").html(resumoProposta.cpf);
    $("#dataNascimentoTitular").html(resumoProposta.dataNascimento);
    $("#sexoTitular").html(resumoProposta.sexo == "f" ? "Feminino" : "Masculino");
    $("#nomeMaeTitular").html(resumoProposta.nomeMae);

    $("#cepTitular").html(resumoProposta.endereco.cep);
    $("#enderecoTitular").html(resumoProposta.endereco.logradouro);
    $("#numeroLogradouroTitular").html(resumoProposta.endereco.numero);
    $("#complementoTitular").html(resumoProposta.endereco.complemento == null ? "Não há complemento" : resumoProposta.endereco.complemento);
    $("#bairroTitular").html(resumoProposta.endereco.bairro);
    $("#cidadeTitular").html(resumoProposta.endereco.cidade);
    $("#estadoTitular").html(resumoProposta.endereco.estado);

    let componenteBoxPlano = getComponent("plano");
    let planos = get("planos");

    let planoSelecionado = planos.filter(function (x) { return x.cdPlano == resumoProposta.planos[0].cdPlano });
    let valorDoPlano = planoSelecionado[0].valorFloat;

    var valorTotalProposta = (valorDoPlano * (resumoProposta.dependentes.length + 1)) * 12;
    valorTotalProposta = valorTotalProposta.toFixed(2);

    //if ((valorTotalProposta % 2) == 0 || (valorTotalProposta % 2) == 1) {
    //    var valorReal = valorTotalProposta;
    //    var valorCent = "00";
    //} else {
    //    
    //    var valorString = valorTotalProposta.toString();
    //    console.log(valorTotalProposta.indexOf("."));
    //    var position = valorTotalProposta.indexOf(".");
    //    var tamanhoString = valorTotalProposta.toString().length;
    //
    //    var valorReal = valorTotalProposta.substring(0, position);
    //    var valorCent = valorTotalProposta.substring(position + 1, position + 3);
    //
    //    if (valorCent.toString().length == 1) valorCent = parseFloat(valorCent.toString() + "0");
    //}

    componenteBoxPlano = componenteBoxPlano.replace("{VALOR}", planoSelecionado[0].valor); 
    componenteBoxPlano = componenteBoxPlano.replace("{CENTAVO}", planoSelecionado[0].centavo); 
    componenteBoxPlano = componenteBoxPlano.replace("{NOME}", planoSelecionado[0].nome);
    componenteBoxPlano = componenteBoxPlano.replace("{DESC}", planoSelecionado[0].desc);
    componenteBoxPlano = componenteBoxPlano.replace("{CSS}", planoSelecionado[0].css);
    componenteBoxPlano = componenteBoxPlano.replace("{CSSVALOR}", planoSelecionado[0].css);
    componenteBoxPlano = componenteBoxPlano.replace("{QUANTBENEF}", "Total por ano R$ " + valorTotalProposta.replace(".", ","));

    $("#planos").html(componenteBoxPlano);
    $("#btnExcluirPlano").addClass('hide');
    $("#labelTipo").css('margin-top', '10px');
}