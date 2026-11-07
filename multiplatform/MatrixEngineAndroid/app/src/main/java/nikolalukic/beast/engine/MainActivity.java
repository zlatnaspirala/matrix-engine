package nikolalukic.beast.engine;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.PermissionRequest;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import nikolalukic.beast.engine.databinding.ActivityMainBinding;

public class MainActivity extends AppCompatActivity {
    private static final int MY_CAMERA_REQUEST_CODE = 50;
    private ActivityMainBinding binding;
    private WebView web1;
    private Button loadBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        loadBtn = findViewById(R.id.loadBtn);
        web1 = findViewById(R.id.webBrowserMain);

        // Configure WebView Settings for WebGL / WebGPU engine
        WebSettings webSettings = web1.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setDatabaseEnabled(true);

        // --- SECURITY FIX FOR CROSS-APP SCRIPTING (XAS POLICY) ---
        // Apps loading remote URLs should not have local file/content access enabled.
        // webSettings.setAllowContentAccess(true); // [OLD]
        webSettings.setAllowContentAccess(false);   // [SECURE FIX]

        // webSettings.setAllowFileAccess(true);    // [OLD]
        webSettings.setAllowFileAccess(false);      // [SECURE FIX]

        // Extra hardening for file scheme origins (blocks file-based cross-scripting)
        webSettings.setAllowFileAccessFromFileURLs(false);
        webSettings.setAllowUniversalAccessFromFileURLs(false);
        // ---------------------------------------------------------

        webSettings.setMediaPlaybackRequiresUserGesture(false);
        webSettings.setJavaScriptCanOpenWindowsAutomatically(true);
        webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);

        // Enable Chrome Debugging during DEV builds (Kept for your remote debugger)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        // Camera permissions handler inside WebView preserved completely
        web1.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onPermissionRequest(final PermissionRequest request) {
                runOnUiThread(() -> request.grant(request.getResources()));
            }

            @Override
            public boolean onJsAlert(WebView view, String url, String message, final android.webkit.JsResult result) {
                Toast.makeText(MainActivity.this, message, Toast.LENGTH_SHORT).show();
                result.confirm();
                return true;
            }
        });

        web1.setWebViewClient(new android.webkit.WebViewClient() {
            @SuppressWarnings("deprecation")
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                // return false; // [OLD]
                // Securely check if loading your domain or standard safe schemes
                if (url != null && (url.startsWith("http://") || url.startsWith("https://"))) {
                    return false; // Load within WebView
                }
                return true; // Block other unexpected custom schemes
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                // return false; // [OLD]
                String url = request.getUrl().toString();
                if (url.startsWith("http://") || url.startsWith("https://")) {
                    return false; // Load within WebView
                }
                return true;
            }
        });

        // Check runtime permissions (Camera / Audio for your engine)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            requestPermissions(new String[]{
                    Manifest.permission.CAMERA,
                    Manifest.permission.RECORD_AUDIO,
                    Manifest.permission.MODIFY_AUDIO_SETTINGS
            }, MY_CAMERA_REQUEST_CODE);
        }

//        Intent intent = getIntent();
//        Bundle bundle = intent.getExtras();
//        if (bundle != null && bundle.containsKey("GUI_DEV_ARG")) {
//            String guiDevArg = bundle.getString("GUI_DEV_ARG");
//            if (guiDevArg != null) {
//                web1.loadUrl(guiDevArg);
//                Log.d("MatrixEngine", "Loading bundle URL: " + guiDevArg);
//            }
//        }

        loadBtn.setOnClickListener(v -> {
            String targetUrl = "https://maximumroulette.com/apps/webgpu/examples.html?demo=1";
            web1.loadUrl(targetUrl);
            Log.d("MatrixEngine", "Loading URL: " + targetUrl);
        });
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == MY_CAMERA_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Log.d("MatrixEngine", "Permissions granted");
            } else {
                Toast.makeText(this, "Camera/Audio permissions missing", Toast.LENGTH_SHORT).show();
            }
        }
    }
}