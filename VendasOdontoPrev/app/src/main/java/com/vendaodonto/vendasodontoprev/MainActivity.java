package com.vendaodonto.vendasodontoprev;

import android.*;
import android.Manifest;
import android.annotation.SuppressLint;
import android.app.DownloadManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.preference.PreferenceManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Window;
import android.view.WindowManager;
import android.webkit.CookieManager;
import android.webkit.DownloadListener;
import android.webkit.URLUtil;
import android.widget.Button;
import android.widget.SimpleCursorAdapter;
import android.widget.Toast;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import controllers.cadastro_planoController;
import models.Cliente;
import models.DataBase;
import models.ForcaVenda;
import models.Notificacao;
import models.Plano;
import models.TableNotificacao;
import models.tableCorretora;
import models.tableEndereco;
import models.tableForcaVendas;
import models.tableLogin;
import models.tablePlanos;
import models.tableStatusForcaVendas;
import utils.CustomWebView;
import utils.CustomWebViewClient;

public class MainActivity extends AppCompatActivity {

    static final int REQUEST_IMAGE_CAPTURE = 1;

    CustomWebView myWebView;

    private final int PERMISSAO_REQUEST = 2;

    DataBase db;


    public static Context ctx;

    private final int GALERIA_IMAGENS = 1;

    public Context getCtx() {
        return ctx;
    }

    @SuppressLint("JavascriptInterface")
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        ctx = this;

        MyFirebaseInstanceIDService oToken = new MyFirebaseInstanceIDService();

        oToken.getTokenDevice();

        db = new DataBase(this);

        String teste = BuildConfig.TokenApi;

        Log.d("MeuLog", teste);

        setContentView(R.layout.activity_main);
        String urlAssets = "file:///android_asset/";

        checkPermission();

        myWebView = (CustomWebView) this.findViewById(R.id.webView);
        myWebView.setWebViewClient(new CustomWebViewClient(ctx));

