package models;

import android.content.Context;

/**
 * Created by almei on 13/02/2018.
 */

public class tableTipoDocumento
{
    Context context;

    public tableTipoDocumento(Context context) {
        this.context = context;
    }

    public static String getTableTipoDocumento()
    {
        String tableTipoDocumento = "CREATE TABLE IF NOT EXISTS [TipoDocumento] ( [IdTipoDocumento] integer NOT NULL, " +
                "[Descricao] varchar(50) NOT NULL COLLATE NOCASE, PRIMARY KEY ([IdTipoDocumento]) )";

        return tableTipoDocumento;
    }
}
