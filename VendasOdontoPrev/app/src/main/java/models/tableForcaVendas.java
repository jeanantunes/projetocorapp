package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

/**
 * Created by almei on 13/02/2018.
 */

public class tableForcaVendas
{
    Context context;
    DataBase db;

    public tableForcaVendas(Context ctx) {
        this.context = ctx;
        db = new DataBase(context);
    }

    public static String getTableForcaVendas()
    {
        String tableForcaVendas = "CREATE TABLE IF NOT EXISTS [ForcaVendas] ( [IdForcaVendas] integer NOT NULL, " +
                "[Nome] varchar(255) NOT NULL COLLATE NOCASE, [Celular] varchar(9) NOT NULL COLLATE NOCASE, " +
                "[Email] varchar(80) NOT NULL COLLATE NOCASE, [IdCorretora] integer NOT NULL, " +
                "[IdStatusForcaVendas] integer NOT NULL, [CPF] varchar(13) NOT NULL COLLATE NOCASE, [Ativo] bit NOT NULL, " +
                "[Sexo] char(1) NOT NULL COLLATE NOCASE, [DataNascimento] datetime NOT NULL, PRIMARY KEY ([IdForcaVendas]) , " +
                "FOREIGN KEY ([IdCorretora]) REFERENCES [Corretora]([IdCorretora]), FOREIGN KEY ([IdStatusForcaVendas]) REFERENCES [StatusForcaVendas]([IdStatusForcaVendas]) )";

        return tableForcaVendas;
    }

    public void insertForcaVendas()
    {
        Log.d("MeuLog", "Executou insertForcaVendas");

        SQLiteDatabase dbs = db.getWritableDatabase();
        ContentValues values = new ContentValues();

        Log.d("MeuLog", "Executou sqliteDatabase");

        try {
            values.put("Nome", "Yago Almeida");
            values.put("Celular", "12345678");
            values.put("Email", "43241");
            values.put("IdCorretora", 20);
            values.put("IdStatusForcaVendas", 1);
            values.put("CPF", "1234");
            values.put("Ativo", 1);
            values.put("Sexo", "M");
            values.put("DataNascimento", "27/04/1998");


            dbs.insert("ForcaVendas", null, values);

            Log.d("MeuLog", "ForcaVendas inserida!");

            dbs.close();

        }catch (Exception e) {
            Log.d("MeuLog", "Erro: " + e.toString());
        }
    }
}
