
function statusChangeCallback(response) {
console.log('statusChangeCallback');
console.log(response);
if (response.status === 'connected') {
// Logged into your app and Facebook.
testAPI();
} else if (response.status === 'not_authorized') {
//document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';

} else {
//document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';

}
}
function checkLoginState() {
FB.getLoginStatus(function(response) {
statusChangeCallback(response);
});
}

window.fbAsyncInit = function() {
FB.init({
appId      : 'ENTER HERE APPID FROM FACEBOOK DEV SITE',
xfbml      : true,
version    : 'v2.4',
oauth: true,
});

};

(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) return;
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/en_US/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function CHECK_FB_L_STATUS (){
setTimeout(function(){
if (typeof FB !== 'undefined') {
FB.getLoginStatus(function(response) {
statusChangeCallback(response);
});
}
else {
CHECK_FB_L_STATUS()   
}
},1000)
}
CHECK_FB_L_STATUS()
function testAPI() {
console.log('Welcome!  Fetching your information.... ');
FB.api('/me', function(response) {
console.log('Successful login for: ' + response.name);



//document.getElementById('status').innerHTML ='Thanks for logging in, ' + response.name + '!';
});
}


// HTML BTN LOGIN
//<fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
//</fb:login-button>