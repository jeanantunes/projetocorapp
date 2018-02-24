package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

/**
 * Created by almei on 13/02/2018.
 */

public class tablePlanos {

    Context context;
    DataBase db;
    public static final String TABELA_PLANO = "Planos";
    public static final String COLUNA_IDPLANOS = "idPlanos";
    public static final String COLUNA_NOMEPLANO = "nomePlano";
    public static final String COLUNA_TITULO = "titulo";
    public static final String COLUNA_TIPO = "tipo";
    public static final String COLUNA_VALORMENSAL = "valorMensal";
    public static final String COLUNA_VALORANUAL = "valorAnual";
    public static final String COLUNA_ATIVO = "ativo";

    public tablePlanos(Context ctx) {
        this.context = ctx;
        db = new DataBase(context);
    }

    public static String getTablePlanos()
    {
        String tablePlanos = "CREATE TABLE IF NOT EXISTS [Planos] ( [IdPlanos] integer NOT NULL, [NomePlano] varchar(50) COLLATE NOCASE, " +
                "[Titulo] varchar(50) COLLATE NOCASE, [Tipo] char(10) COLLATE NOCASE, [ValorMensal] numeric, [ValorAnual] numeric, " +
                "[Ativo] bit, PRIMARY KEY ([IdPlanos]) )";

        return tablePlanos;
    }


}
