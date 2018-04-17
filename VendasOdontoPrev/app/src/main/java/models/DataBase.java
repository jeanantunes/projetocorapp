package models;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

public class DataBase extends SQLiteOpenHelper {

    private static final int VERSAO_DO_BANCO = 1;
    private static final String BANCO_CLIENTE = "Odonto";

    private static final String TABELA_CLIENTE = "tb_cliente";

    private static final String COLUNA_ID = "id";
    private static final String COLUNA_NOME = "nome";
    private static final String COLUNA_CPF = "cpf";
    private static final String COLUNA_CELULAR = "celular";
//    private static final String COLUNA_ESTADO = "estado";
  //  private static final String COLUNA_CIDADE = "cidade";
 //   private static final String COLUNA_CORRETORA = "corretora";
    private static final String COLUNA_EMAIL = "email";
    private static final String COLUNA_SENHA = "senha";

    public DataBase(Context context) {
        super(context, BANCO_CLIENTE, null, VERSAO_DO_BANCO);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {

        String QUERY_COLUNA = "CREATE TABLE "
                + TABELA_CLIENTE    + "("
                + COLUNA_ID         + " INTEGER PRIMARY KEY, "
                + COLUNA_NOME       + " TEXT, "
                + COLUNA_CPF        + " TEXT, "
                + COLUNA_CELULAR    + " TEXT, "
                + COLUNA_EMAIL      + " TEXT, "
                + COLUNA_SENHA      + " TEXT)";

        db.execSQL(tableBeneficiario.getTableBeneficiario());
        db.execSQL(tableCoberturas.getTableCoberturas());
        db.execSQL(tableCorretora.getTableCorretora());
        db.execSQL(tableDocumentos.getTableDocumentos());
        db.execSQL(tableDocumentosAssociados.getTableDocumentosAssociados());
        db.execSQL(tableEndereco.getTableEndereco());
        db.execSQL(tableForcaVendas.getTableForcaVendas());
        db.execSQL(tableLogin.getTableLogin());
        db.execSQL(tablePlanos.getTablePlanos());
        db.execSQL(tablePlanosBeneficiarios.getTablePlanosBeneficiarios());
        db.execSQL(tablePlanosCoberturas.getTablePlanosCoberturas());
        db.execSQL(tableStatusForcaVendas.getTableStatusForcaVendas());
        db.execSQL(tableTipoDocumento.getTableTipoDocumento());
    }

    @Override
    public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {}

    public void addCliente(Cliente cliente)
    {

        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();

        values.put(COLUNA_NOME, cliente.getNome());
        values.put(COLUNA_CPF, cliente.getCpf());
        values.put(COLUNA_CELULAR, cliente.getCelular());
        values.put(COLUNA_EMAIL, cliente.getEmail());
        values.put(COLUNA_SENHA, cliente.getSenha());

        db.insert(TABELA_CLIENTE, null, values);

        Log.d("MeuLog", "Salvo!!!");
        db.close();
    }

    public void addInsert(String tabela, ContentValues values) throws Exception
    {

        SQLiteDatabase db = this.getWritableDatabase();

        db.insert(tabela, null, values);

        Log.d("MeuLog", "Salvo!!!");
        db.close();
    }

    public Cursor buscarTable(String tabela,String nomcoluna, String id){
        try{
            Plano plano = new Plano();

            StringBuilder sql = new StringBuilder();

            sql.append("SELECT * ");
            sql.append("FROM " + tabela + " ");
            sql.append("WHERE "+ nomcoluna + " = " + id);

            SQLiteDatabase dbs = getReadableDatabase();

            Cursor resultado = dbs.rawQuery(sql.toString(), null);

            if (resultado.getCount() > 0) {

                Log.i("MeuLog", "Executou Buscar "+ tabela + " id = "+ id);
                return resultado;
            } else {
                Log.i("MeuLog", "Nenhum dado");
                return null;
            }

        }catch (Exception e){
            return null;
        }
    }

    public void addEndereco(Endereco endereco) {

        SQLiteDatabase db = this.getWritableDatabase();
        ContentValues values = new ContentValues();

        values.put("Logradouro", endereco.getLogradouro());
        values.put("Cep", endereco.getCep());
        values.put("Cidade", endereco.getCidade());
        values.put("Complemento", endereco.getComplemento());
        values.put("IdTipoEndereco", "1");
        values.put("Bairro", endereco.getBairro());
        values.put("Uf", endereco.getUf());

        db.insert("Endereco", null, values);

        Log.d("MeuLog", "Endereco inserido!!");

        db.close();
    }

    public void insertStatus()
    {
        SQLiteDatabase dbs = this.getWritableDatabase();
        ContentValues values = new ContentValues();

        values.put("Descricao", "ativo" );

        dbs.insert("StatusForcaVendas", null, values);

        Log.d("MeuLog", "Status inserido!!");

        dbs.close();
    }
}
