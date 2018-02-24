package controllers;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.google.gson.Gson;

import models.DataBase;
import models.ForcaVenda;
import models.Plano;
import models.tablePlanos;

/**
 * Created by sleke on 23/02/2018.
 */

public class cadastro_planoController {

    Context context;

    public cadastro_planoController(Context ctx) {
        this.context = ctx;
    }

    @JavascriptInterface
    public Plano PlanoFromJSON(String jsonString)
    {
        Log.d("MeuLog", "Inserir plano");

        Gson gson = new Gson();

        //todo retirar pra teste
        Plano plano = gson.fromJson(jsonString, Plano.class);

//        Plano plano = new Plano();
//        plano.setIdPlanos("1");
//        plano.setValorMensal("R$10,00");
//        plano.setValorAnual("R$120,00");
//        plano.setTitulo("titulo corinthians");
//        plano.setTipo("tipo diferente");
//        plano.setNomePlano("nome plano doido loko");
//        plano.setAtivo("ativo plano");

        Log.d("MeuLog", "Inserir esses dados:  "
                + plano.getIdPlanos() + " ID " +
                 plano.getNomePlano()+ " NomePlano " +
                 plano.getAtivo() + " Ativo " +
                 plano.getTipo()+ " Tipo " +
                 plano.getTitulo()+ " Titulo " +
                 plano.getValorAnual()+ " ValorAnual " +
                 plano.getValorMensal() + " ValorMensal "
        );

        boolean insertOK = inserirPlano(plano);

        if (insertOK)
            return plano;
        else
            return null;
    }

    @JavascriptInterface
    private boolean inserirPlano(Plano plano) {
        boolean insertOK = false;

        try{
            DataBase db = new DataBase(context);

            Log.d("MeuLog", "Inicio insert");

            ContentValues values = new ContentValues();

            values.put(tablePlanos.COLUNA_IDPLANOS, plano.getIdPlanos());
            values.put(tablePlanos.COLUNA_NOMEPLANO, plano.getNomePlano());
            values.put(tablePlanos.COLUNA_TITULO, plano.getTitulo());
            values.put(tablePlanos.COLUNA_TIPO, plano.getTipo());
            values.put(tablePlanos.COLUNA_VALORANUAL, plano.getValorAnual());
            values.put(tablePlanos.COLUNA_VALORMENSAL, plano.getValorMensal());
            values.put(tablePlanos.COLUNA_ATIVO, plano.getAtivo());

            db.addInsert(tablePlanos.TABELA_PLANO, values);

            db.close();

            Log.d("MeuLog", "insert realizado com sucesso");

            insertOK = true;
        }catch (Exception e){
            insertOK = false;
            Log.d("MeuLog", "Erro: " + e.getMessage());
        }

        return insertOK;
    }

    @JavascriptInterface
    public Plano BuscarPlanoFromJSON(String tabela, String id){

        DataBase dataBase = new DataBase(context);

        Plano plano = new Plano();

        Log.i("MeuLog", "Executar Buscar "+ tabela + " id = "+ id);

        Cursor cursor = dataBase.buscarTable(tablePlanos.TABELA_PLANO, tablePlanos.COLUNA_IDPLANOS, id);

        if(cursor!=null) {
            cursor.moveToFirst();

            plano.setAtivo(cursor.getString(cursor.getColumnIndexOrThrow(tablePlanos.COLUNA_ATIVO)));
            plano.setIdPlanos(cursor.getString(cursor.getColumnIndexOrThrow(tablePlanos.COLUNA_IDPLANOS)));
            plano.setNomePlano(cursor.getString(cursor.getColumnIndexOrThrow(tablePlanos.COLUNA_NOMEPLANO)));
            plano.setTipo(cursor.getString(cursor.getColumnIndexOrThrow(tablePlanos.COLUNA_TIPO)));
            plano.setTitulo(cursor.getString(cursor.getColumnIndexOrThrow(tablePlanos.COLUNA_TITULO)));
            plano.setValorAnual(cursor.getString(cursor.getColumnIndexOrThrow(tablePlanos.COLUNA_VALORANUAL)));
            plano.setValorMensal(cursor.getString(cursor.getColumnIndexOrThrow(tablePlanos.COLUNA_VALORMENSAL)));

        } else {
            plano = null;
        }

        return plano;
    }

}
