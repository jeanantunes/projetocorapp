package controllers;

import android.content.Context;
import android.webkit.JavascriptInterface;

import utils.GerarArquivo;
import utils.Notificacao;

public class resumo_status_proposta_pmeController {

    Context context;

    public resumo_status_proposta_pmeController(Context context){

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
