package controllers;

import com.google.gson.Gson;

import static android.widget.Toast.makeText;

/**
 * Created by Treinamento6 on 11/01/2018.
 */

public class teste2CTRL {

    @android.webkit.JavascriptInterface
    public int calculateSum(int numA, int numB)
    {
        //Intent pagina2 = new Intent(MainActivity.this, Main2Activity.class);

        //pagina2.setFlags(Intent.FLAG_ACTIVITY_NO_HISTORY);
        //startActivity(pagina2);

        Gson gson = new Gson();

        return numA - numB;

    }
}
