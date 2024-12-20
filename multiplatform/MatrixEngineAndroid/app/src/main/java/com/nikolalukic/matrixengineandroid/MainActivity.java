package com.nikolalukic.matrixengineandroid;

import static android.provider.ContactsContract.CommonDataKinds.Website.URL;
import android.Manifest;
import android.annotation.TargetApi;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.nikolalukic.matrixengineandroid.databinding.ActivityMainBinding;

import android.view.View;
import android.webkit.PermissionRequest;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.Toast;
import android.content.Intent;

public class MainActivity extends AppCompatActivity {
    private String APP_STATUS = "DEV";
    private final String WEBGL_VER = "1";
    private String GUI_DEV_ARG = "null";
    private static final int MY_CAMERA_REQUEST_CODE = 50;
    private ActivityMainBinding binding;
    WebView web1;
    Button loadBtn;
    public abstract class MyWebChromeClient extends WebChromeClient {
        @TargetApi(Build.VERSION_CODES.LOLLIPOP)
        @Override
        public void onPermissionRequest(final PermissionRequest request) {
            request.grant(request.getResources());
        }

        @Override
        public boolean onJsAlert(WebView view, String url, String message, final android.webkit.JsResult result) {
            Log.d("alert", message);
            Toast.makeText(getBaseContext(), message, Toast.LENGTH_SHORT).show();
            result.confirm();
            return true;
        };

        public boolean onJsConsole (WebView view, String url, String message, final android.webkit.JsResult result) {
            Log.d("console", message);
            Toast.makeText(getBaseContext(), message, Toast.LENGTH_SHORT).show();
            result.confirm();
            return true;
        };

        public void onPageStarted(WebView view, String url, Bitmap favicon) {

        }

        protected abstract boolean shouldOverrideUrlLoading(WebView view, String url);

        @TargetApi(Build.VERSION_CODES.N)
        public abstract boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        switch (requestCode) {
            case 1: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    // permission was granted
                } else {
                    // permission denied
                    Toast.makeText(MainActivity.this, "Permission denied nidza", Toast.LENGTH_SHORT).show();
                }
                return;
            }
            // other 'case' lines to check for other
            // permissions this app might request
        }
    }

    // A new webclient that ignore ssl errors
    public class IgnoreSSLErrortWebViewClient extends WebViewClient {
        // You can all the class anything
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            if (Uri.parse(url).getHost().equals(URL)) {
                // This is your web site, so do not override; let the WebView to load the page
                return false;
            }
            // Otherwise, the link is not for a page on my site, so launch another Activity that handles URLs
            Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
            startActivity(intent);
            return true;
        }
    @Override
    public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
            handler.proceed();
       }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());
        loadBtn = (Button)findViewById(R.id.loadBtn);
        web1 = (WebView)findViewById(R.id.webBrowserMain);
        web1.setWebChromeClient(new MyWebChromeClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
            }
            @SuppressWarnings("deprecation")
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                return false;
            }
            @TargetApi(Build.VERSION_CODES.N)
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                view.loadUrl(request.getUrl().toString());
                return true;
            }
        });
        // web1.clearSslPreferences();
        // web1.setWebViewClient(new IgnoreSSLErrortWebViewClient());
        WebSettings webSettings = web1.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowContentAccess(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowUniversalAccessFromFileURLs(true);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // webSettings.setSafeBrowsingEnabled(true);
        }
        webSettings.setMediaPlaybackRequiresUserGesture(false);
        web1.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
        web1.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);
        web1.getSettings().setSupportMultipleWindows(true);

        NotificationCompat.Builder builder = new NotificationCompat.Builder(this, "MATRIX")
                .setSmallIcon(R.drawable.ic_launcher_background)
                .setContentTitle("Cao ")
                .setContentText("cao cao ")
                .setPriority(NotificationCompat.PRIORITY_DEFAULT);;

        // Notification notification = builder;
        // Service.startForeground(builder, FOREGROUND_SERVICE_TYPE_LOCATION | FOREGROUND_SERVICE_TYPE_CAMERA | FOREGROUND_SERVICE_TYPE_MICROPHONE);

        Intent intent = getIntent();
        Bundle bundle = intent.getExtras();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
        {
            requestPermissions(new String[]{
                    Manifest.permission.READ_MEDIA_IMAGES,
                    Manifest.permission.READ_MEDIA_AUDIO,
                    Manifest.permission.READ_MEDIA_VIDEO,
                    Manifest.permission.ACCESS_MEDIA_LOCATION,
                    Manifest.permission.CAMERA,
                    Manifest.permission.RECORD_AUDIO,
                    Manifest.permission.MODIFY_AUDIO_SETTINGS
            }, MY_CAMERA_REQUEST_CODE);
        }

        if (bundle != null) {
            GUI_DEV_ARG = bundle.getString("GUI_DEV_ARG");
            web1.loadUrl(GUI_DEV_ARG);
            Log.e("app", "onCreate: " + GUI_DEV_ARG);
            return;
        }

        loadBtn.setOnClickListener( new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (APP_STATUS == "PROD") {
                    if (WEBGL_VER == "1") {
                        web1.loadUrl("https://maximumroulette.com/apps/matrix-engine/gui.html?GLSL=1.1");
                    } else {
                        // web1.loadUrl("https://maximumroulette.com/apps/matrix-engine/gui.html?GLSL=1.3");
                        web1.loadUrl("https://maximumroulette.com/apps/matrix-engine/examples-build.html");
                    }
                } else if (APP_STATUS == "DEV") {
                    if (WEBGL_VER == "1") {
                        web1.loadUrl("https://maximumroulette.com/apps/matrix-engine/examples-build.html?GLSL=1.1");
                        // web1.loadUrl("http://192.168.0.30/public/examples-build.html?GLSL=1.1");
                        Log.e("app", "onCreate: http://192.168.0.30/ YEAP");
                    } else {
                        web1.loadUrl("https://maximumroulette.com/apps/matrix-engine/examples-build.html");
                        // web1.loadUrl("https://192.168.0.30/public/gui.html?GLSL=1.1");
                    }
                } else if(APP_STATUS == "TEST-WEBGL2") {
                    web1.loadUrl("https://webglreport.com/?v=2");
                }
            }
        });
    }
}