package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

/**
 * Created by almei on 13/02/2018.
 */

public class tableCorretora
{
    Context context;
    DataBase db;

    public tableCorretora(Context ctx) {
        this.context = ctx;
        db = new DataBase(context);
    }

    public static String getTableCorretora()
    {
        String tableCorretora = "CREATE TABLE IF NOT EXISTS [Corretora] ( [IdCorretora] integer NOT NULL, " +
                "[Nome] varchar(50) NOT NULL COLLATE NOCASE, [Codigo] varchar(30) NOT NULL COLLATE NOCASE, " +
                "[CNPJ] varchar(50) NOT NULL COLLATE NOCASE, [IdEndereco] integer NOT NULL, [Ativo] bit NOT NULL, " +
                "[Regional] varchar(50) NOT NULL COLLATE NOCASE, PRIMARY KEY ([IdCorretora]) , " +
                "FOREIGN KEY ([IdEndereco]) REFERENCES [Endereco]([IdEndereco]) )";

        return tableCorretora;
    }

    public void insertCorretora()
    {
        Log.d("MeuLog", "Executou insertCorretora");

        SQLiteDatabase dbs = db.getWritableDatabase();
        ContentValues values = new ContentValues();

        Log.d("MeuLog", "Executou sqliteDatabase");

        values.put("Nome", "OdontoCorretora" );
        values.put("Codigo", "1234");
        values.put("CNPJ", "4321");
        values.put("IdEndereco", 1 );
        values.put("Ativo", 1);
        values.put("Regional", "1234");

        dbs.insert("Corretora", null, values);

        Log.d("MeuLog", "Corretora inserida!");

        dbs.close();
    }
}
