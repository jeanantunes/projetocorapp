package utils;

import android.content.Context;

import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;


/**
 * Created by freejack on 06/01/2018.
 */

public class CustomWebView extends WebView {

    public CustomWebView(Context context) {
        super(context);
        initView(context);
    }

    public CustomWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
        initView(context);

    }

    private void initView(Context context){
        // i am not sure with these inflater lines
        LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        // you should not use a new instance of MyWebView here
        // MyWebView view = (MyWebView) inflater.inflate(R.layout.custom_webview, this);
        this.getSettings().setJavaScriptEnabled(true) ;
        this.getSettings().setDomStorageEnabled(true); //para bootstrap
//        this.getSettings().setDisplayZoomControls(false);
//        this.getSettings().setSupportZoom(false);
        this.getSettings().setLoadWithOverviewMode(false);
        this.getSettings().setUseWideViewPort(false);
        this.getSettings().setAllowUniversalAccessFromFileURLs(true);

        this.setOnTouchListener(new OnTouchListener() {

          @Override
          public boolean onTouch(View v, MotionEvent event) {
              switch (event.getAction()) {
                  case MotionEvent.ACTION_DOWN:
                  case MotionEvent.ACTION_UP:
                      if (!v.hasFocus()) {
                          v.requestFocus();
                      }
                      break;
              }
              return false;
          }
      });




    }
}
