== Main app pages ==
-
https://(your_app_name).mybluemix.net/freeboard/ui - main UI page<br>
https://(your_app_name).mybluemix.net/freeboard/winkboard - sample freeboard 1<br>
https://(your_app_name).mybluemix.net/freeboard/winkboardautogroup - sample freeboard <br>

UI 2.0
https://(your_app_name).mybluemix.net/wnrUI <br>
== UPDATE ==
-
12/20/2016
New system added to the integration:[WirelessTag]( ../../wirelesstag)

12/19/2016
-----------
### SmartThings Dimmers can be properly controlled from WNR UI
SmartThings Dimming switches have level now and have full functonality from UI and WNR robots

Required steps (SmartThings):
* You need to open SmartThings management page (https://graph.api.smartthings.com/)<br>

##### If you did not use this feature before
* Navigate to "My SmartApps" page and click on "add smart app" button, select "from Code"
![add stapp](images/STApp1.png)
![add stapp](images/STApp2.png)<br>

##### If you already has app installed
* edit WNR Poster smartApp
* Open following link [WNR Poster](../../SmartThings/httpPoster.groovy) and copy all code to the "code" section
* Click on App Settings and Enable Oauth for the app.
![add stapp](images/stapp5.png)
* Click Update
* Click on "save" and "publish" " for me"
![add stapp](images/STApp3.png)
* then on the right side - select you Location, devices and actions that should go to Wnr
* at the bottom you need to populate your WNR url
* populate same SmartThings secret key that you entered in WNR configuration
* click Install
* copy 2 parameters that appear once app is installed to some temp location(notepad):<br> 
![add stapp](images/stapp6.png)

##### Required steps (WNR)
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>
* navigate to freeboard/ui (UI 1.0) and open configuration tab

##### If you did not use SmartThings integration before
		* On integration settings section scroll down and populate SmartThings API Token and SmartThings API Endpoint using values you copied from SmartThings smaprtApp in previous steps.<br>
![add stapp](images/stapp4.png)

##### If you already used SmartThings integration
		* Navigate to Application Settings section and check "clear non-wink devices from cache
* Click Submit, once you see the message that Configuration has been saved successfully.

* click Refresh Wink Data
* once that is done you should be able to see your SmartThings switches in controls section adn in Details page as well as in UI 2.0



12/18/2016
-----------
### SmartThings Swithces can be controlled from WNR UI (no dimmers yet. need some test device)
This is next step in integration for SmartThings hub. You will be able to see ST switches under binary switches section in UI control tab.

Required steps (SmartThings):
* You need to open SmartThings management page (https://graph.api.smartthings.com/)<br>

##### If you did not use this feature before
* Navigate to "My SmartApps" page and click on "add smart app" button, select "from Code"
![add stapp](images/STApp1.png)
![add stapp](images/STApp2.png)<br>

##### If you already has app installed
* edit WNR Poster smartApp
* Open following link [WNR Poster](../../SmartThings/httpPoster.groovy) and copy all code to the "code" section
* Click on App Settings and Enable Oauth for the app.
![add stapp](images/stapp5.png)
* Click Update
* Click on "save" and "publish" " for me"
![add stapp](images/STApp3.png)
* then on the right side - select you Location, devices and actions that should go to Wnr
* at the bottom you need to populate your WNR url
* populate same SmartThings secret key that you entered in WNR configuration
* click Install
* copy 2 parameters that appear once app is installed to some temp location(notepad):<br> 
![add stapp](images/stapp6.png)

##### Required steps (WNR)
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>
* navigate to freeboard/ui (UI 1.0) and open configuration tab
* On integration settings section scroll down and populate SmartThings API Token and SmartThings API Endpoint using values you copied from SmartThings smaprtApp in previous steps.<br>
![add stapp](images/stapp4.png)
* Click Submit, once you see the message that Configuration has been saved successfully, click Refresh Wink Data
* once that is done you should be able to see your SmartThings switches in controls section adn in Details page as well as in UI 2.0

12/17/2016
-----------
### SmartThings Swithces data flow from ST to Node Red (one way for now)
* Data will appear on dashboards, and total lights count will reflect ST lights as well.
* You can use it in Robots to control WINK and LIFX devices
* You will see swithces on Controls tab but no controls for now.

### Fixes
* wink dashboard properly shows lights which are not part of any group

### New Functionality
* context.global.checkPresence() function now has parameter 'newMode'. By default it will use old way to check presence. but if you call it with new parameter ex. context.global.checkPresence('newMode') it will use context.global.winkState.groups['@wnrSensors'].presence to check Presence. That will include SmartThings sensors as well.

##### Required steps (WNR)
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

Required steps (SmartThings):
* You need to open SmartThings management page (https://graph.api.smartthings.com/)<br>

##### If you did not use this feature before
* Navigate to "My SmartApps" page and click on "add smart app" button, select "from Code"
![add stapp](images/STApp1.png)
![add stapp](images/STApp2.png)<br>

##### If you already has app installed
* edit WNR Poster smartApp
* Open following link [WNR Poster](../../SmartThings/httpPoster.groovy) and copy all code to the "code" section
* Click on "save" and "publish" " for me"
![add stapp](images/STApp3.png)
* then on the right side - select you Location, devices and actions that should go to Wnr
* at the bottom you need to populate your WNR url
* populate same SmartThings secret key that you entered in WNR configuration
* click Install

11/30/2016
-----------
###Fix presence sensor issue.
#####Required steps (WNR)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  perform "Modified Nodes" deployment<br>

11/13/2016
------------
###Summary page shows counts and averages for all supported lights and sensors and systems. (WINK SmartThings, LifX)

###Support for dynamic IFTTT applets for Google Home Assistant
Google Home Assistant in IFTTT has ability to create "dynamic" applets where you can specify numeric and text entries that can be different. With that ability there is an easy way to add support for WinkNodeRed:
Here is the sample of such request:
First you need to create a new IFTTT Applet, select Google Assistant as "THIS" and then choose "Say a phrase with both a number and a text ingredient" as a trigger. You can put any wording you like and applet gives you ability to put several different ways for your phrase. For "dynamic part" you need to use $ for a text component and # for a number component. For example if I want to turn a light on at specific dim level I can put following phrase: "set $ on at # percent":
<img src="images/google_home_1.png"><br>
Once you do that - select Maker channel as "THAT" and put following:
 * Url: https://your_app_name.mybluemix.net/red/ifttt
 * Method: POST
 * Content Type: application/json
 * Body: {"winkName":"{{TextField}}","type":"light", "cmd":"on", "level":{{NumberField}},"iftttkey":"your_ifttt_key"}
 <img src="images/google_home_2.png"><br>
Save this applet.<br>

Now moving to WinkNodeRed side:<br>
In order for this to work you need:

#####Required steps (WNR)
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

######Bluemix git console:<br>
*  re-deploy application in git<br>
<img src="images/deploy.png">



10/15/2016
------------
###Security improvements.
Browser fingerprints added to most of request. JWT token will be verified to make sure request came from same browser where user authenticated to prevent "false" requests.

###Robot flow improvements.
Added Key data for locks that support key data.
if you use WNR robots when "lock" message will come to your flow it will have following payload:

	{ 	
		"name": "Front door Lock", 
		"object_type": "lock", 
		"new_state": "Locked", 
		"old_state": "Unlocked", 
		"key_used": "Key #3" 
	}
	
<br>

#####Required steps (WNR)
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

######Bluemix git console:<br>
*  re-deploy application in git<br>
<img src="images/deploy.png">

10/09/2016
------------
###Security improvements.
*  Browser sends md5 hash for user/password combination. This is better working for users with local installations where no SSL is configured.
*  Application now using JWT (https://jwt.io/) for authorization. This is first step for better security for browser UI.

#####Required steps (WNR)
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

######Bluemix git console:<br>
*  re-deploy application in git<br>
<img src="images/deploy.png">


10/05/2016
------------
###Holiday Mode improvements.
When holiday mode is turned off affected lights are turned off as well
#####Required steps (WNR)
*  Import updated [HolidayMode.json](HolidayMode.json) if you have color bulbs.
*  perform "FULL" deployment<br>

10/02/2016
------------
###Holiday Mode bug fixes.
If you imported yesterday's update prior to seing this, bug was identified which prevented system to work when only one bulb was selected.

#####Required steps (WNR)
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [HolidayMode.json](HolidayMode.json) if you have color bulbs.
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br

Otherwise just follow steps from 10/01/2016.

10/01/2016
------------
###Holiday Mode, pushbullet channel, bug fixes

#####New addition:
Holiday mode that allows to cycle color bulbs using random color or color palette:
![add stapp](images/holidaymode.png)
<br>
Global variable name - context.global.<b>holiday_mode_on</b> so you can use Alexa or IFTTT to turn mode on/off.

<b> Do not forget to click "submit" every time you change something on config page</b>
#####Updates:
Added ability to specify PushBullet Channel so multiple users can get messages:
![add stapp](images/pbullet_4.png)
<br>


#####Required steps (WNR)
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  Add new tab in flow editor and name in "HolidayMode".
*  Import <b>new</b> [HolidayMode.json](HolidayMode.json) if you have color bulbs.
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

######Bluemix git console:<br>
*  re-deploy application in git<br>
<img src="images/deploy.png">

-
09/13/2016
------------
###### Updates
* Send robot Event to IFTTT
When WINK robot is fired event is sent to ifttt via Maker channel:
	* event name  equal to wink Robot name if robot name has more than one word, space is replaced to _<br> 
	* example: If WINK Robot Name is My Robot, Maker Channel Event Name will be My_Robot<br>
Flow Editor:<br>	
*  Import updated [winkCore.json](winkCore.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

09/11/2016
------------
###### Updates
* SmartThings Leak sensors properly report "leak"
* fan on/off command for thermostat<br>

mycmd= context.global.executeTstatCMD(TstatName,command,extra parameter);

	command :
		'fan' 
		extra parameter : 'on' , 'off'
	
Flow Editor:<br>	
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

08/22/2016
------------
#####SmartThings to Node Red integration for Sensors
This update starts new chapter in WNR. SmartThings integration.
First drop will allow sensor data from SmartThings hub to be avaliable in WNR. <br>
Required steps (WNR)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  perform "FULL" deployment<br>

Bluemix git console:<br>
*  re-deploy application in git<br>
* Open UI version 1, navigate to configuration tab/Integration settings, find "SmartThings Secret key" line and put some random string (you can use https://www.random.org/strings/)

Required steps (SmartThings):
* You need to open SmartThings management page (https://graph.api.smartthings.com/)
* Navigate to "My SmartApps" page and click on "add smart app" button, select "from Code"
![add stapp](images/STApp1.png)
![add stapp](images/STApp2.png)
* Open folloeing link [WNR Poster](../../SmartThings/httpPoster.groovy) and copy all code to the "code" section
* Click on "save" and "publish" " for me"
![add stapp](images/STApp3.png)
* then on the right side - select you Location, devices and actions that should go to Wnr
* at the bottom you need to populate your WNR url
* populate same SmartThings secret key that you entered in WNR configuration
* click Install

Once events start happening on ST side - data will flow to WNR so do not expect to see all devices immediately.

08/01/2016
------------
#####Added LeakSmart valves data to summary page (wnr UI 2.0 and 1.0)
![valve summary](images/valve1.png)

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

Bluemix git console:<br>
*  re-deploy application in git<br>
<img src="images/deploy.png">


07/31/2016
-----------
URL for wink API index has been changed after it was not accessible for some time last week
I updated winkIntegration flow so it should work again.

Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  perform "FULL" deployment<br>

07/30/2016
------------
####winkCore - added valve commands.
* use context.global.executeWinkCMD(winkname,type,cmd,level) function with following paramteres:
	* winkname - LeakSmart Valve Name (user proper case as in wink app)
	* type - 'valve'
	* cmd:
		* 'open' - this will open valve
		* 'close' - this will close valve<br>

####winkCore - added advanced lock commands.
* use context.global.executeWinkCMD(winkname,type,cmd,param) function with following paramteres:
	* winkname - Wink Lock Name (user proper case as in wink app)
	* type - 'lock'
	* cmd:
		* 'vacation_mode' - this will enable/disable vacation mode
			* param = "true" or "false"
		* 'beeper' - this will enable/disable beeper
			* param = "true" or "false"
		* 'auto_lock' - this will enable/disable auto lock
			* param = "true" or "false"
		* 'alarm' - this will activate lock alarm mode
			* param = "null", "activity", "tamper", "forced_entry"

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)		
*  perform "FULL" deployment<br>

-
07/21/2016
-----------
It seems I missed documentation on how to use fadein/out/pulse effect commands inside node-red robots/schedules

fade in/fade out:
mycmd= context.global.executeEffectCMD(effect,winkName,winkType,min,max,period);

parameters :

	'effect': 'fadein','fadeout'
	'winkName': dimmable light name or group name
	'winkType': 'light' or 'group'
	'min': min brightness (0-100)
	'max': max brightness (0-100)
	'period' : effect period in seconds
	
pulse:
mycmd= context.global.executeEffectCMD(effect,winkName,winkType,min,max,period,repeat,delay);

parameters :

	'effect': 'pulse'
	'winkName': dimmable light name or group name
	'winkType': 'light' or 'group'
	'min': min brightness (0-100)
	'max': max brightness (0-100)
	'period' : put null or 0
	'repeat' : 'number of "pulses"
	'delay' : delay between "pulse" in seconds

then as usual type
	node.send(mycmd);

07/12/2016
-----------
Wink changed it's api server name and I probably missed it but today old server stopped working due to expired certificate
Please update winkCore flow
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

06/24/2016
------------
#####Milestone for WNR UI 2.0
controls are functional both directions. (no garage doors, robots and groups for this release)<br>
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

Bluemix git console:<br>
*  re-deploy application in git<br>
<img src="images/deploy.png">


06/23/2016
------------
Node-Red core 0.14.3 has been released.
There are some changes in flow UI/ some new nodes, etc.
In order to move to this new version - update your  [package.json](package.json) and re-deploy app in BlueMix git.<br>
for local installations - you just need to follow instructions from http://nodered.org/docs/getting-started/upgrading.html
This update will also bring you new UI 2.0 version. Still early preview and not fully functional.

06/21/2016
------------
###Added missed command for supported thermostats to set users_away
#####Usage in robots/schedules
it is similar to other commands:<br>
mycmd= context.global.executeTstatCMD(TstatName,command,extra parameter);

commands :

	'mode' 
	extra parameter : 'heat_only' , 'cool_only' , 'auto' (if your model permits this)

	'heat_start_at'
	extra parameter : temp in celcius, you can use context.global.F2C(temp in F) - min temp when tstat starts heating

	'cool_start_at' 
	etra parameter : temp in celcius, you can use context.global.F2C(temp in F) - max temp when tstat starts cooling

	'powered'
	extra_parameter : 'on' , 'off'
	
	'users_away'
	extra_parameter : 'true' , 'false'
	
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


06/09/2016
------------
#####winkCore - added schedules to controls/robots tab.
* use context.global.executeWinkCMD(winkname,type,cmd) function with following paramteres:
	* winkname - Robot or Schedule name (user proper case as in wink app)
	* type - 'robot'
	* cmd - 'enable'/'disable'<br>

Flow Editor:
*  Import updated [winkCore.json](winkCore.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)		
*  perform "FULL" deployment<br>

06/04/2016
------------
####winkCore - added siren commands.
* use context.global.executeWinkCMD(winkname,type,cmd,level) function with following paramteres:
	* winkname - siren name (user proper case as in wink app)
	* type - 'siren'
	* cmd:
		* 'siren_only', 'strobe_only', 'siren_and_strobe' - this will turn siren on in one of the modes
		* 'off' - this will turn siren off
		* 'auto_shutoff' this will set auto shutoff. for this cmd type specify one of the following values using level parameter:
			* null (manual shutdown), 30 , 60, 120 seconds to autoshutdown siren. This is a configuation command so you probably will never use it but if you do - make sure you know what you want.

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)		
*  perform "FULL" deployment<br>

05/27/2016
------------
###Owntracks: Added ability to ignore iPhone ping events.
* Navigate to configuration/Applicationsettings ignore iPhonePing switch (turned off by default)<br>
![owntracks settings](images/owntracks13.png)

Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)


###Added command that can be used in Robots to adjust theromstat settings:<br>
#####Usage in robots/schedules
it is similar to other commands:<br>
mycmd= context.global.executeTstatCMD(TstatName,command,extra parameter);

commands :

	'mode' 
	extra parameter : 'heat_only' , 'cool_only' , 'auto' (if your model permits this)

	'heat_start_at'
	extra parameter : temp in celcius, you can use context.global.F2C(temp in F) - min temp when tstat starts heating

	'cool_start_at' 
	etra parameter : temp in celcius, you can use context.global.F2C(temp in F) - max temp when tstat starts cooling

	'powered'
	extra_parameter : 'on' , 'off'	
	
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


05/07/2016
------------
* Presence automation additions:
* Option to turn on/off auto execution of wink shortcuts for Presence.
	* Navigate to configuration/Applicationsettings and Look for Execute presence shortcuts switch (turned on by default)<br>
![owntracks settings](images/owntracks12.png)

Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)


05/05/2016
------------
* Owntracks additions:
* WNR defined home geofence radious is displayed on the map.
* Enhancements to presence detection and shortcut execution (owntracks region transitions are turned on).
* Navigate to configuration/Integration settings and scroll down to OwnTracks section and define your geofence radius. and accuracy threshold which will prevent "bad" location data to flow in<br>
![owntracks settings](images/owntracks11.png)
* click "submit"

Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)


05/04/2016
------------
* Owntracks additions:
* Added WNR defined geo-radius.
* Enhancements to presence detection and shortcut execution.

Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)

* Navigate to configuration/Integration settings and scroll down to OwnTracks section and define your geofence radius.<br>
![owntracks settings](images/owntracks10.png)
* click "submit"

#####Presence shortcut support:
To avoid future confusion you need to define following wink shortcuts:<br>
* PRESENCE DAY / PRESENCE NIGHT - these will be executed when global presence status will change to true(somebody arrived) before sunset/after sunset<br>
* NO PRESENCE DAY / NO PRESENCE NIGHT - these will be executed when global presence status will change to false (everybody left) before sunset/after sunset<br>
	

05/01/2016
------------
* Added support for OwnTracks app with HTTP mode. (IOS supported currently, Android is on the way)
* Fixed Presence clearing bug.

Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)

