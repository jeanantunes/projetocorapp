package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;

public class tableLogin
{
    String COLUNA_CPF = "cpf";
    String COLUNA_EMAIL = "email";
    String COLUNA_LOGIN = "login";
    String COLUNA_FOTOPERFIL = "FotoPerfilB64";
    String COLUNA_NOME = "nome";
    String COLUNA_NOMEEMPRESA = "nomeEmpresa";
    String COLUNA_NOMEGERENTE = "nomeGerente";
    String COLUNA_RESPONSAVEL = "responsavel";
    String COLUNA_RG = "rg";
    String COLUNA_CARGO = "cargo";
    String COLUNA_LOGADO = "logado";
    String COLUNA_CODIGO = "codigo";

    Context context;
    DataBase db;

    public tableLogin(Context ctx) {
        this.context = ctx;
        db = new DataBase(context);
    }

    public static String getTableLogin()
    {
        String tableLogin = "CREATE TABLE IF NOT EXISTS [Login] ( [IdLogin] integer NOT NULL, [cargo] varchar(20) NOT NULL, " +
                "[cpf] varchar(11) NOT NULL, [email] varchar (80) NOT NULL, [login] varchar(11) NOT NULL, [FotoPerfilB64] BLOB, " +
                "[nome] varchar(255) NOT NULL, [nomeEmpresa] varchar(255) NOT NULL, [nomeGerente] varchar(255) NOT NULL, " +
                "[responsavel] varchar(255) NOT NULL, [rg] varchar(10) NOT NULL, [logado] int NOT NULL, [codigo] int NOT NULL," +
                " PRIMARY KEY ([IdLogin]))";

        return tableLogin;
    }


    public void insertLogin(ForcaVenda forcaVenda)
    {
        Log.d("MeuLog", "Executou insertLogin");

        SQLiteDatabase dbs = db.getWritableDatabase();
        ContentValues values = new ContentValues();

        values.put(COLUNA_CPF, forcaVenda.cpf);
        values.put(COLUNA_EMAIL, forcaVenda.email);
        values.put(COLUNA_LOGIN, forcaVenda.login);
        values.put(COLUNA_FOTOPERFIL, forcaVenda.fotoPerfil);
        values.put(COLUNA_NOME, forcaVenda.nome);
        values.put(COLUNA_NOMEEMPRESA, forcaVenda.nomeEmpresa);
        values.put(COLUNA_NOMEGERENTE, forcaVenda.nomeGerente);
        values.put(COLUNA_RESPONSAVEL, forcaVenda.responsavel);
        values.put(COLUNA_RG, forcaVenda.rg);
        values.put(COLUNA_CARGO, forcaVenda.cargo);
        values.put(COLUNA_LOGADO, 1);
        values.put(COLUNA_CODIGO, forcaVenda.codigo);

        dbs.insert("Login", null, values);

        Log.i("MeuLog", "Executou metodo insertLogin");

        dbs.close();
    }

    public void insertTeste()
    {
        Log.d("MeuLog", "Executou insertLogin");

        SQLiteDatabase dbs = db.getWritableDatabase();
        ContentValues values = new ContentValues();

        values.put(COLUNA_CPF, "46809897852");
        values.put(COLUNA_EMAIL, "almeida_yago@hotmail.com");
        values.put(COLUNA_LOGIN, "4680897852");
        values.put(COLUNA_FOTOPERFIL, "fdsd");
        values.put(COLUNA_NOME, "Yago Almeida");
        values.put(COLUNA_NOMEEMPRESA, "Vector ITC Group");
        values.put(COLUNA_NOMEGERENTE, "Fernando");
        values.put(COLUNA_RESPONSAVEL, "Fernando");
        values.put(COLUNA_RG, "59838611");
        values.put(COLUNA_CARGO, "Dev");
        values.put(COLUNA_LOGADO, 1);

        dbs.insert("Login", null, values);

        Log.i("MeuLog", "Executou metodo insertLogin de Teste");

        dbs.close();
    }
}
