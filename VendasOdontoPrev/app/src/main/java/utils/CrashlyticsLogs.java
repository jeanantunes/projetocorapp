package utils;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.crashlytics.android.Crashlytics;
import com.vendaodonto.vendasodontoprev.MyFirebaseInstanceIDService;

public class CrashlyticsLogs {

    Context context;

    public CrashlyticsLogs(Context context){
        this.context = context;
    }

    @JavascriptInterface
    public void logException(String erro, String nomeUsuario, String emailUsuario, String cdVenda){

        MyFirebaseInstanceIDService deviceTokenFireBase = new MyFirebaseInstanceIDService();

        Log.d("MeuLog", nomeUsuario);

        String tokenDevice = deviceTokenFireBase.getTokenDevice();

        try {

            throw new RuntimeException(erro);

        }catch (Exception error){
            Log.d("MeuLog", error.toString());
            Crashlytics.setUserName(nomeUsuario);
            Crashlytics.setUserEmail(emailUsuario);
            Crashlytics.setUserIdentifier(cdVenda == null ? "" : cdVenda.toString());
            //Crashlytics.log(Log.ERROR, "Crash Logado", error.toString());
            Crashlytics.logException(error);

        }

    }

    @JavascriptInterface
    public void logException(String erro){

        MyFirebaseInstanceIDService deviceTokenFireBase = new MyFirebaseInstanceIDService();

        String tokenDevice = deviceTokenFireBase.getTokenDevice();

        try {

            throw new RuntimeException(erro);

        }catch (Exception error){
            Log.d("MeuLog", error.toString());
            //Crashlytics.log(Log.ERROR, "Crash nao logado", error.toString());
            Crashlytics.logException(error);
        }

    }

    public void logEvent(){

    }

}
