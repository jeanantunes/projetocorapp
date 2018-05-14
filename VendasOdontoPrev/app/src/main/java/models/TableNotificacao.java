package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

/**
 * Created by Treinamento6 on 10/05/2018.
 */

public class TableNotificacao {

    Context context;
    DataBase db;

    public TableNotificacao(Context ctx) {
        this.context = ctx;
        db = new DataBase(context);
    }

    public static String getTableTableNotificacao()
    {
        String tableStatusForcaVendas = "CREATE TABLE IF NOT EXISTS [TBOD_NOTIFICACAO] ( [CD_NOTIFICACAO] integer NOT NULL, " +
                "[DS_NOTIFICACAO] varchar(250) NOT NULL, [NM_TITULO] varchar(250) NOT NULL, [DT_NOTIFICACAO] DATETIME NOT NULL, " +
                "[CD_TIPO_NOTIFICACAO] varchar(50) NOT NULL, PRIMARY KEY ([CD_NOTIFICACAO]) )";

        return tableStatusForcaVendas;
    }

    public void insertNotificacao()
    {
        try {
            Log.d("MeuLog", "Executou insertNotificacao");

            SQLiteDatabase dbs = db.getWritableDatabase();
            ContentValues values = new ContentValues();

            Log.d("MeuLog", "Executou sqliteDatabase");

            values.put("DS_NOTIFICACAO", "Você foi aprovado");
            values.put("NM_TITULO", "Aprovado");
            values.put("DT_NOTIFICACAO", "2007-01-01 10:00:00");
            values.put("CD_TIPO_NOTIFICACAO", "Aprovado");

            dbs.insert("TBOD_NOTIFICACAO", null, values);

            Log.d("MeuLog", "Notificacao inserida!");

            dbs.close();
        }catch (Exception e){

            Log.d("MeuLog", "" + e.toString());
        }
    }


}
