package models;

import android.content.Context;

/**
 * Created by almei on 13/02/2018.
 */

public class tablePlanos
{
    Context context;
    DataBase db;

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
