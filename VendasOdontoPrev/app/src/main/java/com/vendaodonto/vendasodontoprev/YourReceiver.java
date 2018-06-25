package com.vendaodonto.vendasodontoprev;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by Treinamento6 on 11/06/2018.
 */

public class YourReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        BroadcastReceiver br = new BroadcastReceiver() {

            @Override
            public void onReceive(Context context, Intent intent) {
                // TODO Auto-generated method stub
                Log.i("Enter", "Enters here");
                Toast.makeText(context, "App Installed!!!!.", Toast.LENGTH_LONG).show();
            }
        };

        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Intent.ACTION_PACKAGE_ADDED);
        intentFilter.addAction(Intent.ACTION_PACKAGE_INSTALL);
        intentFilter.addDataScheme("package");
        context.registerReceiver(br, intentFilter);
    }
}
