package models;

import android.content.Context;

/**
 * Created by almei on 13/02/2018.
 */

public class tablePlanosBeneficiarios {

    Context context;

    public tablePlanosBeneficiarios(Context context) {
        this.context = context;
    }

    DataBase db = new DataBase(context);

    public static String getTablePlanosBeneficiarios()
    {
        String tablePlanosBeneficiarios = "CREATE TABLE IF NOT EXISTS [PlanosBeneficiarios] ( [IdPlanosBeneficiarios] integer NOT NULL, [IdBeneficiario] integer NOT NULL, " +
                "[IdPlanos] integer NOT NULL, PRIMARY KEY ([IdPlanosBeneficiarios]) , FOREIGN KEY ([IdBeneficiario]) REFERENCES [Beneficiario]([IdBeneficiario]), " +
                "FOREIGN KEY ([IdPlanos]) REFERENCES [Planos]([IdPlanos]) )";

        return tablePlanosBeneficiarios;
    }
}
