


async function handleRequest(request) {
  const { searchParams } = new URL(request.url)
  let app_id = searchParams.get('app_id')
  const html = `<!DOCTYPE html>
  <html>
  <head>
  <title>Facebook Login JavaScript Example</title>
  <meta charset="UTF-8">
  </head>
  <body>
  <script>

    function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
      console.log('statusChangeCallback');
      console.log(response);                   // The current login status of the person.
      var access_token = response["authResponse"]["accessToken"];
      if (response.status === 'connected') {   // Logged into your webpage and Facebook.
        testAPI(access_token);  
      } else {                                 // Not logged into your webpage or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this webpage.';
      }
    }


    function checkLoginState() {               // Called when a person is finished with the Login Button.
      FB.getLoginStatus(function(response) {   // See the onlogin handler
        statusChangeCallback(response);
      });
    }


    window.fbAsyncInit = function() {
      FB.init({
        appId      : ${app_id},
        cookie     : true,                     // Enable cookies to allow the server to access the session.
        xfbml      : true,                     // Parse social plugins on this webpage.
        version    : 'v13.0'           // Use this Graph API version for this call.
      });


      FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
      });
    };
  
    function testAPI(access_token) {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
      console.log('Welcome!  Fetching your information.... app id >> ${app_id} ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        console.log(access_token);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
      document.getElementById('token').innerHTML = access_token;
    })
      
    }

  </script>


  <!-- The JS SDK Login Button -->

  <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
  </fb:login-button>

  <div id="status">
  </div>
  <div id="token">
  </div>

  <!-- Load the JS SDK asynchronously -->
  <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
  </body>
  </html>`;
  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});
