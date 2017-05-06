# Poprocks

Helps out with OAuth popup flow.

## Installation
`npm i -S poprocks`

## Usage


### Example

```
 import poprocks, { configurePoprocks } from 'poprocks';
 
 configurePoprocks({
  authBase: 'http://localhost:8888',
  authNamespace: 'auth',
 });
 
 ...
 poprocks('google')
  .then((data) => {
    // Something with the data
  })
  .catch((error) => {
    // Something with the error
  });
 ...
```

This will open a pop up named 'Authenticating with google' with the 
location of http://localhost:8888/auth/google.

### OAuth Callback

The response you send from your OAuth Callback will need to include a piece of script
that will send a `postMessage` to the original window.

```
  <script type="text/javascript">
      window.opener.postMessage(data, clientUrl);
  </script>
```


### Options

You can specify some options for `poprocks` in addition to provider. 

```
poprocks(provider, popupUrl, popupName, popupSettings);
```


