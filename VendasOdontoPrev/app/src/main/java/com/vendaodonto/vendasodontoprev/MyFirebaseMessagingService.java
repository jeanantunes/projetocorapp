package com.vendaodonto.vendasodontoprev;

import android.annotation.TargetApi;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.support.v4.app.NotificationCompat;
import android.util.Log;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class MyFirebaseMessagingService extends FirebaseMessagingService {

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

        Intent intent = new Intent(this, MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent pendingIntent = PendingIntent.getActivity(this,0 /* request code */, intent,PendingIntent.FLAG_UPDATE_CURRENT);

        long[] pattern = {500,500,500,500,500};

        Uri defaultSoundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);

        NotificationCompat.Builder notificationBuilder = (NotificationCompat.Builder) new NotificationCompat.Builder(this)
                .setSmallIcon(R.drawable.icon_status_bar)
                .setContentTitle(title)
                .setContentText(message)
                .setAutoCancel(true)
                .setVibrate(pattern)
                .setLights(Color.BLUE,1,1)
                .setSound(defaultSoundUri)
                .setContentIntent(pendingIntent);

        Log.d("MeuLog", "Mensagem recebida: " + message);

        NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) createChannel(notificationManager);
        notificationManager.notify(0 /* ID of notification */, notificationBuilder.build());

        ////On click of notification it redirect to this Activity
        //Intent intent = new Intent(this, MainActivity.class);
        //intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
        //PendingIntent pendingIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_ONE_SHOT);
//
        //Uri soundUri= RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION);
        //NotificationCompat.Builder notificationBuilder = new NotificationCompat.Builder(this)
        //        .setSmallIcon(R.mipmap.ic_launcher_round)
        //        .setContentTitle(title)
        //        .setContentText(message)
        //        .setAutoCancel(true)
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
    }

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
}
