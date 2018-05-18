package com.vendaodonto.vendasodontoprev;

import android.annotation.SuppressLint;
import android.annotation.TargetApi;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.BitmapFactory;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.support.v4.app.NotificationCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import java.util.Date;
import java.util.Random;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

    private NotificationChannel mChannel;
    private NotificationManager notifManager;

    @Override
    public void onMessageReceived(RemoteMessage message) {
        Log.d("MeuLog", "Mensagem recebida: " + message.getNotification().getTitle());
        try {
            sendMyNotification(message.getNotification().getTitle() ,message.getNotification().getBody());

        } catch (Exception e){
            Log.d("MeuLog", e.toString());
        }

    }

    private void sendMyNotification(String title,String message) {

        int m = (int) ((new Date().getTime() / 1000L) % Integer.MAX_VALUE);

        if (notifManager == null) {
            notifManager = (NotificationManager) getSystemService
                    (Context.NOTIFICATION_SERVICE);
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationCompat.Builder builder;
            Intent intent = new Intent(this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            PendingIntent pendingIntent;
            int importance = NotificationManager.IMPORTANCE_HIGH;
            if (mChannel == null) {
                mChannel = new NotificationChannel
                        ("0", title, importance);
                mChannel.setDescription(message);
                mChannel.enableVibration(true);
                notifManager.createNotificationChannel(mChannel);
            }
            builder = new NotificationCompat.Builder(this, "0");

            intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP |
                    Intent.FLAG_ACTIVITY_SINGLE_TOP);
            pendingIntent = PendingIntent.getActivity(this, m, intent, PendingIntent.FLAG_ONE_SHOT);
            builder.setContentTitle(title)
                    .setSmallIcon(getNotificationIcon()) // required
                    .setContentText(message)  // required

                    .setAutoCancel(true)
                    .setLargeIcon(BitmapFactory.decodeResource
                            (getResources(), R.drawable.icon_status_bar))
                    .setBadgeIconType(R.drawable.icon_status_bar)
                    .setContentIntent(pendingIntent)
                    .setSound(RingtoneManager.getDefaultUri
                            (RingtoneManager.TYPE_NOTIFICATION));
            Notification notification = builder.build();
            notifManager.notify(0, notification);
        } else {

            Intent intent = new Intent(this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            PendingIntent pendingIntent = null;

            pendingIntent = PendingIntent.getActivity(this, m, intent, PendingIntent.FLAG_ONE_SHOT);

            Uri defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
            NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
                    .setContentTitle(title)
                    .setContentText(message)
                    .setAutoCancel(true)
                    .setColor(ContextCompat.getColor(getBaseContext(), R.color.common_google_signin_btn_text_dark))
                    .setSound(defaultSoundUri)
                    .setSmallIcon(getNotificationIcon())
                    .setContentIntent(pendingIntent)
                    .setStyle(new NotificationCompat.BigTextStyle().setBigContentTitle(title).bigText(message));

            NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

            notificationManager.notify(m, notificationBuilder.build());
        }
    }

        //Intent intent = new Intent(this, MainActivity.class);
        ////intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        //PendingIntent pendingIntent = PendingIntent.getActivity(this,0 /* request code */, intent,PendingIntent.FLAG_ONE_SHOT);
//
        //long[] pattern = {500,500,500,500,500};
//
        //Uri defaultSoundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
//
        //NotificationCompat.Builder notificationBuilder = (NotificationCompat.Builder) new NotificationCompat.Builder(this)
        //        .setSmallIcon(R.drawable.ic_action_spotify)
        //        .setContentTitle(title)
        //        .setContentText(message)
        //        .setAutoCancel(true)
        //        .setVibrate(pattern)
        //        .setLights(Color.BLUE,1,1)
        //        .setSound(defaultSoundUri)
        //        .setContentIntent(pendingIntent);
//
        //Log.d("MeuLog", "Mensagem recebida: " + message);
//
        //NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//
        //if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//
      /*// Create or update. */
        //    NotificationChannel channel = new NotificationChannel("my_channel_01",
        //            "Channel human readable title",
        //            NotificationManager.IMPORTANCE_HIGH);
        //    notificationManager.createNotificationChannel(channel);
        //}
//
        //int m = (int) ((new Date().getTime() / 1000L) % Integer.MAX_VALUE);
//
        //notificationManager.notify(m /* ID of notification */, notificationBuilder.build());







        ////On click of notification it redirect to this Activity
        //long[] pattern = {500,500,500,500,500};
        //Intent intent = new Intent(this, MainActivity.class);
        ////intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        //PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);
//
        //Uri soundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        //NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
        //        .setSmallIcon(R.mipmap.ic_launcher_round)
        //        .setContentTitle(title)+
        //        .setContentText(message)
        //        .setAutoCancel(true)
        //        .setVibrate(pattern)
        //        .setLights(Color.BLUE,1,1)
        //        .setSound(soundUri)
        //        .setContentIntent(pendingIntent);
//
//
        //NotificationManager notificationManager =
        //        (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
//
        //if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) createChannel(notificationManager);
//
        //notificationManager.notify(0, notificationBuilder.build());





        //NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        //String NOTIFICATION_CHANNEL_ID = "my_channel_id_01";
//
        //if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        //    @SuppressLint("WrongConstant") NotificationChannel notificationChannel = new NotificationChannel(NOTIFICATION_CHANNEL_ID, "My Notifications", NotificationManager.IMPORTANCE_MAX);
//
        //    // Configure the notification channel.
        //    notificationChannel.setDescription("Channel description");
        //    notificationChannel.enableLights(true);
        //    notificationChannel.setLightColor(Color.RED);
        //    notificationChannel.setVibrationPattern(new long[]{0, 1000, 500, 1000});
        //    notificationChannel.enableVibration(true);
        //    notificationManager.createNotificationChannel(notificationChannel);
        //}
//
//
        //NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID);
//
        //notificationBuilder.setAutoCancel(true)
        //        .setDefaults(Notification.DEFAULT_ALL)
        //        .setWhen(System.currentTimeMillis())
        //        .setSmallIcon(R.drawable.icon_status_bar)
        //        .setTicker("Hearty365")
        //        //     .setPriority(Notification.PRIORITY_MAX)
        //        .setContentTitle("Default notification")
        //        .setContentText("Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
        //        .setContentInfo("Info");
//
        //notificationManager.notify(/*notification id*/1, notificationBuilder.build());


    @TargetApi(26)
    private void createChannel(NotificationManager notificationManager) {
        String name = "FileDownload";
        String description = "Notifications for download status";
        int importance = NotificationManager.IMPORTANCE_DEFAULT;

        NotificationChannel mChannel = new NotificationChannel(name, name, importance);
        mChannel.setDescription(description);
        mChannel.enableLights(true);
        mChannel.setLightColor(Color.BLUE);
        notificationManager.createNotificationChannel(mChannel);
    }

    private int getNotificationIcon() {
        boolean useWhiteIcon = (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP);
        return useWhiteIcon ? R.drawable.ic_action_spotify : R.drawable.icon_status_bar;
    }

}
