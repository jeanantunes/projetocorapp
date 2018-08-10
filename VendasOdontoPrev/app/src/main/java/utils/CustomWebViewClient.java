package utils;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.vendaodonto.vendasodontoprev.MyFirebaseInstanceIDService;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;

import controllers.SairDaConta;
import controllers.loginController;

/**
 * Created by freejack on 06/01/2018.
 */

public class CustomWebViewClient extends WebViewClient {

    CustomWebView myWebView;

    Context context;

    public CustomWebViewClient(Context ctx)
    {
        this.context = ctx;

    }


    @SuppressWarnings("deprecation")
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {

        Log.d("MeuLog", "URL: " + url);

        if (url.startsWith("market://")){
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.setData(Uri.parse(url));
            context.startActivity(intent);
            return true;
        }
        else {
            final Uri uri = Uri.parse(url);
            try {
                Log.d("MeuLog", "Instanciou Logado");
                return handleUri(view, url);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            return false;
        }
     }

//    @TargetApi(Build.VERSION_CODES.N)
//    @Override
//    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
//        final Uri uri = request.getUrl();
//        return handleUri(view, uri);
//    }


    @SuppressLint("JavascriptInterface")
    private boolean handleUri(WebView view, String uri) throws ClassNotFoundException
    {

        try {

            loginController login = new loginController(context);

            view.addJavascriptInterface(login, "login");

            SairDaConta logout = new SairDaConta(context);

            view.addJavascriptInterface(logout, "logout");

            MyFirebaseInstanceIDService fireBase = new MyFirebaseInstanceIDService();

            view.addJavascriptInterface(fireBase, "fireBase");

            Log.d("MeuLog", "scheme =" + uri);
            String arquivo = uri.replace("file:///android_asset/", "");
            arquivo = arquivo.replace(".html", "");

            Object classeInstanciada = null;

            //Constructor c = Class.forName("Foo").getConstructor(String.class, Integer.TYPE);
            //Foo foo = (Foo) c.newInstance("example", 34);

            //Class classe = Class.forName("controllers." + arquivo + "CTRL");

            try {

                Constructor c = Class.forName("controllers." + arquivo + "Controller").getConstructor(Context.class);
                classeInstanciada = c.newInstance(context);

            } catch (NoSuchMethodException e) {
                e.printStackTrace();
                Log.i("MeuLog", "NoSuchMethodException arq= " + arquivo + " erro: " + e.toString());
            } catch (IllegalAccessException e) {
                e.printStackTrace();
                Log.i("MeuLog", "IllegalAccessException arq= " + arquivo + " erro: " + e.toString());
            } catch (InstantiationException e) {
                e.printStackTrace();
                Log.i("MeuLog", "InstantiationException arq= " + arquivo + " erro: " + e.toString());
            } catch (InvocationTargetException e) {
                e.printStackTrace();
                Log.i("MeuLog", "InvocationTargetException arq= " + arquivo + " erro: " + e.toString());
            }


            Log.d("MeuLog", "Arquivo: " + arquivo);

            view.addJavascriptInterface(classeInstanciada, "ob");

            Log.d("MeuLog", "Classe instanciada");

        } catch (Exception e){

        }

        view.loadUrl(uri);
        return true;
    }

    @Override
    public void onPageFinished(WebView view, String url)
    {
        // TODO Auto-generated method stub
        // super.onPageFinished(view, url);
    }

}