Bluemix git console:<br>
*  re-deploy application 

##### Setting up OwnTracks support:
* Navigate to configuration tab in tablet ui, and Look for OwnTracks Personal Key entry in Integration Settings
![owntracks settings](images/owntracks1.png)
* Enter random Aplha-numeric only string _no special symbols_. You can use following [Random String Generator](https://www.random.org/strings/?num=1&len=7&digits=on&upperalpha=on&loweralpha=on&unique=on&format=html&rnd=new)
* Click Submit button to save it.
* Get OwnTracks application from app store on your phone.
* Configure Owntracks app using [OwnTracks readme](owntracks.md)
* Re-load Tablet UI (refresh browser) and if everything worked, you should have new tab _My Family_  where you will see your home marker, and markers for each sensor you add (just first letter so make then unique)
![new tab](images/owntracks8.png)
* and new data in details tab on MultiSensor panel.<br>
![new tab](images/owntracks9.png)
* _Presence_ will be automatically added to sensors list if you configure OwnTracks region.



04/16/2016
------------
Clear nonWink devices and Presence entries from cache.
New settings added to configuration tab/application settings<br>
<img src="images/clear_cache.png"><br><br>
Select one relevat to you and click "submit" button. Refresh browser after that.

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

04/14/2016
------------
####Bloomsky:

Updated Bloomsky integration such that the UI will show the latest image from Bloomsky, without needing to refresh the browser.
Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  perform "Modified Nodes" deployment<br>
<br>

####Blink Cameras:

Integration with Blink Home Cameras now live! If you have Blink cameras, your cameras can now show up in the Camera tab of the UI and the temperature data shows up in the sensors. Flow Editor:<br>
*  Import [Blink.json](Blink.json)
*  Update "Define e-mail and password" node with your Blink username and password.
*  Perform "Modified Nodes" deployment<br>


04/09/2016
------------
Old or "deleted" wink devices are not shown anymore.
Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


Small updates:
04/08/2016
------------
Small updates:
* fixed https://github.com/tfatykhov/WinkRedNode/issues/45 raised issue with camera image cropping.
* added function to save camera snapshots in robotos/schedules:<br>
		usage: node.send(context.global.saveCameraSnapshot(camera_name,event_name);<br>
			camera_name can be a single camera, example 'BasementCam' or list of cameras separated by comma - 		'BasementCam,DeckCam'<br>

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


03/31/2016
------------
Color change for supportted bulbs in ui including apple support :)
<img src="images/color_bulbs_ipad.png"><br><br>

<b>You still need to perform git console steps from previous update (03/30/2016) unless you aready done this.</b>

Bluemix git console:<br>
*  re-deploy application in git<br>
<img src="images/deploy.png">

Flow Editor:<br>
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


03/30/2016
------------
Color change for supportted bulbs in ui

<img src="images/color_bulbs.png"><br><br>
* usage in scripts:<br>
var color=context.global.tinycolor("red");<br>
executeWinkCMD("light name","light","color",color.toHex());<br>

List of color names - <br>
https://www.w3.org/TR/css3-color/#svg-color<br>

you can use hex value without leading # directly:<br>
executeWinkCMD("light name","light","color","FF0000"); <br>
<b>This command will only changes bulb color. You need to execute "power on" command first</b><br>
<br>
Bluemix git console:<br>
*  copy contents of [package.json](package.json) and update same file in your configuration with it contents.
*  add following line to the bluemix-settings.js inside functionGlobalContext section<br>
	*       ,tinycolor : require("tinycolor2").  refer to [sample bluemix-settings.js](bluemix-settings.js)
*  re-deploy application in git<br>
<img src="images/deploy.png">

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

03/20/2016
------------
* small bug fixes
* WNR robots on/off switch in configuration/application settings
 
Flow Editor:<br>
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)



