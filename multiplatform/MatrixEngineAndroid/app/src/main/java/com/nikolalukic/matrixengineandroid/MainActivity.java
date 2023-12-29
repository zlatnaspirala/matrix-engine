package com.nikolalukic.matrixengineandroid;

import android.os.Bundle;
import com.google.android.material.snackbar.Snackbar;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import androidx.core.view.WindowCompat;
//import androidx.navigation.NavController;
//import androidx.navigation.Navigation;
//import androidx.navigation.ui.AppBarConfiguration;
//import androidx.navigation.ui.NavigationUI;
import com.nikolalukic.matrixengineandroid.databinding.ActivityMainBinding;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;
import android.content.Intent;

public class MainActivity extends AppCompatActivity {
    private String APP_STATUS = "DEV";
    private String WEBGL_VER = "1";
    private String GUI_DEV_ARG = "null";
//    private AppBarConfiguration appBarConfiguration;
    private ActivityMainBinding binding;
    WebView web1;
    public class MyWebChromeClient extends WebChromeClient {
        // Handle javascript alerts:
        // @SuppressLint("WrongConstant")
        @Override
        public boolean onJsAlert(WebView view, String url, String message, final android.webkit.JsResult result) {
            Log.d("alert", message);
            Toast.makeText(getBaseContext(), message, Toast.LENGTH_SHORT).show();
            result.confirm();
            return true;
        };
        // TEST
        public boolean onJsConsole (WebView view, String url, String message, final android.webkit.JsResult result) {
            Log.d("console", message);
            Toast.makeText(getBaseContext(), message, Toast.LENGTH_SHORT).show();
            result.confirm();
            return true;
        };
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        web1 = (WebView)findViewById(R.id.webBrowserMain);
        web1.setWebChromeClient(new MyWebChromeClient());
        WebSettings webSettings = web1.getSettings();
        webSettings.setJavaScriptEnabled(true);

        Intent intent = getIntent();
        Bundle bundle = intent.getExtras();
        if (bundle != null) {
            GUI_DEV_ARG = bundle.getString("GUI_DEV_ARG");
            web1.loadUrl(GUI_DEV_ARG);
            return;
        }

        if (APP_STATUS == "PROD") {
            if (WEBGL_VER == "1") {
                web1.loadUrl("https://maximumroulette.com/apps/matrix-engine/query-build.html?u=porting2d_text&GLSL=1.1");
            } else {
                web1.loadUrl("https://maximumroulette.com/apps/matrix-engine/query-build.html?u=porting2d_text");
            }
        } else if (APP_STATUS == "DEV") {
            if (WEBGL_VER == "1") {
                web1.loadUrl("https://localhost/public/gui.html");
            } else {
                web1.loadUrl("https://localhost/public/gui.html?GLSL=1.1");
            }
        } else if(APP_STATUS == "TEST-WEBGL2") {
          web1.loadUrl("https://webglreport.com/?v=2");
        }
    }
}