package com.vendaodonto.vendasodontoprev;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import models.DataBase;
import models.ForcaVenda;
import models.tableLogin;
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


        if (savedInstanceState == null) {
            Bundle extras = getIntent().getExtras();
            if(extras == null)
            {
                //Cry about not being clicked on
            }
            else if (extras.getBoolean("NotiClick"))
            {
                openFolder();
            }

        }

        ctx = this;

        MyFirebaseInstanceIDService oToken = new MyFirebaseInstanceIDService();

        oToken.getTokenDevice();

        db = new DataBase(this);

        //String teste = BuildConfig.TokenApi;

        //Log.d("MeuLog", teste);

        setContentView(R.layout.activity_main);
        String urlAssets = "file:///android_asset/";

        checkPermission();

        myWebView = (CustomWebView) this.findViewById(R.id.webView);
        myWebView.setWebViewClient(new CustomWebViewClient(ctx));

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

    public void openFolder()
    {
        //Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        //Uri uri = Uri.parse(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getAbsolutePath());
        //intent.setDataAndType(uri, "text/*");
        //context.startActivity(Intent.createChooser(intent, "Open folder"));

        // location = "/sdcard/my_folder";
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        Uri mydir = Uri.parse(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getAbsolutePath());
        intent.setDataAndType(mydir,"application/*");    // or use */*
        startActivity(intent);
    }

}
