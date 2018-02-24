package models;

import android.content.Context;

/**
 * Created by almei on 13/02/2018.
 */

public class tableDocumentos
{
    Context context;

    public tableDocumentos(Context ctx) {
        this.context = ctx;
    }

    DataBase db = new DataBase(context);

    public static String getTableDocumentos ()
    {
        String tableDocumentos = "CREATE TABLE IF NOT EXISTS [Documentos] ( [IdDocumentos] integer NOT NULL, [IdTipoDocumento] integer NOT NULL," +
                " [IdTipoArquivo] integer NOT NULL, [NomeArquivo] varchar(100) NOT NULL COLLATE NOCASE," +
                " [Base64] varchar NOT NULL COLLATE NOCASE, PRIMARY KEY ([IdDocumentos]) , " +
                "FOREIGN KEY ([IdTipoDocumento]) REFERENCES [TipoDocumento]([IdTipoDocumento]) )";

        return tableDocumentos;
    }

}
