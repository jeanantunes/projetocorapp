package models;

import android.util.Log;

public class Cliente
{
    public Cliente(String nome, String cpf, String celular, String email, String senha) {
        this.nome = nome;
        this.cpf = cpf;
        this.celular = celular;
        this.email = email;
        this.senha = senha;
    }

    public Cliente() {
    }

    @android.webkit.JavascriptInterface
    public String getNome() {
        return nome;
    }

    @android.webkit.JavascriptInterface
    public void setNome(String nome) {
        this.nome = nome;
    }

    @android.webkit.JavascriptInterface
    public String getCpf() {
        return cpf;
    }

    @android.webkit.JavascriptInterface
    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @android.webkit.JavascriptInterface
    public String getCelular() {
        return celular;
    }

    @android.webkit.JavascriptInterface
    public void setCelular(String celular) {
        this.celular = celular;
    }

    @android.webkit.JavascriptInterface
    public String getSenha() {
        return senha;
    }

    @android.webkit.JavascriptInterface
    public void setSenha(String senha) {
        this.senha = senha;
    }

    @android.webkit.JavascriptInterface
    public String getEmail() {
        return email;
    }

    @android.webkit.JavascriptInterface
    public void setEmail(String email) {
        this.email = email;
    }

    private String cpf;
    private String nome;
    private String celular;
    private String email;
    private String senha;



    @android.webkit.JavascriptInterface
    public void imprimirEmail()
    {
        Log.d("MeuLog", "Funfou ");
    }
}
