IFTTT Integration
---------------------------------------------------

Add IFTTT_TOKEN="iftt maker secret key"
to     functionGlobalContext section
in bluemix-settings.json

check for details [README-Bluemix.md](README-Bluemix.md)

---------------------------------------------------
to initiate node-red callbacks to ifttt create a "do" button or any other trigger

for "THIS" select maker channel and use following settings


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
