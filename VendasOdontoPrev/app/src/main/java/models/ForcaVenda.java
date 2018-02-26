package models;

import android.accessibilityservice.GestureDescription;

/**
 * Created by Treinamento6 on 22/02/2018.
 */

public class ForcaVenda
{
    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getNomeEmpresa() {
        return nomeEmpresa;
    }

    public void setNomeEmpresa(String nomeEmpresa) {
        this.nomeEmpresa = nomeEmpresa;
    }

    public String getNomeGerente() {
        return nomeGerente;
    }

    public void setNomeGerente(String nomeGerente) {
        this.nomeGerente = nomeGerente;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getRg() {
        return rg;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getLogado() {
        return logado;
    }

    public void setLogado(String logado) {
        this.logado = logado;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    String cpf;
    String email;
    String login;
    String nome;
    String nomeEmpresa;
    String nomeGerente;
    String responsavel;
    String rg;
    String fotoPerfil;
    String cargo;
    String logado;
    String codigo;

    public ForcaVenda(String cpf, String email, String login, String nome, String nomeEmpresa, String nomeGerente, String responsavel, String rg, String fotoPerfil, String cargo, String codigo) {

        this.cpf = cpf;
        this.email = email;
        this.login = login;
        this.nome = nome;
        this.nomeEmpresa = nomeEmpresa;
        this.nomeGerente = nomeGerente;
        this.responsavel = responsavel;
        this.rg = rg;
        this.fotoPerfil = fotoPerfil;
        this.cargo = cargo;
        this.codigo = codigo;

    }

    public ForcaVenda() {
    }


}
