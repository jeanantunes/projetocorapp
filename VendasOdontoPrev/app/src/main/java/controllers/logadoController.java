package controllers;

import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.vendaodonto.vendasodontoprev.GaleriaActivity;
import com.vendaodonto.vendasodontoprev.MainActivity;


/**
 * Created by Treinamento6 on 30/01/2018.
 */

public class logadoController {

    Context context;

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public static String base64;

    private final int GALERIA_IMAGENS = 1;

    public logadoController(Context context) {
        this.context = context;
    }

    @JavascriptInterface
    public void abrirgaleria()
    {
        GaleriaActivity.fecharGaleria = false;
        Log.d("MeuLog","" + GaleriaActivity.fecharGaleria);
        Log.d("MeuLog", "Executou o metodo imprimir");
        Intent intent = new Intent(context, GaleriaActivity.class);
        context.startActivity(intent);

        Log.d("MeuLog","" + GaleriaActivity.fecharGaleria);

        while (GaleriaActivity.fecharGaleria == false) {
            try {
                Thread.currentThread().sleep(0,1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        Log.d("MeuLog", "Fechou a galeria");
        Log.d("MeuLog","" + GaleriaActivity.fecharGaleria);
    }

    @JavascriptInterface
    public String retornoB64()
    {
        Log.d("MeuLog", "Base 64" + getBase64());
        Log.d("MeuLog", "entrou no log retorno");
        return base64;
    }

    ////////////////////////////////////////////////
    @JavascriptInterface
    public void imprimirOmeuSaco()
    {
        Log.d("MeuLog", "Entrou no metodo imprimirOmeuSaco");
        Log.d("MeuLog", "Base 64" + getBase64());
    }

}
