package controllers;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.webkit.JavascriptInterface;

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


}
