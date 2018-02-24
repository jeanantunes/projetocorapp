package utils;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Created by anderson.xavier on 02/06/2015.
 */

public class EasySharedPreferences {


    private Context myContext;
    private int visibilityContextID;
    private String nameSharedPreferences;
    private String codMsgSharedPreferences;

    private String msgString;

    //----------------------------
    //Get; Set;
    //----------------------------
    public void setVisibilityContextID(int contextID) {
        this.visibilityContextID = contextID;
    }

    public void setNameSharedPreferences(String nameSharedPreferences) {
        this.nameSharedPreferences = nameSharedPreferences;
    }

    public void setMsgString(String msgString) {
        this.msgString = msgString;
    }

    public void setCodMsgSharedPreferences(String codMsgSharedPreferences) {
        this.codMsgSharedPreferences = codMsgSharedPreferences;
    }
    //----------------------------

    public EasySharedPreferences(Context myContext) {
        this.myContext = myContext;
    }

    public EasySharedPreferences(Context myContext, int contextID, String nameSharedPreferences, String codMsgSharedPreferences) {
        this.myContext = myContext;
        this.setVisibilityContextID(contextID);
        this.setNameSharedPreferences(nameSharedPreferences);
        this.codMsgSharedPreferences = codMsgSharedPreferences;
    }

    public void Armazena() {
        SharedPreferences savedServidores = myContext.getSharedPreferences(nameSharedPreferences, visibilityContextID);
        SharedPreferences.Editor editor = savedServidores.edit();
        editor.putString(codMsgSharedPreferences, this.msgString);
        editor.commit();
    }


    public void Armazena(String msgString) {
        SharedPreferences savedServidores = myContext.getSharedPreferences(nameSharedPreferences, visibilityContextID);
        SharedPreferences.Editor editor = savedServidores.edit();
        editor.putString(codMsgSharedPreferences, msgString );
        editor.commit();
    }

    public String Restaura() {
        SharedPreferences savedServidoresDisponiveis = myContext.getSharedPreferences(nameSharedPreferences, visibilityContextID);
        return savedServidoresDisponiveis.getString(codMsgSharedPreferences, "");
    }
}
