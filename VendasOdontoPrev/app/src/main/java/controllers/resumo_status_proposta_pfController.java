package controllers;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.ContextCompat;
import android.util.Base64;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import com.vendaodonto.vendasodontoprev.MainActivity;
import com.vendaodonto.vendasodontoprev.MyFirebaseMessagingService;
import com.vendaodonto.vendasodontoprev.R;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

public class resumo_status_proposta_pfController {

    Context context;
    private NotificationManager notifManager;
    private NotificationChannel mChannel;

    public resumo_status_proposta_pfController(Context ctx) {
        this.context = ctx;
    }

    @JavascriptInterface
    public void gerarArquivo(String pdfBase64, String nomeArquivo){

        String DOWNLOADS_FOLDER = "file://";
        String fileName = "nomeboleto";

        File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        File file = new File(path, nomeArquivo + ".pdf");

        byte[] pdfAsBytes = Base64.decode(pdfBase64, 0);

        try {
            FileOutputStream stream = new FileOutputStream(file, true);
            stream.write(pdfAsBytes);
            stream.flush();
            stream.close();
            Log.i("saveData", "Data Saved");
            sendMyNotification("Download do boleto concluído: " + nomeArquivo + ".pdf", "Acesse a pasta downloads para obter o boleto.");


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void sendMyNotification(String title,String message) {

        int m = (int) ((new Date().getTime() / 1000L) % Integer.MAX_VALUE);

        if (notifManager == null) {
            notifManager = (NotificationManager) context.getSystemService
                    (Context.NOTIFICATION_SERVICE);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            NotificationCompat.Builder builder;
            Intent intent = new Intent(context, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            intent.putExtra("NotiClick",true);
            PendingIntent pendingIntent;
            int importance = NotificationManager.IMPORTANCE_HIGH;
            if (mChannel == null) {
                mChannel = new NotificationChannel
                        ("0", title, importance);
                mChannel.setDescription(message);
                mChannel.enableVibration(true);
                notifManager.createNotificationChannel(mChannel);
            }
            builder = new NotificationCompat.Builder(context, "0");

            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP |
                    Intent.FLAG_ACTIVITY_SINGLE_TOP);
            pendingIntent = PendingIntent.getActivity(context, m, intent, PendingIntent.FLAG_ONE_SHOT);
            builder.setContentTitle(title)
                    .setSmallIcon(getNotificationIcon()) // required
                    .setContentText(message)  // required
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(message))
                    .setAutoCancel(true)
                    .setLargeIcon(BitmapFactory.decodeResource
                            (context.getResources(), R.drawable.icon_status_bar))
                    .setBadgeIconType(R.drawable.ic_push)
                    .setContentIntent(pendingIntent)
                    .setSound(RingtoneManager.getDefaultUri
                            (RingtoneManager.TYPE_NOTIFICATION));
            Notification notification = builder.build();
            notifManager.notify(m, notification);

        } else {

            Intent intent = new Intent(context, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            PendingIntent pendingIntent = null;

            pendingIntent = PendingIntent.getActivity(context, m, intent, PendingIntent.FLAG_ONE_SHOT);

            Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(context)
                    .setContentTitle(title)
                    .setContentText(message)
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(message))
                    .setAutoCancel(true)
                    .setColor(ContextCompat.getColor(context, R.color.common_google_signin_btn_text_dark))
                    .setSound(defaultSoundUri)
                    .setSmallIcon(getNotificationIcon())
                    .setContentIntent(pendingIntent)
                    .setStyle(new NotificationCompat.BigTextStyle().setBigContentTitle(title).bigText(message));

            NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

            notificationManager.notify(m, notificationBuilder.build());
        }
    }


    /* Escolhe o icone de acordo com versao do android */
    private int getNotificationIcon() {

        boolean useWhiteIcon = (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N);
        return useWhiteIcon ? R.drawable.ic_push : R.drawable.icon_status_bar;
    }


    @JavascriptInterface
    public void compartilharPdf(String pdfBase64, String nomeArquivo) throws IOException {

        if(!appInstalledOrNot("com.whatsapp")){
            Toast.makeText(context, "Ops! Você não possui o WhastApp instalado", Toast.LENGTH_SHORT).show();
        }else{
            File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
            File file = new File(path, nomeArquivo + ".pdf");

            byte[] pdfAsBytes = Base64.decode(pdfBase64, 0);

            try {
                FileOutputStream stream = new FileOutputStream(file, true);

                stream.write(pdfAsBytes);
                stream.flush();
                stream.close();
                Log.i("saveData", "Data Saved");
                sendMyNotification("Download concluído: " + nomeArquivo, "Acesse a pasta downloads");


            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }

            Intent intentShareFile = new Intent(Intent.ACTION_SEND);
            File fileWithinMyDir = new File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString() + "//" + nomeArquivo + ".pdf");

            if(fileWithinMyDir.exists()) {
                intentShareFile.setType("application/pdf");
                intentShareFile.putExtra(Intent.EXTRA_STREAM, Uri.parse(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).toString() + "//" + nomeArquivo + ".pdf"));

                intentShareFile.putExtra(Intent.EXTRA_SUBJECT,
                        "Sharing File...");
                intentShareFile.putExtra(Intent.EXTRA_TEXT, "Sharing File...");

                context.startActivity(Intent.createChooser(intentShareFile, "Share File"));
            }
        }
    }

    private boolean appInstalledOrNot(String uri) {

        PackageManager pm = context.getPackageManager();
        boolean app_installed;
        try {
            pm.getPackageInfo(uri, PackageManager.GET_ACTIVITIES);
            app_installed = true;
        }
        catch (PackageManager.NameNotFoundException e) {
            app_installed = false;
        }
        return app_installed;
    }

}
