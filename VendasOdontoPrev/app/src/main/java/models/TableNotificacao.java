package models;

import android.content.Context;

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
        String tableStatusForcaVendas = "CREATE TABLE IF NOT EXISTS [TableNotificacao] ( [IdNotificacao] integer NOT NULL, " +
                "[Descricao] char(10) NOT NULL COLLATE NOCASE, PRIMARY KEY ([IdStatusForcaVendas]) )";

        return tableStatusForcaVendas;
    }

}
