package models;


import java.util.Date;

public class Notificacao {

    private String titulo;
    private String mensagem;
    private Date dataNoficacao;
    private String tipoIntencao;
    private String nomeView;
    private String parametro;

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public Date getDataNoficacao() {
        return dataNoficacao;
    }

    public void setDataNoficacao(Date dataNoficacao) {
        this.dataNoficacao = dataNoficacao;
    }

    public String getTipoIntencao() {
        return tipoIntencao;
    }

    public void setTipoIntencao(String tipoIntencao) {
        this.tipoIntencao = tipoIntencao;
    }

    public String getNomeView() {
        return nomeView;
    }

    public void setNomeView(String nomeView) {
        this.nomeView = nomeView;
    }

    public String getParametro() {
        return parametro;
    }

    public void setParametro(String parametro) {
        this.parametro = parametro;
    }

    @Override
    public String toString() {
        return "Notificacao{" +
                "titulo='" + titulo + '\'' +
                ", mensagem='" + mensagem + '\'' +
                ", dataNoficacao=" + dataNoficacao +
                ", tipoIntencao='" + tipoIntencao + '\'' +
                ", nomeView='" + nomeView + '\'' +
                ", parametro='" + parametro + '\'' +
                '}';
    }
}
