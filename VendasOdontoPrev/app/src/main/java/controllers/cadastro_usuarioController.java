package controllers;
import android.content.Context;
import android.content.Intent;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import com.google.gson.Gson;
import com.vendaodonto.vendasodontoprev.GaleriaActivity;
import com.vendaodonto.vendasodontoprev.MainActivity;
import models.Cliente;
import models.DataBase;

import static android.support.v4.content.ContextCompat.startActivity;


public class cadastro_usuarioController
{
    Context context;

    public cadastro_usuarioController(Context ctx) {
        this.context = ctx;
    }


    @JavascriptInterface
    public void imprimirCliente()
    {
        Log.i("MeuLog", "teste");
    }

    @JavascriptInterface
    public int calculateSum(int numA, int numB)
    {
        //Intent pagina2 = new Intent(MainActivity.this, Main2Activity.class);

        //pagina2.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
        //startActivity(pagina2);

        Gson gson = new Gson();

        Log.i("MeuLog", "teste");

        return numA - numB;
    }

    @JavascriptInterface
    public Cliente ClienteFromJSON(String jsonString)
    {
        Log.d("MeuLog", "Fogfjghi ");

        Gson gson = new Gson();
        Cliente cliente = gson.fromJson(jsonString, Cliente.class);

        Log.d("MeuLog", "Foi " + cliente.getNome() + " " + cliente.getCelular() + " " + cliente.getEmail() + " " + cliente.getCpf() + " " + cliente.getSenha());

        inserirUsuario(cliente);
        return cliente;
    }

    @JavascriptInterface
    private void inserirUsuario(Cliente cliente)
    {
        Log.d("MeuLog", "Foi " + cliente.getNome() + " " + cliente.getCelular() + " " + cliente.getEmail() + " " + cliente.getCpf());

        Log.d("MeuLog", "Foi");

        DataBase db = new DataBase(context);

        Log.d("MeuLog", "Foi1");

        db.addCliente(cliente);

        db.close();

        //Cad.inserir(cliente);

        //banco.incluirRegistro( cliente );
        Log.d("MeuLog", "Foi2");

        //dadosOpenHelper.close();
    }


    private void buscarCliente()
    {
        //Log.d("MeuLog", "" + Cad.buscar(0));
    }

 }
