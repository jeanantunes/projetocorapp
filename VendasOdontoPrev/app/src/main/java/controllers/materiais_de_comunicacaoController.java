package controllers;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
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

import com.vendaodonto.vendasodontoprev.MainActivity;
import com.vendaodonto.vendasodontoprev.R;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

public class materiais_de_comunicacaoController {


    Context context;
    private NotificationManager notifManager;
    private NotificationChannel mChannel;

    public materiais_de_comunicacaoController(Context ctx) {
        this.context = ctx;
    }

    @JavascriptInterface
    public void gerarArquivo(String base64Arquivo, String nomeArquivo, String extensaoArquivo){

        File path = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
        File file = new File(path, nomeArquivo + "." + extensaoArquivo);

        byte[] pdfAsBytes = Base64.decode(base64Arquivo, 0);

        try {
            FileOutputStream stream = new FileOutputStream(file, true);
            stream.write(pdfAsBytes);
            stream.flush();
            stream.close();
            Log.i("saveData", "Data Saved");
            sendMyNotification("Download do arquivo concluído: " + nomeArquivo + "." + extensaoArquivo, "Acesse a pasta downloads para obter o arquivo.");

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



}
