Briefly: [Bluemix-Monitoring.json]([Bluemix-Monitoring.json)
this is a "fundamental" flow that creates subscriptions for:

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
<img src="../../images/Freeboard/Add%20authorization%20header.png"></img>

 -- updates after proper deployment system can generate sample dashboard automatically:
 navigate to "your_host"/freeboard/winkboard to check it.
 <img src="../../images/Freeboard/winkboard.png"></img>
 
