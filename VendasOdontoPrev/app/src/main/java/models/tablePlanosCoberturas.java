package models;

import android.content.Context;

/**
 * Created by almei on 13/02/2018.
 */

public class tablePlanosCoberturas
{
    Context context;

    public tablePlanosCoberturas(Context context) {
        this.context = context;
    }

    DataBase db = new DataBase(context);

    public static String getTablePlanosCoberturas()
    {
        String tablePlanosCoberturas = "CREATE TABLE IF NOT EXISTS [PlanosCoberturas] ( [IdPlanoCoberturas] integer NOT NULL, [IdPlanos] integer NOT NULL, " +
                "[IdCoberturas] integer NOT NULL, PRIMARY KEY ([IdPlanoCoberturas]) , FOREIGN KEY ([IdCoberturas]) REFERENCES " +
                "[Coberturas]([IdCoberturas]), FOREIGN KEY ([IdPlanos]) REFERENCES [Planos]([IdPlanos]) )";

        return tablePlanosCoberturas;
    }
}
