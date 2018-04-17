package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

/**
 * Created by almei on 13/02/2018.
 */

public class tableStatusForcaVendas
{
    Context context;
    DataBase db;

    public tableStatusForcaVendas(Context ctx) {
        this.context = ctx;
        db = new DataBase(context);
    }

    public static String getTableStatusForcaVendas()
    {
        String tableStatusForcaVendas = "CREATE TABLE IF NOT EXISTS [StatusForcaVendas] ( [IdStatusForcaVendas] integer NOT NULL, " +
                "[Descricao] char(10) NOT NULL COLLATE NOCASE, PRIMARY KEY ([IdStatusForcaVendas]) )";

        return tableStatusForcaVendas;
    }

    public void insertStatus()
    {
        Log.d("MeuLog", "Executou");

        SQLiteDatabase dbs = db.getWritableDatabase();
        ContentValues values = new ContentValues();

        Log.d("MeuLog", "Executou");

        values.put("Descricao", "ativo" );

        dbs.insert("StatusForcaVendas", null, values);

        Log.d("MeuLog", "Status inserido!!");

        dbs.close();
    }
}
