package controllers;

import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import com.vendaodonto.vendasodontoprev.MainActivity;

import static android.content.Context.CLIPBOARD_SERVICE;

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

    @JavascriptInterface
    public void clipboardText(String text){

        final String textoCopiadoSuccess = "Texto copiado com sucesso!";

        ClipboardManager clipboard = (ClipboardManager) context.getSystemService(CLIPBOARD_SERVICE);
        ClipData clip = ClipData.newPlainText("Texto copiado", text);
        clipboard.setPrimaryClip(clip);
        Toast toast = Toast.makeText(context, textoCopiadoSuccess, Toast.LENGTH_SHORT);
        toast.show();

    }
}
