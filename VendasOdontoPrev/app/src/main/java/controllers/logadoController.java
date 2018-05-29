package controllers;

import android.content.Context;
import android.content.Intent;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.google.gson.Gson;
import com.vendaodonto.vendasodontoprev.GaleriaActivity;
import com.vendaodonto.vendasodontoprev.MainActivity;

import models.DataBase;
import models.ForcaVenda;


/**
 * Created by Treinamento6 on 30/01/2018.
 */

public class logadoController {

    Context context;
    DataBase db;

    public String getBase64() {
        return base64;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }

    public static String base64;

    private final int GALERIA_IMAGENS = 1;

    public logadoController(Context context) {
        this.context = context;
        db = new DataBase(context);
    }

    @JavascriptInterface
    public void abrirgaleria()
    {
        GaleriaActivity.fecharGaleria = false;
        Log.d("MeuLog","" + GaleriaActivity.fecharGaleria);
        Log.d("MeuLog", "Executou o metodo imprimir");
        Intent intent = new Intent(context, GaleriaActivity.class);
        context.startActivity(intent);

        Log.d("MeuLog","" + GaleriaActivity.fecharGaleria);

        while (GaleriaActivity.fecharGaleria == false) {
            try {
                Thread.currentThread().sleep(0,1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }

        Log.d("MeuLog", "Fechou a galeria");
        Log.d("MeuLog","" + GaleriaActivity.fecharGaleria);
    }

    @JavascriptInterface
    public String retornoB64()
    {
        Log.d("MeuLog", "Base 64" + getBase64());
        Log.d("MeuLog", "entrou no log retorno");
        return base64;
    }

    @JavascriptInterface
    public String getDadosUsuarios()
    {
        ForcaVenda getDados = buscar(1);

        Gson gson = new Gson();

        Log.d("MeuLog", "" + gson.toJson(getDados));

        return gson.toJson(getDados);
    }

    public ForcaVenda buscar(int codigo) {

        ForcaVenda forca = new ForcaVenda();

        StringBuilder sql = new StringBuilder();

        sql.append("SELECT * ");
        sql.append("FROM Login ");
        sql.append("WHERE IdLogin = " + codigo);



        SQLiteDatabase dbs = db.getReadableDatabase();

        Cursor resultado = dbs.rawQuery(sql.toString(), null);

        if (resultado.getCount() > 0)
        {
            resultado.moveToFirst();

            forca.setCargo(resultado.getString( resultado.getColumnIndexOrThrow("cargo")));
            forca.setCpf(resultado.getString( resultado.getColumnIndexOrThrow("cpf")));
            forca.setLogado(resultado.getString( resultado.getColumnIndexOrThrow("logado")));
            forca.setEmail(resultado.getString(resultado.getColumnIndexOrThrow("email")));
            forca.setNome(resultado.getString(resultado.getColumnIndexOrThrow("nome")));
            forca.setNomeEmpresa(resultado.getString(resultado.getColumnIndexOrThrow("nomeEmpresa")));

            Log.i("MeuLog", "" + forca.getNomeEmpresa());
            return forca;
        }
        return null;
    }

    @JavascriptInterface
    public void sairDaConta()
    {
        Log.d("MeuLog", "Sair da conta executado com sucesso");

        SairDaConta sair = new SairDaConta(context);

        sair.removerRegistroLogin();
    }

    @JavascriptInterface
    public void deslogar()
    {
        Log.d("MeuLog", "Log executado com sucesso!");

        Log.d("MeuLog", "Sair da conta executado com sucesso");

        SairDaConta sair = new SairDaConta(context);

        sair.removerRegistroLogin();
    }




}
