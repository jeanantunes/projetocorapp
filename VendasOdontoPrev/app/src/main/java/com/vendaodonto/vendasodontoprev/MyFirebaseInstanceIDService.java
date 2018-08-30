package com.vendaodonto.vendasodontoprev;

import android.util.Log;
import android.webkit.JavascriptInterface;

import com.crashlytics.android.Crashlytics;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

public class MyFirebaseInstanceIDService extends FirebaseInstanceIdService {

    private static final String TAG = "MeuLog";
    private String token = "";
    /**
     * Called if InstanceID token is updated. This may occur if the security of
     * the previous token had been compromised. Note that this is called when the InstanceID token
     * is initially generated so this is where you would retrieve the token.
     */
    // [START refresh_token]
    @Override
    public void onTokenRefresh() {
        // Get updated InstanceID token.

        String refreshedToken = FirebaseInstanceId.getInstance().getToken();
        Log.d(TAG, "Refreshed token: " + refreshedToken);
        token = refreshedToken;
        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // Instance ID token to your app server.
        sendRegistrationToServer(refreshedToken);
    }

    @JavascriptInterface
    public String getTokenDevice(){

        onTokenRefresh();
        Log.d("MeuLog", "Gerou Token");

        return token;

    }

    @JavascriptInterface
    public String getModel(){

        Log.d("MeuLog", "Modelo do celular: " + android.os.Build.MODEL);
        return android.os.Build.MODEL;

    }


    private void sendRegistrationToServer(String token) {
        // TODO: Implement this method to send token to your app server.
    }

}
