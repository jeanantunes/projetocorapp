package models;

/**
 * Created by Treinamento6 on 02/02/2018.
 */

public class Endereco {

    private String Logradouro;
    private String Cep;
    private String Cidade;
    private String Complemento;
    private String Bairro;
    private String Uf;
    private String Numero;

    public Endereco(String logradouro, String cep, String cidade, String complemento, String bairro, String uf, String numero) {
        Logradouro = logradouro;
        Cep = cep;
        Cidade = cidade;
        Complemento = complemento;
        Bairro = bairro;
        Uf = uf;
        Numero = numero;
    }

    public String getNumero() {
        return Numero;
    }

    public void setNumero(String numero) {
        Numero = numero;
    }

    public String getLogradouro() {
        return Logradouro;
    }

    public void setLogradouro(String logradouro) {
        Logradouro = logradouro;
    }

    public String getCep() {
        return Cep;
    }

    public void setCep(String cep) {
        Cep = cep;
    }

    public String getCidade() {
        return Cidade;
    }

    public void setCidade(String cidade) {
        Cidade = cidade;
    }

    public String getComplemento() {
        return Complemento;
    }

    public void setComplemento(String complemento) {
        Complemento = complemento;
    }

    public String getBairro() {
        return Bairro;
    }

    public void setBairro(String bairro) {
        Bairro = bairro;
    }

    public String getUf() {
        return Uf;
    }

    public void setUf(String uf) {
        Uf = uf;
    }

}
