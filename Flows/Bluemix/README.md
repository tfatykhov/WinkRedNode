== UPDATE ==
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
 
