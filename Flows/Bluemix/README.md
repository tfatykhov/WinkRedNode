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
in order to retrieve proper data please update "define global objects' and change 
value of context.global.FreeboardAuthTocken variable.
Male sure to pass http header in freeboard Authorization: "Bearer "+<value of context.global.FreeboardAuthTocken >
outbound webservice is accessible via <your node red host>/red/getGlobalDataJson
Do not forget to add authorization header.
<img>../../images/Freeboard/Add%20authorization%20header.png</img>