03/13/2016
------------
BloomSky integration
entry for the api key added to config tab<br>
<img src="images/bloomsky2.png"><br><br>
After update you should see BloomSky Data in MultiSensor section on Details tab:
<img src="images/bloomsky1.png"><br>

You will also see latest sky image on cameras tab. Screenshots/history also works


Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

Bluemix git console:<br>
*  re-deploy application 

You can use following global variables:

context.global.Weather.Bloomsky:{<br>
			"Rain": false,<br>
			"Night": false,<br>
			"Luminance": 3455,<br>
			"Humidity": 38,<br>
			"Pressure": 991,<br>
			"UVIndex": "1",<br>
			"TemperatureC": 15.95,<br>
			"TemperatureF": 61<br>
}

03/13/2016
------------
* Added config option to turn data flow to IFTTT.
* Added some help pages for configuration tabs.<br>
<img src="images/cfg_hlp1.png"><br><br>
<img src="images/cfg_hlp2.png"><br>

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


03/11/2016
------------
Vacation mode small update:
* binary switches are in the list
* color scheme changes for config pages<br>
<img src="images/vacation_mode_drk.png"><br>


Flow Editor:<br>
*  Import updated [tabletUI.json](tabletUI.json)<br>
*  perform "Modified Flows" deployment<br>


