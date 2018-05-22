package controllers;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.vendaodonto.vendasodontoprev.MyFirebaseInstanceIDService;

import models.DataBase;

/**
 * Created by Treinamento6 on 23/02/2018.
 */

public class SairDaConta {

    Context context;

    DataBase db;

    public SairDaConta(Context context) {
        this.context = context;
        db = new DataBase(context);
    }

    @JavascriptInterface
    public void removerRegistroLogin()
    {
        Log.d("MeuLog", "Iniciou metodo removerRegistro");

        String[] parametros = new String[1];
        parametros[0] = String.valueOf("1");

        SQLiteDatabase dbs = db.getReadableDatabase();

        dbs.delete("Login", "IdLogin = ?", parametros);

        dbs.close();

        Log.d("MeuLog", "removeu registro");
    }

    @JavascriptInterface
    public String getModel(){

        Log.d("MeuLog", "Modelo do celular: " + android.os.Build.MODEL);
        return android.os.Build.MODEL;

    }

    @JavascriptInterface
    public String getToken(){

        MyFirebaseInstanceIDService oIdService = new MyFirebaseInstanceIDService();
        return oIdService.getToken();

    }


}
