package controllers;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;

/**
 * Created by Treinamento6 on 09/02/2018.
 */

public class googleMapsController {

    Context context;

    public googleMapsController(Context context) {
        this.context = context;
    }

    @JavascriptInterface
    public void logString(String token)
    {
        Log.d("MeuLog", "Token: " + token);
    }
}
