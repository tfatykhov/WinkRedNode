## UPDATE
 Flows in this folder are for learning purposes only. 
 For latest working version of the app go to [Bluemix Folder](Bluemix). 


## How to deploy a Node-RED flow

1. Click on the "+" button to get a new sheet.

2. Click on the three bars in the upper-right hand corner to get the menu.

3. Select "Import > Clipboard".

4. Cut-and-paste the contents of the Flow file into the pop-up window.

5. Click "OK".

6. Click on "Deploy".


## Sample Flows

* [SampleLightControl.txt](SampleLightControl.txt):
This fow  creates three subflows that turn binary switches on/off and adjust dimmable lights.
Check the corresponding functions on how to prepare json message for each subflow.

* [SampleSubscriptionAndResponseProcess.txt](SampleSubscriptionAndResponseProcess.txt):
OK, this is the one that makes things interesting!

    This flow creates an entrypoint URL and subscribes to updates for a Wink device (in this case, a motion sensor).
The Wink subscription mechanism requires a callback URL to process GET and POST requests from the Wink cloud.
First, this flow creates an entrypoint of "/api/subscribe/secondFloor",
which is accessed by the Wink cloud via a URL that looks like this:

        http://<your node-red hostname or IP>:<port>//api/subscribe/secondFloor

    The flow then starts the [PubSub Hubbub](https://en.wikipedia.org/wiki/PubSubHubbub) process in order to subscribe to updates.
Later on, when an updated is received from the Wink cloud,
a switch node creates several outputs based on the sensor name
(but you can also write a single function which will process JSON from any sensor).
Finally,
the last set of nodes generates an actual subscribtion message and calls the Wink API.

    When processing a successful response,
the flow keeps track of the subscription-ID and URL in a global object,
in case we need to cancel the subscription later on.
The flow automatically re-subscribes as needed (typically every 23 hours),
and adds an "update sensor status" subflow that updates a global variable with last status.

    Currently,
this flow supports motion sensors and trippers (since I do not have anything else).

* [SubscribeForLightsUpdates.txt](SubscribeForLightsUpdates.txt):
This flow subscribes to updates forto all your lightbulbs,
and updates a global variable whenever they change.
You can also add an additional processing function,
if needed.

* [SampleGroupControl.txt](SampleGroupControl.txt):
This flow controls Wink light groups.

* [LockControls.txt](LockControls.txt):
This flow creates two subflows to lock or unlock any Wink-capable lock.
