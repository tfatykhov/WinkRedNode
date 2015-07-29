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

### Running Locally...

You can run this software on your own computer,
such as a [Raspberry Pi 2 model B](https://www.raspberrypi.org/products/raspberry-pi-2-model-b/)
or even your own laptop computer!
In order to run Node-RED locally,
take a look at the [documentation](http://nodered.org/docs/).
Here is the [QUICKSTART](http://nodered.org/docs/hardware/raspberrypi.html) for running Node-RED on Raspberry Pi.

Once you have Node-RED running,
there are some "fundamental" flows that you should deploy before doing anything else.
To deploy a flow,
point your browser to your Node-RED configuration page, e.g., [http://127.0.0.1:1880/].
Click on the three bars in the upper-right hand corner to get the menu,
select "Import > Clipboard",
cut-and-paste the contents of the Flow file into the pop-up window,
and click OK.
Then click on the "Deploy" button.

====UPDATE====

[Flows/Bluemix/Bluemix-monitoring.json](Flows/Bluemix/Bluemix-monitoring.json):

works perfectly locally and in the cloud. For local version all you need - port forwarding so your instance can be accessed from outside. This is best option to start with. Other flows below are just starting points that shows you how to use the system.
Brian created schedule flow that works with blue mix monitoring - check it here:[Flows/BMeissen Sample Flows](Flows/BMeissen Sample Flows)

1. [Flows/InitializeWinkApi.txt](Flows/InitializeWinkApi.txt):
this set of flows requests an authorization token from Wink.
You need to edit GetOAuthTocken function and add your credentials and Wink API key.
Inject node is configured to run every 24 hours.
You need to manually start it by clicking on the "start" button of inject node first.

2. [Flows/SampleWebServices.txt](Flows/SampleWebServices.txt):
this set of flows gives you an example of how other applications communicate with your Node-RED app via Wink's REST API.
It has a comments node with more details.


### ... or in the Cloud
You can also run this software in the cloud.
The [HOWTO](README-Bluemix.md) for the IBM Bluemix cloud explains how to install both Node-RED and Freeboard,
and how to deploy the appropriate "fundamental" flows.

There are many excellent cloud platforms as a service;
if you really like another,
perhaps you contribute a "HOWTO" for installing Node-RED and Freeboard?

## Node-RED Flows
The [Flows/ directory](Flows/README.md) has many examples!

## Freeboard

Here is the [HOWTO](README-Freeboard.md) for how to use Freeboard with Node-RED and Wink.

## Useful links

* [Node-RED](http://nodered.org/)

* [Wink API](http://docs.wink.apiary.io/)

* [Node-RED on Raspberry Pi](http://nodered.org/docs/hardware/raspberrypi.html)
 
* [Freeboard](http://freeboard.io/)
