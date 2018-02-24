package com.vendaodonto.vendasodontoprev;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Environment;
import android.provider.MediaStore;
import android.support.v4.content.FileProvider;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.widget.Toast;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import controllers.logadoController;

public class GaleriaActivity extends AppCompatActivity {

    private final int GALERIA_IMAGENS = 1;
    private final int RECORTAR_TESTE = 2;
    private final int CAMERA = 3;
    public static boolean fecharGaleria;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_galeria);
        abrirgaleria();
    }

    public void abrirgaleria()
    {
        fecharGaleria = false;
        Log.d("MeuLog", "Executou o metodo abrirgaleria");
        try {
            Intent intent = new Intent();
            intent.setType("image/*");
            intent.setAction(Intent.ACTION_GET_CONTENT);//
            startActivityForResult(intent, RECORTAR_TESTE);

        }catch (Exception e)
        {
            Log.d("MeuLog", "Erro: " + e.toString());
        }
    }


    //Metodo para mandar o intent de tirar foto para a camera
    private void tirarFoto() {
        Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        if (takePictureIntent.resolveActivity(getPackageManager()) != null) {
            try {
                arquivoFoto = criarArquivo();
            } catch (IOException ex) {
                // Manipulação em caso de falha de criação do arquivo//

            }
            if (arquivoFoto != null) {
                Uri photoURI = FileProvider.getUriForFile(getBaseContext(),
                        getBaseContext().getApplicationContext().getPackageName()
                                + ".provider", arquivoFoto);
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                startActivityForResult(takePictureIntent, CAMERA);
            }
        }
    }


    private File arquivoFoto = null;

    //Ao iniciar a camera é criado um arquivo no diretório com a data e hora da foto
    private File criarArquivo() throws IOException {
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        File pasta = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
        File imagem = new File(pasta.getPath() + File.separator + "JPG_" + timeStamp + ".jpg");
        //path = imagem.toString();
        Log.i("LOGTESTE", "CriarArquivo" + imagem.toString());
        Log.i("WHATS", String.valueOf(imagem));
        return imagem;
    }



   // private void exibirImagem() {
   //     int targetW = imagem.getWidth();
   //     int targetH = imagem.getHeight();

   //     BitmapFactory.Options bmOptions = new BitmapFactory.Options();
   //     bmOptions.inJustDecodeBounds = true;
   //     BitmapFactory.decodeFile(arquivoFoto.getAbsolutePath(), bmOptions);
   //     int photoW = bmOptions.outWidth;
   //     int photoH = bmOptions.outHeight;
   //     int scaleFactor = Math.min(photoW / targetW, photoH / targetH);
   //     bmOptions.inJustDecodeBounds = false;
   //     bmOptions.inSampleSize = scaleFactor;
   //     Bitmap bitmap = BitmapFactory.decodeFile(arquivoFoto.getAbsolutePath(), bmOptions);
   //     imagem.setImageBitmap(bitmap);
   // }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        try {


            Log.d("MeuLog", "Executou metodo onActivityResult");
            //Os metodos são para confirmar que foi tirada a foto, buscar a mesma no diretório
            // e chamar o metodo para exibir a imagem no ImageView


            if (requestCode == CAMERA && resultCode == RESULT_OK) {
                sendBroadcast(new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE, Uri.fromFile(arquivoFoto)));
                Log.d("MeuLog", "onActivityResult: Camera");
                //exibirImagem();
            }


            if (requestCode == RECORTAR_TESTE && resultCode == RESULT_OK) {

                Bitmap bm = null;
                try {
                    bm = MediaStore.Images.Media.getBitmap(getApplicationContext().getContentResolver(), data.getData());


                    base64(cropToSquare(bm));

                    Log.d("MeuLog", "Entrou no if RECORTAR_TESTE");
                    fecharGaleria = true;
                    finish();
                } catch (IOException e) {
                    Log.d("MeuLog", "Erro: " + e.toString());
                    e.printStackTrace();
                }

                Log.d("MeuLog", "onActivityResult RECORTAR_TESTE");
                //imagem.setImageBitmap(cropToSquare(bm));

            }


            if (requestCode == GALERIA_IMAGENS && resultCode == RESULT_OK) {
                Bitmap bm = null;
                try {
                    bm = MediaStore.Images.Media.getBitmap(getApplicationContext().getContentResolver(), data.getData());

                    base64(bm);
                    Toast.makeText(this, "Pegou da galeria", Toast.LENGTH_LONG);
                    Log.d("MeuLog", "Entrou no if galeria");
                    //Intent intent = new Intent(this, MainActivity.class);
                    //intent.addFlags(Intent.);
                    //startActivity(intent);
                    fecharGaleria = true;


                    finish();


                } catch (IOException e) {
                    Log.d("MeuLog", "Erro: " + e.toString());
                    e.printStackTrace();
                }
                //imagem.setImageBitmap(bm);

            }
        }catch (Exception e)
        {
            Log.d("MeuLog", "Erro: " + e.toString());
        }

        Log.d("MeuLog", "Executou finish");
        fecharGaleria = true;
        finish();
    }


    private void base64(Bitmap bitmap){

    //    Bitmap result = null;
    //    try {
    //        result = Bitmap.createBitmap(200, 200, Bitmap.Config.ARGB_8888);
    //        Canvas canvas = new Canvas(result);
//
    //        int color = 0xff424242;
    //        Paint paint = new Paint();
    //        Rect rect = new Rect(0, 0, 200, 200);
//
    //        //paint.setAntiAlias(true);
    //        //canvas.drawARGB(0, 0, 0, 0);
    //        //paint.setColor(color);
    //        //canvas.drawCircle(50, 50, 50, paint);
    //        //paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
    //        canvas.drawBitmap(bitmap, rect, rect, paint);
//
    //        }
    //        catch (NullPointerException e) {
    //        }
    //        catch (OutOfMemoryError o) {
    //    }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
        byte[] byteArray = byteArrayOutputStream .toByteArray();
        logadoController logado = new logadoController(MainActivity.ctx);
        logado.base64 = Base64.encodeToString(byteArray , Base64.NO_WRAP);
        //Log.d("MeuLog", logado.getBase64());
    }


    public Bitmap cropToSquare(Bitmap bitmap){
        int width  = bitmap.getWidth();
        int height = bitmap.getHeight();
        int newWidth = (height > width) ? width : height;
        int newHeight = (height > width)? height - ( height - width) : height;
        int cropW = (width - height) / 2;
        cropW = (cropW < 0)? 0: cropW;
        int cropH = (height - width) / 2;
        cropH = (cropH < 0)? 0: cropH;
        Bitmap cropImg = Bitmap.createBitmap(bitmap, cropW, cropH, newWidth, newHeight);

        return cropImg;
    }

    @Override
    public void onBackPressed() {
        Log.d("MeuLog", "Fechou activity");
        finish();
    }





}