03/11/2016
------------
Vacation mode additions:
* Supported locks will turn vacation mode.
* Supported locks will activate tamper alarm.
* If presence is configured - Presence can turn vacation mode off automatically (stop random lights effect). Lock mode has to be changed manually back to normal.
* Selected light bulbs (including LIFX) will be randomly set to on, off or dim between sunset hour and 1 a.m<br>

<img src="images/vacation_mode.png"><br>

Required changes:<br>
Bluemix git console:<br>
*  re-deploy application 

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  Import updated [blueIris.json](blueIris.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>

03/06/2016
------------
* Added buttons to summary page to activate/deactivate Schedules and Vacation Mode.<br>
* 
<img src="images/newModes.png"><br>

* Vacation mode is a first drop so no random lights yet but it will turn on phone notification for all connected devices via pushbullet irregadles of manual settings and when motion is detected every camera in the app will automatically take a snapshot. I will continue to work on additional settings but it takes more time than I thought.
* Fixes for blueIris to remove error message

Required changes:<br>
Bluemix git console:<br>
*  re-deploy application 

Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  Import updated [blueIris.json](blueIris.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


03/04/2016
------------
* Garage doors are back for robots but still disabled in UI.<br>
* Per request from a user, added mobile push notifications (same as ui) via pushbullet. In order to set this up you will need pushbullet API key which you can easily get. Just go to pushbullet.com, create or log in to your account, then navigate to Settings - Account, scroll down until you will see "generate Access token" button.<br>
<img src="images/pbullet_1.png"><br>
Copy the value and add it to the config tab "Pushbullet key"<br>
<img src="images/pbullet_2.png"><br>
As you can see config tab is re-designed a bit. so open "Apllication Settings" section and check what do you want to send to the phone <img src="images/pbullet_3.png"><br>
 Then click "submit"<br>


Flow Editor:<br>
*  Import updated [winkCore.json](winkCore.json)
*  Import updated [winkIntegration.json](winkIntegration.json)
*  Import updated [tabletUI.json](tabletUI.json)
*  do not forget to check [duplicate websockets](../../README-WebsocketFix.md)
*  perform "FULL" deployment<br>


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
 
