package com.vendaodonto.vendasodontoprev;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.os.Parcelable;
import android.util.Log;

import java.io.Serializable;

import utils.Notificacao;

public class ActionReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

        Bundle bundleExtras = intent.getExtras();

        if (bundleExtras != null){

            Notificacao notificacao = (Notificacao) bundleExtras.getSerializable("notificacao");

            if (notificacao != null){

                executarOnCreateMainActivity(notificacao, context);

            }

        }

        //Intencao usada para fechar notificacao
        Intent intencaoFecharNotificacao = new Intent(Intent.ACTION_CLOSE_SYSTEM_DIALOGS);
        context.sendBroadcast(intencaoFecharNotificacao);
    }

    public void executarOnCreateMainActivity(Notificacao notificacao, Context context){

        Log.d("MeuLog", "Executou executarOnCreateMainActivity()");
        Intent abrirMainActivity = new Intent(context, MainActivity.class);
        abrirMainActivity.putExtra("notificacao", (Serializable) notificacao);

        context.startActivity(abrirMainActivity);

    }

}