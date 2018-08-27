package utils;

import android.os.Environment;
import android.util.Base64;
import android.util.Log;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;

public class GerarArquivo {

    public boolean gerarArquivo(String base64Arquivo, String nomeArquivo, String extensaoArquivo){

        File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        File file = new File(path, nomeArquivo + "." + extensaoArquivo);

        byte[] pdfAsBytes = Base64.decode(base64Arquivo, 0);

        try {
            FileOutputStream stream = new FileOutputStream(file, true);
            stream.write(pdfAsBytes);
            stream.flush();
            stream.close();
            Log.i("GerarArquivo", "Arquivo salvo com sucesso");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return false;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

        return true;
    }

}
