package models;

import android.content.Context;

/**
 * Created by almei on 13/02/2018.
 */

public class tableDocumentosAssociados
{
    Context context;

    public tableDocumentosAssociados(Context ctx) {
        this.context = ctx;
    }

    DataBase db = new DataBase(context);

    public static String getTableDocumentosAssociados()
    {
        String tableDocumentosAssociados = "CREATE TABLE IF NOT EXISTS [DocumentosAssociados] ( [IdDocumentosAssociados] integer NOT NULL, " +
                "[IdOrigemAssociado] integer NOT NULL, [IdAssociado] integer NOT NULL, " +
                "[IdDocumentos] integer NOT NULL, PRIMARY KEY ([IdDocumentosAssociados]) , FOREIGN KEY ([IdAssociado]) REFERENCES [Beneficiario]([IdBeneficiario]), " +
                "FOREIGN KEY ([IdAssociado]) REFERENCES [Corretora]([IdCorretora]), FOREIGN KEY ([IdDocumentos]) REFERENCES [Documentos]([IdDocumentos]) )";

        return tableDocumentosAssociados;
    }
}
