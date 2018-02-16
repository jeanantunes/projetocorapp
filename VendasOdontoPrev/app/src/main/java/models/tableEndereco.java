package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

/**
 * Created by almei on 13/02/2018.
 */

public class tableEndereco
{
    Context context;
    DataBase db;

    String Logradouro;
    String Cep;
    String Cidade;
    String Complemento;
    String Bairro;
    String Uf;
    String IdTipoEndereco;

    String TABLE_ENDERECO = "Endereco";
    String COLUNA_IDENDERECO = "IdEndereco";
    String COLUNA_LOGRADOURO = "Logradouro";
    String COLUNA_CEP = "Cep";
    String COLUNA_CIDADE= "Cidade";
    String COLUNA_COMPLEMENTO = "Complemento";
    String COLUNA_BAIRRO = "Bairro";
    String COLUNA_UF = "Uf";

    public tableEndereco(Context ctx) {
        this.context = ctx;
        db  = new DataBase(context);

    }

    public static String getTableEndereco()
    {
        String tableEndereco = "CREATE TABLE IF NOT EXISTS [Endereco] ( [IdEndereco] integer NOT NULL, [Logradouro] varchar(50) NOT NULL COLLATE NOCASE, " +
                "[Cep] varchar(15) NOT NULL COLLATE NOCASE, [Cidade] varchar(30) NOT NULL COLLATE NOCASE, " +
                "[Complemento] varchar(100) COLLATE NOCASE, [Bairro] varchar(50) NOT NULL COLLATE NOCASE, " +
                "[Uf] varchar(2) NOT NULL COLLATE NOCASE, [IdTipoEndereco] integer NOT NULL, PRIMARY KEY ([IdEndereco]))";

        return tableEndereco;
    }

    public void insertEndereco()
    {
        Log.d("MeuLog", "Executou insertRegistro" + TABLE_ENDERECO);

        SQLiteDatabase dbs = db.getWritableDatabase();
        ContentValues values = new ContentValues();

        Log.d("MeuLog", "Executou");

        values.put("Logradouro", "sp" );
        values.put("Cep", "sp");
        values.put("Cidade", "sp");
        values.put("Complemento", "sp");
        values.put("Bairro", "sp");
        values.put("Uf", "sp");
        values.put("IdTipoEndereco", 1);

        dbs.insert("Endereco", null, values);

        Log.d("MeuLog", "Endereco inserido!!");

        dbs.close();
    }
}
