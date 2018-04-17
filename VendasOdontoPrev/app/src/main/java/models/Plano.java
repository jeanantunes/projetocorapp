package models;

import android.webkit.JavascriptInterface;

/**
 * Created by sleke on 23/02/2018.
 */

public class Plano {

    private String idPlanos;
    private String nomePlano;
    private String titulo;
    private String tipo;
    private String valorMensal;
    private String valorAnual;
    private String ativo;


    @JavascriptInterface
    public String getIdPlanos() {
        return idPlanos;
    }

    @JavascriptInterface
    public void setIdPlanos(String idPlanos) {
        this.idPlanos = idPlanos;
    }

    @JavascriptInterface
    public String getNomePlano() {
        return nomePlano;
    }

    @JavascriptInterface
    public void setNomePlano(String nomePlano) {
        this.nomePlano = nomePlano;
    }

    @JavascriptInterface
    public String getTitulo() {
        return titulo;
    }

    @JavascriptInterface
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    @JavascriptInterface
    public String getTipo() {
        return tipo;
    }

    @JavascriptInterface
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    @JavascriptInterface
    public String getValorMensal() {
        return valorMensal;
    }

    @JavascriptInterface
    public void setValorMensal(String valorMensal) {
        this.valorMensal = valorMensal;
    }

    @JavascriptInterface
    public String getValorAnual() {
        return valorAnual;
    }

    @JavascriptInterface
    public void setValorAnual(String valorAnual) {
        this.valorAnual = valorAnual;
    }

    @JavascriptInterface
    public String getAtivo() {
        return ativo;
    }

    @JavascriptInterface
    public void setAtivo(String ativo) {
        this.ativo = ativo;
    }
}
