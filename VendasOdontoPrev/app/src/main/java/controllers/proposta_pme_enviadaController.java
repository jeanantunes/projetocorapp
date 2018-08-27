package controllers;

import android.content.Context;
import android.webkit.JavascriptInterface;

import utils.GerarArquivo;
import utils.Notificacao;

public class proposta_pme_enviadaController {

    private Context context;

    public proposta_pme_enviadaController(Context context){
        this.context = context;
    }

    @JavascriptInterface
    public boolean salvarArquivoEGerarPush(String base64Arquivo, String nomeArquivo, String extensaoArquivo){

        boolean resultado = false;

        try {

            GerarArquivo geradorDeArquivo = new GerarArquivo();

            resultado = geradorDeArquivo.gerarArquivo(base64Arquivo, nomeArquivo, extensaoArquivo);

            if (resultado){
                Notificacao notificacao = new Notificacao(context);

                notificacao.gerarNotificacao("Download do arquivo concluído: " + nomeArquivo + "." + extensaoArquivo, "Acesse a pasta downloads para obter o arquivo.");

            } else return resultado;

        } catch (Exception e){

            return resultado;

        }

        return resultado;
    }

}
