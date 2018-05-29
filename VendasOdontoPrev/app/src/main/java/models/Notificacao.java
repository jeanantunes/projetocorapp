package models;

import java.util.Date;

/**
 * Created by Treinamento6 on 14/05/2018.
 */

public class Notificacao {

    private String titulo;
    private String descricao;
    private Date dataNoficacao;
    private String tipoNotificacao;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getDataNoficacao() {
        return dataNoficacao;
    }

    public void setDataNoficacao(Date dataNoficacao) {
        this.dataNoficacao = dataNoficacao;
    }

    public String getTipoNotificacao() {
        return tipoNotificacao;
    }

    public void setTipoNotificacao(String tipoNotificacao) {
        this.tipoNotificacao = tipoNotificacao;
    }
}
