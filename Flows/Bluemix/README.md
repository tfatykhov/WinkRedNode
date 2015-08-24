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
Please wait as this will take take to initialize (approx 1-2 minutes after start)


8/13/2015
----------------
Initial State integration.
Sign in to initialstate.com and get your api key.
update bluemix-settings.json and add following line to functionGlobalContext:
,InitialStateKey:"your initial state api key" 

do not forget to put comma unless it is last line in that section
to the  functionGlobalContext section
update winkCore flow from github.
your activity should flow to initial State website



8/12/2015
------------------
Please note that Bluemix-Monitoring.json has been divided into 3 sections.
Updates to that file are discontinued as of today.

3 new json files have been created representing different sections
Please remove current flow from your instance and start by creating 3 tabs or "workspaces" in node-red

1. wink Core
2. Freeboards
3. Integration

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
 
