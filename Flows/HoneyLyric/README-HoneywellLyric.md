
# Honeywell LyricAPI Wink Node Red
Access hoenywell lyric API with node red
# Integrating Wink Node Red and Honey Lyric API
This will detail step by step how to gain access to the Honeywell Lyric API, create a Lyric App to access connect devices and integrate into Node Red
## 1)Wink Node Red
#####Required steps (WNR)
*  Create new tab  - give it a meaningful name (Honeywell Lyric Integration)
*  Import from clipboard - [HoneyLyricFlow.json](HoneyLyricFlow.json)
*  Deploy flow
*  Import updated [winkCore.json](../Bluemix/winkCore.json)
*  Import updated [winkIntegration.json](../Bluemix/winkIntegration.json)
*  Import updated [tabletUI.json](../Bluemix/tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

## 2)Honeywell Developer Site
Here you will create an App that will allow access to your Honeywell Lyric devices through there API.

### 2.1)Create account
[Honeywell Developer](https://developer.honeywell.com/):
<img src='images/signup.jpg'/>

### 2.2)Create App
<img src='images/createApp.jpg'/>

### 2.3)Name App
<img src='images/appName.jpg'/>

### 2.4)App created get Keys
<img src='images/appCreated.jpg'/>

Copy keys to Node Red
<img src='images/nodeRedKeys1.jpg'/>

### 2.5)Authorization API
<img src='images/authAPIs.jpg'/>

### 2.6)Request access code
<img src='images/makeRequest.jpg'/>

### 2.7)Responce from access code request
<img src='images/response.jpg'/>

goto responce Link
<img src='images/goto.jpg'/>

### 2.8)Log On and Allow access
<img src='images/logOn.jpg'/>
<img src='images/allow.jpg'/>

### 2.9)Select devices and Connect
<img src='images/connect.jpg'/>

