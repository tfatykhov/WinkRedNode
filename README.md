# WinkRedNode
Set of sample flows that shows how to use node-red and Quirky Wink api to automate home

In order to utilize this repository you need to have following:

 1. Working version of Node-Red instance - http://nodered.org/. Also some basic knowledge on node-red functions and usage.
 2. freeboard node installed (required to utilize dashboards). Optional. (http://flows.nodered.org/node/node-red-contrib-freeboard)
 3. Wink API key

The way I set it up for now - each txt file in Flows subfolder is a JSON representation of a flow or set of flows for node-red. 
Please open the file and copy all it contents to the clipboard. Go to your Node Red flow editor, clink on 3 bars icon at the top right corner and select Import - Clipboard. This operation will paste the flow to the editor window. 

List of flows:

1. InitializeWinkApi.txt - First flow that will be used to request authorization token from wink. You need to edit GEtOAuthTocken function and add yuor credentials and Wink API key. Inject node is configured to run every 24 hours. You need to manually start it by clicking on the "start" button of inect node first.

2. SampleWebServices.txt - this set of flows will give you example of how other applications can communicate with your node-red app wia REST API. It has a comments node with more details.

3. SampleLightControl.txt this flow will actually create 3 subflows that can be used to turn binary switches on/off and adjust a dimmable light. Check corresponding functions on how to prepare json message for each subflow.

4. SampleSubscriptionAndResponseProcess.txt. Ok this is the one that makes things interesting. This sample flow shows how to create an entry point url and then subscribe for real time events update from a wink device( motion sensor in this case). Wink subscription mechanism requires you to create a callback url for a web service that can accept and process GET and POST requests from Wink API. First set of nodes creates an url entry point (/api/subscribe/secondFloor). It means that full url which should be accessible via internet is http://<your node-red hostname or IP>:<port>//api/subscribe/secondFloor. And it tells node-red to accept GET request. As soon as we send a subscription request to Wink API it perform a GET request to that url and expects a proper response which should be 200 - and HUB. challenge string which it sends. Function Wink Subscription resonse generates that message. Second set of flows creates a function to process POST requests from Wink api. Wink using POST metod to send raw JSON string from a device. Switch node after that request just creates  several outputs based on the sensor name but you can also write a single function which will process JSON from any sensor. Finaly last set of nodes generates an actual subscribtion message and calls wink api. It also then process a response and in case of success adds subscription id and url to the golbal object in case we need to cancel subscription. Inject node will re-send subscribtion request every 23 hours in order to keep it active. This flow also adds an "update sensor status" subflow which will update global variable with last status. Currently supports motion sensor and tripper sensor since I do not have anything else.

5. SubscribeForLightsUpdates.txt - sample flow that will subscribe for all light_bulbs in your setup and will update global variable with light status. You can also add function to add additional processing if needed.

6. SampleGroupControl.txt - sample flow to control Wink Light groups.

7. LockControls.txt - sample flow that also creates 2 subflows to lock/unlock z-wave lock.


Usefull links:

Wink APi  - http://docs.wink.apiary.io

 How to setup node-red instance on BlueMix Cloud - https://www.ng.bluemix.net/docs/#starters/Node-RED/nodered.html#nodered
 
 Node Red on Raspberry Pi - http://nodered.org/docs/hardware/raspberrypi.html
 
 freeboard - http://freeboard.io
 
