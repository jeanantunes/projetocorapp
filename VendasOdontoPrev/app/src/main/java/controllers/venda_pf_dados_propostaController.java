package controllers;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.google.gson.Gson;

import models.DataBase;
import models.Endereco;

/**
 * Created by Treinamento6 on 02/02/2018.
 */

public class venda_pf_dados_propostaController {

    Context context;

    public venda_pf_dados_propostaController(Context ctx) {
        this.context = ctx;
    }

    @JavascriptInterface
    public void insertEndereco (String Json)
    {
        Gson gson = new Gson();
        Endereco endereco = gson.fromJson(Json, Endereco.class);

        Log.d("MeuLog", "Entrou no metodo endereco: " + endereco.getCep() + ", " + endereco.getLogradouro() + "" +
                ", " + endereco.getNumero() + ", " + endereco.getComplemento() + ", " + endereco.getBairro() + ", " + endereco.getUf() + ", " +
                "" + endereco.getCidade());

        DataBase db = new DataBase(context);

        db.addEndereco(endereco);

        db.close();

        Log.d("MeuLog", "Foi, metodo insertEndereco");
    }
}
