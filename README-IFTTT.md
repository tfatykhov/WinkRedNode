IFTTT Integration
---------------------------------------------------

Add IFTTT_TOKEN="iftt maker secret key"
to     functionGlobalContext section
in bluemix-settings.json

check for details [README-Bluemix.md](README-Bluemix.md)

---------------------------------------------------
to initiate node-red callbacks to ifttt create a "do" button or any other trigger

for "THAT" select maker channel and use following settings


url - http(s)://your node-red host/red/ifttt

method - post

content type - application/json

Body
{"ifttt":"On","iftttkey":"your ifttt Maker key"}

"ifttt":"On" - will turn callbacks to ifttt on
"ifttt":"Off" - turn them off

------------------------------------------------------------

  wink event will send 3 parameters as permitted in IFTTT
  
  * value1 - device name
  * value2 - device state (on/off for lights and powerstrip outlets, locked/unlocked for locks, motion/no motion, leaking/no leak, opened/closed for trippers and garage doors, propane level value for gas tank sensor)
  * value3 - currently used for dimmable lights. will provide dim level

------------------------------------------------------------

To process wink node-red in IFTTT:

Action - 
For "THIS" select the Maker channel
Next, select "Receive a web request"
For "Event Name" type "WinkEvent"
Click "Create Trigger"

For "THAT" for example - select the Android Wear channel
Click "Send a Notification" as the Action
For the Notification text - Wink Event: {{value1}} {{value2}} {{value3}}
For the image URL, use Wink image --
[http://www.winkapp.com/assets/mediakit/wink-logo-icon-knockout-50235153b274cdf35ef39fb780448596.png](http://www.winkapp.com/assets/mediakit/wink-logo-icon-knockout-50235153b274cdf35ef39fb780448596.png)


--------------------------------------------------------------
Send WINK device CMD via IFTTT (new)
-------------------------------------

Maker channel send web request parameters (used in THAT):

url 
(your node-red host)/red/ifttt (for example samplewinkapp.mybluemix.net/red/ifttt)

method: POST

content-type: application/json

example of Maker channel body
  * {"winkName":"Second floor","type":"group","cmd":"on","level":50 , "iftttkey" : "ifttt maker channel secret key"}
  * {"winkName":"Bedroom floor lamp","type":"light","cmd":"on","level":50 , "iftttkey" : "ifttt maker channel secret key"}
  * {"winkName":"Bedroom floor lamp","type":"light","cmd":"off" , "iftttkey" : "ifttt maker channel secret key"}
  * {"winkName":"Front door","type":"lock","cmd":"unlock" , "iftttkey" : "ifttt maker channel secret key"}
  * {"winkName":"Evening mode","type":"shortcut", "iftttkey" : "ifttt maker channel secret key"}



format:
winkName - name of wink device/group/shortcut as defined in the wink app

type: lock/light/group/shortcut

cmd: on/off, lock/unlock
level - dim level 0-100 required for light dimmers and groups if not present will be auto set to 100 for on and 0 for off commands.


Since Blue Iris system can also do web service calls here is how to make it call node-red for cameras:

* In Blue Iris, open a camera's properties and go to the "Alerts" tab.
* Check "Request from a web service"
* Click "Configure" next to the "Request from a web service" line
* In the "When Triggered" section, select "https://" or "http://" based on your node-red setup and enter yourappname.mybluemix.net/red/ifttt
* Replace "yourappname" above with the name of your node-red app.
* pass command details by  populating "POST text"  same way as "maker channel body" example above.
* Click OK all the way out.
