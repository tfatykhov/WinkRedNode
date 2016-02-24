== UPDATE ==
02/24/2016
-----------------
<b>This update only required if you have WInk API key/Secret. If not, this update today not required</b><br>
Ability to provide your own Wink API key/secret pair. Since we have temp throttling by wink (several days to make sure everything works OK) I added ability to populate your own WINK key which you can request through wink support site<br>
[Wink Support](https://wink.zendesk.com/hc/en-us/requests/new)<br>

Navigate to tab ui/configuration page and enter Client ID and Secret provided by Wink.<br>
<img src="images/controls_tab_w.png"><br>

Click Submit and then Refresh Wink Data. After this your node-red will use your own Key.
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


02/23/2016 
-----------------
After an issue yesterday I had to request new api keys for node-red project as well as make some additional filtering to prevent wink server overflowing. Latest changes have been applied at 5:05 P.M on 02/23/2016:

<b>Required changes or app will not function if you updated flows before 5:05 P.M on 02/23/2016 you need to re-deploy winkCore flow </b><br>
Bluemix git console:<br>
*  copy contents of [package.json](package.json) and update same file in your configuration with it contents.
*  add following line to the bluemix-settings.js inside functionGlobalContext section<br>
	*   ,wnr : require("winknodered"). refer to [sample bluemix-settings.js](bluemix-settings.js)
*  re-deploy application in git<br>
<img src="images/deploy.png">

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

02/22/2016
-----------------
We had an issue earlier today when because of some fault device one of node-red application overflooded wink servers with data so I added a throttling mechanism that will prevent excessive messages to wink servers to 1 per second otherwise they can temorarely suspend access.<br>
<b>please perform ASAP</b>
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>



02/21/2016
----------------
Bug fixes (robots formatting issue, etc.) <b>Please import first 3 flows even if you do not need blue Iris</b><br>
Added support for [Blue Iris](http://blueirissoftware.com)<br>
Please use instructions for Blue Iris on how to set up access from outside your home network.
Once you set it up you need to know following:
* HTTPS will not be supported unless you get proper signed certificate. Blue Mix does not like self signed ones
* you need to turn off "secure only" option since it is not that secure anyway. Blue mix will not expose uid/pwd on the UI and will get image redirected through it servers and will deliver to user endpoint via HTTPS. 
<img src="images/blue_iris3.png"><br>

I recommend to get some dynamic dns name for this or you will have to change host name if your provide ip address will change.
Once you configure Blue Iris, you need to:


Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  Create new tab and import new [blueIris.json](blueIris.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

Once you deployed and app reinitialized navigate to config tab of tablet ui and enter following info:
<img src="images/blue_iris1.png">
* host name should be in a form of http://you blue iris ip or host name:port (no backslash at the end)
* click on "refresh wink data" Once it is done - you should see your cameras in "cameras" tab.

You can also configure motion alerts to be routed to node-red and then being used in robots/notification/etc.
In Blue Iris software - navigate to camera settings/alerts
<img src="images/blue_iris4.png">
check "request from web service" and click configure.<br>
On next screen you need to put following things:
<img src="images/blue_iris2.png">
* url - should be your bluemixapp.winknodered.net/red/blueiris/alerts/Your camera Short Name from BlueIris
* post text: {"motion":"true"}
* Make same entries for "request again when trigger is reset" but in this case populate {"motion":"false"} in the post text.
	* I did not test that option so please let me know if it works or not.
You should be all set. 

02/20/2016
----------------
I noticed some updates in wink API which did not happen before.
They are minor but mostly ui summary and controls page are affected in terms of status is not set properly all the time for lights and binary switches.
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


02/19/2016
----------------
Added manual snaphsot button for each camera:

<img src="images/snapshot_button.png">

Added new global object <b>sunTimes</b> to use in schedules/robots/etc. it has following values:
* sunrise	- sunrise (top edge of the sun appears on the horizon)
* sunriseEnd	- sunrise ends (bottom edge of the sun touches the horizon)
* goldenHourEnd	- morning golden hour (soft light, best time for photography) ends
* solarNoon	- solar noon (sun is in the highest position)
* goldenHour	- evening golden hour starts
* sunsetStart	- sunset starts (bottom edge of the sun touches the horizon)
* sunset	- sunset (sun disappears below the horizon, evening civil twilight starts)
* dusk		- dusk (evening nautical twilight starts)
* nauticalDusk	- nautical dusk (evening astronomical twilight starts)
* night		- night starts (dark enough for astronomical observations)
* nadir		- nadir (darkest moment of the night, sun is in the lowest position)
* nightEnd	- night ends (morning astronomical twilight starts)
* nauticalDawn	- nautical dawn (morning nautical twilight starts)
* dawn		- dawn (morning nautical twilight ends, morning civil twilight starts)
* sunset_m_1	- sunset minus one hour<br>
Each attribute has 2 values: hour and minute

so if you want to get values for dawn you need to address it as:<br>
* context.global.sunTimes.dawn.hour
* context.global.sunTimes.dawn.minute

Required changes:<br>
Bluemix git console:<br>

*  copy contents of [package.json](package.json) and update same file in your configuration with it contents.
*  add following line to the bluemix-settings.js inside functionGlobalContext section<br>
	*  ,SunCalc : require("suncalc"). refer to [sample bluemix-settings.js](bluemix-settings.js)
*  restart application 

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


02/15/2016 part.2
----------------
Added garage doors to controls tab under Locks and Doors section<br>
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


02/15/2016
----------------
Added separate "Robots" tab where you can check status and enable/disable them.

<img src="images/robots_tab.png">

Garage doors should work now:

<img src="images/garage_door.png">

New Command types for IFTTT and internal use<br>
Check  [HOWTO - IFTTT](../../README-IFTTT.md#send-wink-device-cmd-via-ifttt-new) for instructions <br>

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


02/14/2016 v2 11pm Eastern
----------------
Updated the "Standardize for robots" node on winkCore to allow for triggering Wink Node Red robots when a Wink app robot fires

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  perform "FULL" deployment<br>
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)<br>
  

02/14/2016
----------------
New icons for door/windows/cabinets and garage (not tested since I do not have this device)


<img src="images/new_icons.png">


Bluemix git console:<br>

*  restart application 

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  perform "FULL" deployment<br>
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)<br>

02/13/2016
-----------------
Ring door bell notifications shown in the log and in dashboard<br>

<img src="images/door_bell1.png">

<img src="images/door_bell2.png">

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  perform "FULL" deployment<br>
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)<br>


02/12/2016
-----------------
New light effects for IFTTT/Tasker/etc  [HOWTO - IFTTT](../../README-IFTTT.md#fadeinfadeoutpulse-effects-for-dimmable-lights-and-groups)<br>


new custom page tab - navigate to config and add Label and url:<br>
<img src="images/custom_tab.png">

refresh browser window<br>

<img src="images/custom_tab1.png">

Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  perform "Modified Flows" deployment<br>


02/09/2016
----------------
Added forecast(just click on current conditions weather icon)<br>
<img src="images/forecast.png">
Added ability to call PRESENCE / NO PRESENCE shortcuts during day (before sunset) and<br>
PRESENCE NIGHT / NO PRESENCE NIGHT after sunset and before sunrize<br>
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  perform "FULL" deployment<br>

02/08/2016
----------------
Added ability to set/change global variable via ifttt<br>
Added home occupancy icon based on Node-Red Presence<br>
<img src="images/new_updates.png">

Bluemix git console:<br>

*  restart application 

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  perform "FULL" deployment<br>

Check  [HOWTO - IFTTT](../../README-IFTTT.md) for instructions on how to set variable in node-red via IFTTT (last section of the document). <br>

Check [HOWTO - Presence](../../README-PresenceIntegration.md) for examples on how to set up Presence in Wink Node-Red<br>
you can also use IFTTT wifi connected/disconnected in case of Android or IFTTT location instead of Life365 as THIS in recipe.<br> 
You can also use Tasker or similar software that can make an HTTPS POST call.

02/07/2016
----------------
Imrpoved wink data refresh functionality:<br>
now, when you click on the "refresh" button, ui will wait for data refresh to happen and then autorefresh itself<br>
<img src="images/auto_refresh.png">

Fixes and updates:<br>
Removed non-user created or empty robots from dashboards.<br>
Removed empty groups<br>
Fixed multi-sensors on "old" freeboards<br>
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  import updated [Freeboards](winkFreeboards.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  perform "FULL" deployment<br>

02/06/2016, v2
-----------------
Added ability to refresh wink Devices via UI
<img src="images/updated_config2.png">

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  perform "FULL" deployment<br>

02/06/2016
-----------------
Added ability to save custom freeboards to your local computer so you can re-load them again:<br>
<img src="images/safe_custom_freeboard.png">

Updated 'what changed' flow on winkCore to show occupancy and temp in *F<br>
Removed 'second ws instance' trying to avoid ws duplicate errors<br>
wink api should show 'retrieving' if it is not there yet.<br>
Issue with deployment on bluemix<br>
Added ability to show light status in the logs via config
<img src="images/new_cfg.png">

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  perform "FULL" deployment<br>

Bluemix git console:<br>

*  copy contents of [package.json](package.json) and update same file in your configuration with it contents.
*  restart application 



02/05/2016
-----------------
fixed - ifttt integration bug for shortcuts<br>
removed canary from camera page<br>
added canary status updates in event log<br>
trying to solve dup websockets<br>
wink api index added to summary page<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  Import updated [winkIntegration.json](winkIntegration.json)

***NOTE: In this case, once you have imported all 3 tabs, make sure you do a FULL import***  


02/02/2016
-----------------
Tablet UI summary updates: refuel icon, more dynamic changes(try to trigger tripper :) ), bug fixes<br>
<img src="images/ui_updates.png">
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  Import updated [winkIntegration.json](winkIntegration.json)

01/29/2016
-----------------
Moved to node.js version 4.x since it is more stable and have better performance and memory management<br>
* update package.json via git console of bluemix using [package.json](package.json)
* restart node-red app via blue-mix git

01/28/2016
------------------
Readme - how to use node-red and IFTT, how to config blue-iris to post to node-red<br>
[HOWTO - IFTTT](../../README-IFTTT.md)<br>
Added presence details to freeboards:<br>
Added automatic selection of websockets or http(s) get in case websockets are not supported for any reason<br>
*  import updated [tabletUI.json](tabletUI.json)
*  import updated [winkIntegration.json](winkIntegration.json)
*  import updated [Freeboards](winkFreeboards.json)<br><br><br>



01/25/2016
------------------
Readme - how to import/update flows to node-red
[Import/Update Flows](../../README-ImportingUpdating%20Flows.md)


01/23/2016
------------------
Tablet UI config page, added clock format change:<br>
<img src="images/updated_config1.png">
Robots activity are now displayed in the activity log:<br>
<img src="images/time_and_robots.png">
Robots status added to "detais" tab. If you have more than 10, robots will be splitted in the chunks of 10 to proper fill screen space:<br><br>
<img src="images/robot_details.png"><br>
Required changes:<br>
* update package.json via git console of bluemix using [package.json](package.json)
* Import updated [winkCore.json](winkCore.json)
*  import updated [tabletUI.json](tabletUI.json)
*  import updated [winkIntegration.json](winkIntegration.json)
*  restart your app via git dashboard or cf push.<br>
<br>
For local setup, to change time display add following key to settings.js under functionGlobalContext section<br>
,HoursFormat24:true (or false) based on your need.<br>


11/14/2015
------------------
Tablet UI config page, first drop:<br>
<img src="images/cfg_panel.png">
Required changes:<br>
* Import updated [winkCore.json](winkCore.json)
*  import updated [tabletUI.json](tabletUI.json)
*  import updated [winkIntegration.json](winkIntegration.json)
*  restart your app via git dashboard or cf push.<br>
This is for bliue-mix cloud instances only. If you are using local installation you will need to implement your own database connector.

11/14/2015
------------------
Found bug in tabletUI please import updated [tabletUI.json](tabletUI.json)

11/13/2015
------------------
Updated to Node-Red 0.12.X<br>
Node red had new release couple of days back and now it is version 0.12.x. and it introduced some changes to http nodes<br>
in order to make sure that latest version is used please<br> 
* copy contents of [package.json](package.json) and update same file in your configuration with it contents.
* restart wink app via cf push or git dashboard
<br>
<br>
After restart<br>
*  Import updated [winkCore.json](winkCore.json)
*  import updated [tabletUI.json](tabletUI.json)
*  import updated [winkIntegration.json](winkIntegration.json)
*  import updated [Freeboards](winkFreeboards.json)<br><br><br>
Tablet UI summary page - small cosmetic fixes and battery notification if any batteries in your system is below 25%:<br>
<img src="images/updated_ui.png">


11/9/2015
------------------
Tablet UI summary page:<br>
<img src="images/new_summary.png">
New summary page with "dashboard" style :)<br>
Required changes:<br>
* Import updated [winkCore.json](winkCore.json)
*  import updated [tabletUI.json](tabletUI.json)
*  import updated [winkIntegration.json](winkIntegration.json)
*  restart your app via git dashboard or cf push.

10/30/2015
------------------
Tablet UI notifications:<br>
<img src="images/ui_notifications.png">
Currently shows sensor info, battery info and more<br>
3 level of messages:<br>
1.	Alert - will stay until dismissed manually red box<br>
2.	Warning will stay for 60 seconds yellow box<br>
3.	Information will stau for 60 seconds blue box<br><br>
Required changes:<br>
* Import updated [winkCore.json](winkCore.json)
*  import updated [tabletUI.json](tabletUI.json)
*  import updated [winkIntegration.json](winkIntegration.json)
*  restart your app via git dashboard or cf push.


10/25/2015
------------------
Tablet UI updates:<br>
1. Shortcut buttons spinning wheel:
Required changes:
*  import updated [tabletUI.json](tabletUI.json)

10/23/2015
----------------
Tablet UI updates:<br>
1. Locks  added to control tab:
<img src="images/locks_panel.png">
<br>
2. data exchange moved to websockes to reduce network traffic. With this change server pushes updates for control tab vs continious http gets.
<br>
<br>
Required changes:
*  import updated [tabletUI.json](tabletUI.json)
* Import updated [winkCore.json](winkCore.json)
*  restart your app via git dashboard or cf push.


10/18/2015
----------------
Tablet UI updates:

camera history shows in modal window and using carousel widget 
<img src="images/cam_history.png">
<br>
required changes:<br>
*  import updated [tabletUI.json](tabletUI.json)
*  restart your app via git dashboard or cf push.


10/12/2015
----------------
Tablet UI updates:
* new app icon. Please remove existing from home screen and add again.<br>
<img src="images/NewIcon.png">
* new cameras page.<br>
<img src="images/CameraPage.png">
<br>
*  import updated [tabletUI.json](tabletUI.json)
*  import updated [winkIntegration.json](winkIntegration.json)
*  restart your app via git dashboard or cf push.

10/12/2015
----------------
Tablet UI with new controls tab.
<img src="images/controls_tab.png">

* add "crypto" module to bluemix-setting.json. First you need to add following line to the top section of the file: var crp = require("crypto");<br><br>
So your first 3 lines in the file  should look like this:<br>
	<b>var crp = require("crypto");</b><br>
	var path = require("path");<br>
	var when = require("when");<rb>

* You also need to update functionGlobalContext section and add following lines<br>
	,CRYPTO: crp<br>
* do CF push and restart the app.

* Import updated [winkCore.json](winkCore.json)
* Import updated [winkFreeboards.json](winkFreeboards.json) 
* Create new tab in flow editor and import new [tabletUI.json](tabletUI.json)



10/05/2015
-----------------
Updated with LIFX bulb support.<br>

Required changes: <br>
* Import updated [winkCore.json](winkCore.json)
* Import updated [winkIntegration.json](winkIntegration.json)
* Add the following to bluemix-settings.js into functionGlobalContext section:<br>
<code>
,"LIFX_TOKEN":"your LIFX token"
</code>


10/05/2015
-----------------
* Import updated [winkFreeboards.json](winkFreeboards.json) 
Now it has first draft of "controls" page.

10/05/2015
-----------------
New "tablet friendly" dashboard with configurable buttons (can be assigned to activate wink shortcut)<br>

Required changes: <br>
* Import updated  updated [winkCore.json](winkCore.json)
* Import updated [winkFreeboards.json](winkFreeboards.json)
* Import  updated [winkIntegration.json](winkIntegration.json)

Add following  to blumix-settings.js into functionGlobalContext section:<br>
<p>
<code>
,"tab_ui_shortcuts":["wink shortcut name","wink shortcut name","wink shortcut name","wink shortcut name","wink shortcut name","wink shortcut name"]<br>
</code>
</p>
replace <i>wink shortcut name</i> with actual shorcut names from wink app with same case. You can put 6 or less shorcuts.
If you put less, then unused buttons will have "shorctut #" label without any action for now.<br>
New tablet dashboard is accessible via:<br>
<code> your_app_name.mybluemix.net/freeboard/ui</code>

9/23/2015
-----------------
1. Dlink MJPEG cameras support (no motion detection reporting to dashboard)<br>
Following models should work <i>'DCS-930L','DCS-930' , 'DCS-931L','DCS-931', 'DCS-932L','DCS-932', 'DCS-933L','DCS-933', 'DCS-5020L','DCS-934L'</i><br>
Please use camera documentation for steps, required to configure access to camera from internet.<br>


Required changes: <br>
* For Dlink - add following  to blumix-settings.js into functionGlobalContext section:<br>
,DlinkCam: {</br>
		"DCS934L" : {"hostname":"your ip:port","uid":"user id","pwd":"password","model":"DCS-934L"}<br>
	   }<br>
Add more cameras if you have them in similar way inside DlinkCam section<br>
Make sure model is set exactly as one from the list above<br>
* add new tab and import new [DlinkCam.json](DlinkCam.json) 


9/21/2015
-----------------
1. New cameras support - Dlink NIPCA series. Most should be able to report motion detection to dashboard and be used as triggers for IFTTT and snapshot recording<br>
Following models should work <i>DCS-1100(L), DCS-1130(L), DCS-2102, DCS-2103, DCS-2121, DCS-2130, DCS-2132L , DCS-2136L, DCS-2210, DCS-2230, DCS-2310L, DCS-2332L, DCS-3010, DCS-3112, DCS-3410, DCS-3411, DCS-3430, DCS-3710, DCS-3710 B1, DCS-3715, DCS-3716, DCS-5211L, DCS-5222L, DCS-5230L, DCS-5605, DCS-5635, DCS-6010L, DCS-6112(V), DCS-6113(V), DCS-6210, DCS-6314, DCS-6410, DCS-6510, DCS-6511, DCS-6513, DCS-6616, DCS-681x B1, DCS-6915, DCS-7010L, DCS-7110, DCS-7410, DCS-7413, DCS-7510, DCS-7513, DVS-310-1, DVS-V310-4, DCS-940L, DCS-942L</i><br>
Please use camera documentation for steps, required to configure access to camera from internet.<br>
2. Bug fixes

Required changes: <br>
* For Dlink - add following  to blumix-settings.js into functionGlobalContext section:<br>
,DlinkCam: {</br>
		"DCS942L" : {"hostname":"your ip:port","uid":"user id","pwd":"password","model":"DCS-942L"}<br>
	   }<br>
Add more cameras if you have them in similar way inside DlinkCam section<br>
Make sure model is set exactly as one from the list above<br>
* add new tab and import new [DlinkCam.json](DlinkCam.json) 

For bug fixes

* re-import [winkCore.json](winkCore.json)
* re-import [winkFreeboards.json](winkFreeboards.json)
* If you have supported Foscam, re-import [FosCam.json](FosCam.json)
* If you have supported Samsung Smartcams re-import [smartCams.json](smartCams.json)

Now each camera in dashboards will have link to history (currently only works in cloud mode)<br>
Also dlink cameras that suport status update for motion sensors will have virtual motion sensor in the system. Sensor name will be same as camera name. Can be used to trigger snapshot capture for other cameras as well as itself.

Do not forget to re-start application.

9/18/2015
----------------
Added IFTTT support for new lutron zigbee remote, motion sensors, trippers.<br>

Required changes:<br>
* Import updated [winkCore.json](winkCore.json)
 

How to use IFTTT:
--------------------
for example I added new zigbee remote to my wink app and named it <b>z Remote1</b>.</br>
in IFTTT create new recipe ,select Maker channel as <b>this</b> and  choose "Receive web request".<br>

Create name of the request using following logic:<br>

1. Name of your remote where all spaces are replaced by "_". in my case it will be <b>z_Remote1</b>
2. add "_" 
3. add one of the following actions:
	- "button_on_pressed"
	- "button_off_pressed"
	- "button_up_pressed"
	- "button_down_pressed"<br>

For example if I want to create IFTTT action when I press top (On) button I will put <i>z_Remote1_button_on_pressed</i> as event name.<br>

Choose any channel and action for <b>that</b>.<br>
Save your recipe

I also added same functionality for motion sensors and trippers:<br>
same logic applies to sensor name (replace spaces with " _ ")<br>
add "_" after name.<br>
for motion sensor you can use following option:
- motion_started
- motion_ended
<br>

for trippers:<br>
- opened
- closed
<br>

Examples 
- <i>Motion_sensor_motion_started</i>
- <i>Tripper_sensor_closed</i>





9/15/2015
----------------
Added ability to save motion based snapshots to Cloudant DB.

Required changes:

* Add following item to bluemix-settings.js into functionGlobalContext section:<br>
 ,VCAP_SERVICES: JSON.parse(process.env.VCAP_SERVICES)<br>
 ,camera_motion:{<br>
	"wink motion sensor name" : ["camera1 name","camera2 name"]<br>
	,"another wink motion sensor name" : ["camera1 name",...]<br>
}<br>
	then first id in quotes is motion sensor names as in WinkApp. In 		case of nest/drop cam 	camera it should be camera name as in Wink App. In my case it is "Nest Camera".<br>
	then in square brakets put every camera name in quotes  you want  to have a screenshot from, when motion sensor detects 	motion. in case of multiple cameras put a colon as a delimiter

 
Letst take following example:<br>
    ,camera_motion: {<br>
   		"Nest Camera" : ["Nest Camera"]<br>
		,"Basement Sensor" : ["BasementCam"]<br>
		,"Living room sensor" : ["Nest Camera","FosCam1"]<br>
		,"foscam" : ["FosCam1"]<br>
	}<br>
in this case first line - "Nest Camera" is a nestcam name from my Wink App, and obviously it will save images from itself when it will detect motion.<br>
Second line: "Basement Sensor" is a motion sensor name from my Wink App. It will activate foscam camera BasementCam as I defined it in same bluemix-settings.js [check these insructions](README.md#8212015).<br>
third line: "Living room sensor" is motion sensor name from my Wink App. "Nest Camera" is my nestcam name from Wink App. FosCam1 is my foscam camera name as I defined it in bluemix-settings.js<br>
and finally last line - if you have Foscam Fi89X camera models they also can report motion to node-red app as a motion sensor. Due to limitations they all report motion as one sensor which has name "foscam". In the last lane of the configuration I am defining that if motion comes from any Foscam F89X camera - save snapshot from camera "FosCam1"<br>

* Import updated  updated [winkCore.json](winkCore.json)
* Import updated [winkFreeboards.json](winkFreeboards.json)

* Import  updated [winkIntegration.json](winkIntegration.json)


* if you have foscam - Import  updated [FosCam.json](FosCam.json)
* if you have Samsung smartcam - Import  updated [smartCams.json](smartCams.json)

* Resrtat application and test your motion sensors.
* you can access history by opening freeboard dashboard: https://your_app_name.mybluemix.net/freeboard/camerahistory



9/11/2015
----------------
Added support for CloundantDB for bluemix based instances. Planning to store camera images, presence history in case of restarts.
Required changes:
* Update bluemix-settings.js and add following line to functionGlobalContext section: <br>
	,VCAP_SERVICES: JSON.parse(process.env.VCAP_SERVICES)
* Import updated [winkIntegration.json](winkIntegration.json)
That is all

9/4/2015
----------------
Added support for [Samsung Smart Cameras](http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=samsung+SNH&rh=i%3Aaps%2Ck%3Asamsung+SNH)
Tested on Samsung SNH-E6440BN.

Several changes required for this camera to work properly<br>
* we need to add "crypto" module to bluemix-setting.json. First you need to add following line to the top section of the file: var crp = require("crypto");<br><br>
So your first 3 lines in the file  should look like this:<br>
	<b>var crp = require("crypto");</b><br>
	var path = require("path");<br>
	var when = require("when");<rb>

	
* You also need to update functionGlobalContext section and add following lines<br>
	,SamsungCam: {<br>
		"your cam name" : {"hostname":"your external ip:port","private_key":"your samsung cam private key"}<br>
	             }<br>
	,CRYPTO: crp<br>
* open flow editor, add a new tab and import [smartCams.json](smartCams.json)
* restart your app. You should be able to see your camera feed in all auto-generated dashboards

8/25/2015 (part 2)
----------------
Added support for Foscam FI98XXX cameras (tested on FI9821W V2.1)
If you have Foscam FI98XX camera model
Please add "model":"HD" to you camera definition in  bluemix-settings.json
For example first camera is FI98XX and second is FI89XX
<br>
<br>
       , FosCam: {<br>
		"FI98XX Camera1 name": {"hostname":"external ip:port","uid":"admin","pwd":"your pwd","model":"HD"}<br>
		,"Camera2 name": {"hostname":"external ip:port","uid":"admin","pwd":"your pwd"}<br>
       	}
<br>
import updated [winkFreeboards.json](winkFreeboards.json) and [FosCam.json](FosCam.json)
re-deploy application.

8/25/2015
----------------
Small bug fixes to reduce amount of messages sent to Initial State and IFTTT


== UPDATE ==
8/21/2015
----------------
First drop for Foscam mjpeg ip cameras. (no need to update if you do not use FosCam cameras)
Features:
- Motion detection reporting
- Live video feed in wink dashboards
you need to re-import winkFreeboards.json and then create a new tab call it Foscam and import new FosCam.json
you also need to edit bluemix-setting.js file and add following section to functionGlobalContext:
<br>
<br>
       , FosCam: {<br>
		"Camera1 name": {"hostname":"external ip:port","uid":"admin","pwd":"your pwd"}<br>
		,"Camera2 name": {"hostname":"external ip:port","uid":"admin","pwd":"your pwd"}<br>
       	}
<br>

I assume that your foscam camera(s) can be accessed outside your local network (they have documentation on how to do that)

>hostname should not include http so it should look like:  "mycamera.mydomain.com:2233"

Add as many cameras as you have.
do cf push or redeploy via ibm github.
Re-import winkCore.json and winkFreeboards.json, create new tab name it FosCam  and import FosCam.json
Please wait as this will take take to initialize (approx 1-2 minutes after start)


8/13/2015
----------------
Initial State integration.
Sign in to initialstate.com and get your api key.
update bluemix-settings.json and add following line to functionGlobalContext:<br>
<b>,InitialStateKey:"your initial state api key"</b>

update winkCore flow from github.
your activity should flow to initial State website



8/12/2015
------------------
Please note that Bluemix-Monitoring.json has been divided into 3 sections.
Updates to that file are discontinued as of today.

3 new json files have been created representing different sections
Please remove current flow from your instance and start by creating 3 tabs or "workspaces" in node-red (use <b>+</b> icon on the left side of the flow editor. Then use "3 bar" menu, select Workspaces - Rename and name each:

1. [wink Core](winkCore.json)
2. [Freeboards](winkFreeboards.json)
3. [Integration](winkIntegration.json)

<img src="../../images/Workspaces.png"></img>

Import corresponding json from github into each tab and re-deploy your flows.


Briefly: these 3 flows
are "fundamental" flows. they cache state of your wink devides, getting weather and provide you with auto dashboards for:

* Lights

* Switches

* Locks

* Motion Sensors

* Trippers

* Groups

* Scenes

* Thermostats

* Eggtrays

* Piggybanks

* PropaneTanks

* Everything else that you have in wink ecosphere...

* Weather

See [README-Bluemix.md](../../README-Bluemix.md) for _all_ the details.

-- updates: Added authorization bearer to the outbound web service.
in order to retrieve proper data please make sure to pass http header in freeboard Authorization: "Bearer "+"value of FREEBOARD_TOKEN" (one that you set during bluemix configuration)
outbound webservice is accessible via "your node red host"/red/getGlobalDataJson
img src="../../images/Freeboard/Add%20authorization%20header.png"></img>

 -- updates after proper deployment system can generate sample dashboard automatically:
 navigate to "your_host"/freeboard/winkboard to check it.
 <img src="../../images/Freeboard/winkboard.png"></img>
 
