package controllers;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;

public class cadastro_usuario_corretoraController {

    Context context;

    public cadastro_usuario_corretoraController(Context ctx) {
        this.context = ctx;
    }

    @JavascriptInterface
    public void imprimir()
    {
        Log.i("MeuLog", "Classe: " + getClass().toString());
    }
}
