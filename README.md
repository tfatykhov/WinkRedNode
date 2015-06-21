# WinkRedNode

This repository explains how to use [Node-RED](http://nodered.org/) and [Freeboard](http://freeboard.io/)
with the [Wink API](http://docs.wink.apiary.io/) in order to enhance your home automation experience.

This repository is neither officially-endorsed (or supported) by [Wink](http://wink.com/);
however, Wink publishes an API and there are lots of wonderful open source tools that allow us to build on that API.


## Overview

Node-RED operates around the notion of a "flow".
This repository contains examples of many flows that "know" about the Wink API.
Once you have one or more flows deployed in your Node-RED process,
you can make use of that data.
The easiest way is to visual the data using [Freeboard](http://freeboard.io/).

### Running Locally

You can run this software on your own computer,
such as a [Raspberry Pi 2 model B](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/)
or even your own laptop computer!
In order to run Node-RED locally,
take a look at the [documentation](http://nodered.org/docs/).
Here is the [QUICKSTART](http://nodered.org/docs/hardware/raspberrypi.html) for running Node-RED on Raspberry Pi.

Once you have Node-RED running,
there are two "fundamental" flows that you should deploy before doing anything else.
To deploy a flow,
point your browser to your Node-RED configuration page, e.g., [http://127.0.0.1:1880/].
Click on the three bars in the upper-right hand corner to get the menu,
select "Import > Clipboard",
cut-and-paste the contents of the Flow file into the pop-up window,
and click OK.
Then click on the "Deploy" button.

1. [Flows/InitializeWinkApi.txt](Flows/InitializeWinkApi.txt):
this set of flows requests an authorization token from Wink.
You need to edit GetOAuthTocken function and add your credentials and Wink API key.
Inject node is configured to run every 24 hours.
You need to manually start it by clicking on the "start" button of inject node first.

2. [Flows/SampleWebServices.txt](Flows/SampleWebServices.txt):
this set of flows gives you an example of how other applications communicate with your Node-RED app via Wink's REST API.
It has a comments node with more details.

**timur do we need some instructions on how to install Freeboard locally?**

### In the Cloud
You can also run this software in the cloud.
Here is the [HOWTO](README-Bluemix.md) for the IBM Bluemix cloud --
it explains how to install both Node-RED and Freeboard,
and how to deploy the appropriate "fundamental" flows.

There are many excellent cloud platforms as a service;
if you really like another,
perhaps you contribute a "HOWTO" for installing Node-RED and Freeboard.

## Flow Directory
A reminder on how to deploy a Node-RED flow:

1. Click on the "+" button to get a new sheet

2. Click on the three bars in the upper-right hand corner to get the menu

3. Select "Import > Clipboard"

4. Cut-and-paste the contents of the Flow file into the pop-up window

5. Click "OK"

6. Click on "Deploy"

List of flows:

* [SampleLightControl.txt](SampleLightControl.txt):
This flow will actually create 3 subflows that can be used to turn binary switches on/off and adjust a dimmable light. Check corresponding functions on how to prepare json message for each subflow.

* [SampleSubscriptionAndResponseProcess.txt](SampleSubscriptionAndResponseProcess.txt):
Ok this is the one that makes things interesting.
This sample flow shows how to create an entry point url and then subscribe for real time events update from a wink device( motion sensor in this case).
Wink subscription mechanism requires you to create a callback url for a web service that can accept and process GET and POST requests from Wink API.
First set of nodes creates an url entry point (/api/subscribe/secondFloor).
It means that full url which should be accessible via internet is

        http://<your node-red hostname or IP>:<port>//api/subscribe/secondFloor

    And it tells Node-RED to accept GET request.
As soon as we send a subscription request to Wink API it perform a GET request to that url and expects a proper response which should be 200 - and HUB.
challenge string which it sends.
Function Wink Subscription resonse generates that message.
Second set of flows creates a function to process POST requests from Wink api.
Wink using POST metod to send raw JSON string from a device.
Switch node after that request just creates  several outputs based on the sensor name but you can also write a single function which will process JSON from any sensor.
Finaly last set of nodes generates an actual subscribtion message and calls wink api.
It also then process a response and in case of success adds subscription id and url to the golbal object in case we need to cancel subscription.
Inject node will re-send subscribtion request every 23 hours in order to keep it active.
This flow also adds an "update sensor status" subflow which will update global variable with last status.
Currently supports motion sensor and tripper sensor since I do not have anything else.

* [SubscribeForLightsUpdates.txt](SubscribeForLightsUpdates.txt):
Sample flow that will subscribe for all light_bulbs in your setup and will update global variable with light status. You can also add function to add additional processing if needed.

* [SampleGroupControl.txt](SampleGroupControl.txt):
Sample flow to control Wink Light groups.

* [LockControls.txt](LockControls.txt):
Sample flow that also creates 2 subflows to lock/unlock z-wave lock.

## Freeboard

Here is the [HOWTO](README-Freeboard.md) for how to use Freeboard with Node-RED and Wink.

## Useful links

* [Node-RED](http://nodered.org/)

* [Wink API](http://docs.wink.apiary.io/)

* [Node-RED on Raspberry Pi](http://nodered.org/docs/hardware/raspberrypi.html)
 
* [Freeboard](http://freeboard.io/)
