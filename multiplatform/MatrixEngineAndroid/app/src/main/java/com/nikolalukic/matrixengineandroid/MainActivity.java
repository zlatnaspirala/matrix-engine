package com.nikolalukic.matrixengineandroid;

import android.os.Bundle;
import com.google.android.material.snackbar.Snackbar;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import androidx.core.view.WindowCompat;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import com.nikolalukic.matrixengineandroid.databinding.ActivityMainBinding;
import android.view.Menu;
import android.view.MenuItem;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    private AppBarConfiguration appBarConfiguration;
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

        // web1.loadUrl("https://maximumroulette.com/apps/matrix-engine/query-build.html?u=porting2d_text");
        web1.loadUrl("https://webglreport.com/?v=2");
        //web1.loadUrl("https://get.webgl.org/webgl2/");


    }
}