        myWebView.setDownloadListener(new DownloadListener() {
            @Override
            public void onDownloadStart(String url, String userAgent, String contentDisposition, String mimeType, long contentLength) {

                checkPermission();

                DownloadManager.Request request = new DownloadManager.Request(Uri.parse(url));

                request.setMimeType(mimeType);
                //------------------------COOKIE!!------------------------
                String cookies = CookieManager.getInstance().getCookie(url);
                request.addRequestHeader("cookie", cookies);
                //------------------------COOKIE!!------------------------
                request.addRequestHeader("User-Agent", userAgent);
                request.setDescription("Downloading file...");
                request.setTitle(URLUtil.guessFileName(url, contentDisposition, mimeType));
                request.allowScanningByMediaScanner();
                request.setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED);
                request.setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, URLUtil.guessFileName(url, contentDisposition, mimeType));
                DownloadManager dm = (DownloadManager) getSystemService(DOWNLOAD_SERVICE);
                dm.enqueue(request);
                //Toast.makeText(getApplicationContext(), "Downloading File", Toast.LENGTH_LONG).show();
            }
        });

        getSupportActionBar().hide();

        int qt = 0;

        try {

            Log.e("MeuLog", "======================");
            AssetManager assetManager = this.getAssets();
            InputStream stream = assetManager.open("index.html");
            BufferedReader r = new BufferedReader(new InputStreamReader(stream));
            StringBuilder total = new StringBuilder();
            String line;

            while ((line = r.readLine()) != null) {
                total.append(line).append("\n");
                qt ++;
            }

            ForcaVenda forcaLogin = buscar(1);

            tableLogin tb = new tableLogin(this);

            if(forcaLogin != null)
            {
                myWebView.loadUrl("file:///android_asset/anteriorLogado.html");
            }
            else
            {
                Log.d("MeuLog", "Nâo existe cadastro salvo");
                myWebView.loadUrl("file:///android_asset/index.html");
           }

            //myWebView.loadDataWithBaseURL("file:///android_asset/", total.toString(), "text/html", "UTF-8", null);

            Log.d("MeuLog", "Classe instanciada");



        } catch (Exception xxx) {
            Log.e("MeuLog", "Load assets ", xxx);
        }

    }

    @Override
    protected void onResume(){
        super.onResume();

        SharedPreferences firstRun = PreferenceManager.getDefaultSharedPreferences(this);

        if(!firstRun.getBoolean("firstTime", false)){

            String FILENAME = "hello_file";
            String string = "hello world!";

            try {

                FileOutputStream fos = openFileOutput(FILENAME, Context.MODE_PRIVATE);
                fos.write(string.getBytes());
                fos.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

            Toast.makeText(this, "App Installed!!!!.", Toast.LENGTH_LONG).show();
            SharedPreferences.Editor editor = firstRun.edit();
            editor.putBoolean("firstTime", true);
            editor.commit();

        }
    }

    public Notificacao buscarNotificao(int codigo) {

        try {
            Notificacao notificacao = new Notificacao();

            StringBuilder sql = new StringBuilder();

            sql.append("SELECT * ");
            sql.append("FROM TBOD_NOTIFICACAO ");
            sql.append("WHERE CD_NOTIFICACAO = " + codigo);

            SQLiteDatabase dbs = db.getReadableDatabase();

            Cursor resultado = dbs.rawQuery(sql.toString(), null);


            if (resultado.getCount() > 0) {
                resultado.moveToFirst();

                notificacao.setTitulo(resultado.getString(resultado.getColumnIndexOrThrow("NM_TITULO")));
                notificacao.setDescricao(resultado.getString(resultado.getColumnIndexOrThrow("DS_NOTIFICACAO")));
                notificacao.setTipoNotificacao(resultado.getString(resultado.getColumnIndexOrThrow("CD_TIPO_NOTIFICACAO")));


                Log.d("MeuLog", "Executou TableNotification");
                return notificacao;
            }
        } catch (Exception e){
            Log.d("MeuLog", "" + e.toString());
        }

        return null;
    }




    public ForcaVenda buscar(int codigo) {

        ForcaVenda forca = new ForcaVenda();

        StringBuilder sql = new StringBuilder();

        sql.append("SELECT * ");
        sql.append("FROM Login ");
        sql.append("WHERE IdLogin = " + codigo);

        SQLiteDatabase dbs = db.getReadableDatabase();

        Cursor resultado = dbs.rawQuery(sql.toString(), null);

        if (resultado.getCount() > 0) {
            resultado.moveToFirst();

            forca.setCargo(resultado.getString( resultado.getColumnIndexOrThrow("cargo")));
            forca.setCpf(resultado.getString( resultado.getColumnIndexOrThrow("cpf")));
            forca.setLogado(resultado.getString( resultado.getColumnIndexOrThrow("logado")));
            forca.setEmail(resultado.getString(resultado.getColumnIndexOrThrow("email")));
            forca.setNome(resultado.getString(resultado.getColumnIndexOrThrow("nome")));
            forca.setNomeEmpresa(resultado.getString(resultado.getColumnIndexOrThrow("nomeEmpresa")));

            Log.i("MeuLog", "Executou BuscarEmpresa");
            return forca;
        }

        return null;
    }

    @Override
    public void onBackPressed() {
        if (this.myWebView.canGoBack())
        {
            String url = this.myWebView.getOriginalUrl().toString();
            Log.d("MeuLog", url);

            //this.myWebView.goBack();
            if(url.equals("file:///android_asset/logado.html")){
                this.moveTaskToBack(true);
            }
            else if (url.equals("file:///android_asset/index.html"))
            {
                Log.d("MeuLog", "Close WebView");

                this.finish();

            } else this.myWebView.goBack();

        } else {

            Log.d("MeuLog", "Close Activity");
            this.finish();
        }
    }

    public void abrirgaleria()
    {
        Log.d("MeuLog", "Executou o metodo abrirgaleria");
        try {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);//
            startActivityForResult(intent, GALERIA_IMAGENS);

        }catch (Exception e)
        {
            Log.d("MeuLog", "Erro: " + e.toString());
        }
    }

    public void abrirActivityGaleria()
    {
        Intent intent = new Intent(this, GaleriaActivity.class);
        startActivity(intent);
    }

    public void checkPermission(){

        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
            if (ActivityCompat.shouldShowRequestPermissionRationale(this, android.Manifest.permission.WRITE_EXTERNAL_STORAGE)) {

            } else {
                ActivityCompat.requestPermissions(this, new String[]
                    { android.Manifest.permission.WRITE_EXTERNAL_STORAGE }, PERMISSAO_REQUEST);
            }
        }

    }

}
