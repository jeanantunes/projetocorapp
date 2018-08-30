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
    public void logException(String erro, String nomeUsuario, String emailUsuario, String cdForcaVenda){

        MyFirebaseInstanceIDService deviceTokenFireBase = new MyFirebaseInstanceIDService();

        Log.d("MeuLog", nomeUsuario);

        String tokenDevice = deviceTokenFireBase.getTokenDevice();

        try {

            throw new RuntimeException(erro);

        }catch (Exception error){
            Log.d("MeuLog", error.toString());
            Crashlytics.setUserName(nomeUsuario);
            Crashlytics.setUserEmail(emailUsuario);
            Crashlytics.setUserIdentifier(cdForcaVenda == null ? "" : cdForcaVenda.toString());

            Crashlytics.setString("Nome", nomeUsuario);
            Crashlytics.setString("Email", emailUsuario);
            Crashlytics.setString("Codigo Forca Venda", cdForcaVenda);
            Crashlytics.setString("Device Token", tokenDevice);
            //Crashlytics.log(Log.ERROR, "Crash Logado", error.toString());
            Crashlytics.logException(error);

        }

    }

    @JavascriptInterface
    public void logException(String erro){

        MyFirebaseInstanceIDService deviceTokenFireBase = new MyFirebaseInstanceIDService();
        Log.d("MeuLog", "Executou log exception");
        String tokenDevice = deviceTokenFireBase.getTokenDevice();
        Crashlytics.setUserIdentifier(tokenDevice);
        Crashlytics.setString("Device Token", tokenDevice);

        try {

            throw new RuntimeException(erro);

        }catch (Exception error){
            Log.d("MeuLog", error.toString());
            //Crashlytics.log(Log.ERROR, "Crash nao logado", error.toString());
            Crashlytics.logException(error);
        }

    }

    @JavascriptInterface
    public void logException(String erro, String nomeUsuario, String emailUsuario, String cdForcaVenda, String jsonVenda){

        MyFirebaseInstanceIDService deviceTokenFireBase = new MyFirebaseInstanceIDService();
        Log.d("MeuLog", "Executou log exception ");
        String tokenDevice = deviceTokenFireBase.getTokenDevice();
        Crashlytics.setUserName(nomeUsuario);
        Crashlytics.setUserEmail(emailUsuario);
        Crashlytics.setUserIdentifier(cdForcaVenda == null ? "" : cdForcaVenda.toString());
        Crashlytics.setString("Codigo Forca Venda", cdForcaVenda);
        Crashlytics.setString("Nome", nomeUsuario);
        Crashlytics.setString("Email", emailUsuario);
        Crashlytics.setString("Device Token", tokenDevice);
        Crashlytics.setString("Erro", erro);
        Crashlytics.setString("JsonVenda", jsonVenda);

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
