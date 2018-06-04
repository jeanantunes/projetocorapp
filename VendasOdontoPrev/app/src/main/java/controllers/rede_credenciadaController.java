package controllers;

import android.content.Context;
import android.content.Intent;
import android.webkit.JavascriptInterface;

public class rede_credenciadaController {

    Context context;

    public rede_credenciadaController(Context ctx) {
        this.context = ctx;
    }

    @JavascriptInterface
    public void compartilharString (String cardDentista){

        Intent sendIntent = new Intent();
        sendIntent.setAction(Intent.ACTION_SEND);
        sendIntent.putExtra(Intent.EXTRA_TEXT, cardDentista);
        sendIntent.setType("text/plain");
        context.startActivity(sendIntent);

    }
}
