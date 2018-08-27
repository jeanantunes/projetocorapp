package utils;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.ContextCompat;

import com.vendaodonto.vendasodontoprev.MainActivity;
import com.vendaodonto.vendasodontoprev.R;

import java.util.Date;

public class Notificacao {

    Context context;
    private NotificationManager notifManager;
    private NotificationChannel mChannel;

    public Notificacao(Context context){
        this.context = context;
    }

    public void gerarNotificacao(String titulo, String mensagem){

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
                        ("0", titulo, importance);
                mChannel.setDescription(mensagem);
                mChannel.enableVibration(true);
                notifManager.createNotificationChannel(mChannel);
            }
            builder = new NotificationCompat.Builder(context, "0");

            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP |
                    Intent.FLAG_ACTIVITY_SINGLE_TOP);
            pendingIntent = PendingIntent.getActivity(context, m, intent, PendingIntent.FLAG_ONE_SHOT);
            builder.setContentTitle(titulo)
                    .setSmallIcon(getNotificationIcon()) // required
                    .setContentText(mensagem)  // required
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(mensagem))
                    .setAutoCancel(true)
                    .setLargeIcon(BitmapFactory.decodeResource
                            (context.getResources(), R.drawable.icon_status_bar))
                    .setBadgeIconType(R.drawable.ic_push)
                    .setContentIntent(pendingIntent)
                    .setSound(RingtoneManager.getDefaultUri
                            (RingtoneManager.TYPE_NOTIFICATION));
            android.app.Notification notification = builder.build();
            notifManager.notify(m, notification);

        } else {

            Intent intent = new Intent(context, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            PendingIntent pendingIntent = null;

            pendingIntent = PendingIntent.getActivity(context, m, intent, PendingIntent.FLAG_ONE_SHOT);

            Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(context)
                    .setContentTitle(titulo)
                    .setContentText(mensagem)
                    .setStyle(new NotificationCompat.BigTextStyle().bigText(mensagem))
                    .setAutoCancel(true)
                    .setColor(ContextCompat.getColor(context, R.color.common_google_signin_btn_text_dark))
                    .setSound(defaultSoundUri)
                    .setSmallIcon(getNotificationIcon())
                    .setContentIntent(pendingIntent)
                    .setStyle(new NotificationCompat.BigTextStyle().setBigContentTitle(titulo).bigText(mensagem));

            NotificationManager notificationManager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);

            notificationManager.notify(m, notificationBuilder.build());
        }
    }

    private int getNotificationIcon() {

        boolean useWhiteIcon = (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N);
        return useWhiteIcon ? R.drawable.ic_push : R.drawable.icon_status_bar;
    }

}
