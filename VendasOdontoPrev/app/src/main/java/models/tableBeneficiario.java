package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;

/**
 * Created by almei on 13/02/2018.
 */

public class tableBeneficiario
{
    Context context;
    DataBase db;

    public tableBeneficiario(Context ctx) {
        this.context = ctx;
        db = new DataBase(context);
    }

    public static String getTableBeneficiario()
    {
        String tableBeneficiario = "CREATE TABLE IF NOT EXISTS [Beneficiario] ( [IdBeneficiario] integer NOT NULL, [Nome] " +
                "varchar(50) NOT NULL COLLATE NOCASE, [CPF] varchar(13) COLLATE NOCASE, [Sexo] " +
                "char(1) NOT NULL COLLATE NOCASE, [DataNascimento] datetime NOT NULL, [NomeMae] " +
                "varchar(50) NOT NULL COLLATE NOCASE, [Celular] varchar(9) COLLATE NOCASE, [Email] " +
                "varchar(30) COLLATE NOCASE, [IdTitular] integer, [IdEndereco] integer NOT NULL, PRIMARY KEY " +
                "([IdBeneficiario]) , FOREIGN KEY ([IdTitular]) REFERENCES [Beneficiario]([IdBeneficiario]), " +
                "FOREIGN KEY ([IdEndereco]) REFERENCES [Endereco]([IdEndereco]) )";

        return tableBeneficiario;
    }

    public void metodoteste()
    {
        SQLiteDatabase dbi = db.getWritableDatabase();
        ContentValues values = new ContentValues();

    }
}
