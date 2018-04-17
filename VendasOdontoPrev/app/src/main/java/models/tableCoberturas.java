package models;

import android.content.Context;

/**
 * Created by almei on 13/02/2018.
 */

public class tableCoberturas
{
    Context context;

    public tableCoberturas(Context ctx) {
        this.context = ctx;
    }

    DataBase db = new DataBase(context);

    public static String getTableCoberturas()
    {
        String tableCoberturas = "CREATE TABLE IF NOT EXISTS [Coberturas] ( [IdCoberturas] integer NOT NULL," +
                " [Descricao] varchar(50) NOT NULL COLLATE NOCASE, PRIMARY KEY ([IdCoberturas]) )";

        return tableCoberturas;
    }
}
