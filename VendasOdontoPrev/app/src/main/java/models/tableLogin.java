package models;

import android.content.Context;

/**
 * Created by almei on 13/02/2018.
 */

public class tableLogin
{
    Context context;

    public tableLogin(Context ctx) {
        this.context = ctx;
    }

    DataBase db = new DataBase(context);

    public static String getTableLogin()
    {
        String tableLogin = "CREATE TABLE IF NOT EXISTS [Login] ( [IdLogin] integer NOT NULL, [IdForcaVendasCorretora] integer NOT NULL, " +
                "[IdTipoLogin] integer NOT NULL, [Senha] varchar(20) NOT NULL COLLATE NOCASE, [FotoPerfilB64] varchar COLLATE NOCASE, " +
                "PRIMARY KEY ([IdLogin]) , FOREIGN KEY ([IdForcaVendasCorretora]) REFERENCES [Corretora]([IdCorretora]), " +
                "FOREIGN KEY ([IdForcaVendasCorretora]) REFERENCES [ForcaVendas]([IdForcaVendas]) )";

        return tableLogin;
    }
}
