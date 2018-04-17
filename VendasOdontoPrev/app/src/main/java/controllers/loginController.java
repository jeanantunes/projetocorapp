package controllers;

import android.arch.core.internal.SafeIterableMap;
import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.google.gson.Gson;

import models.Cliente;
import models.ForcaVenda;
import models.tableLogin;

/**
 * Created by Treinamento6 on 22/02/2018.
 */

public class loginController {

    Context context;

    public loginController(Context context) {
        this.context = context;
    }

    @JavascriptInterface
    public void imprimirAlgo(String erro)
    {
        Log.i("MeuLog", "Executou JavaScript Interface " + erro);
    }

    @JavascriptInterface
    public void imprimirSucess()
    {
        Log.i("MeuLog", "Erro: ");
        Log.i("MeuLog", "Executou JavaScript Interface com erro no AJAX");
    }

    @JavascriptInterface
    public void salvarDadosUsuario(String jsonDadosUsuario)
    {
        Gson gson = new Gson();

        ForcaVenda forcaVenda = gson.fromJson(jsonDadosUsuario, ForcaVenda.class);

        tableLogin modelLogin = new tableLogin(context);

        modelLogin.insertLogin(forcaVenda);

        Log.i("MeuLog", "" + jsonDadosUsuario);
    }
}
