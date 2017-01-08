# WinkRedNode
## Node-Red Overview

Node-RED operates around the notion of a "flow".
This repository contains examples of many flows that "know" about the Wink API.
Once you have one or more flows deployed in your Node-RED process,
you can make use of that data.

## About
This application is Node-Red based app which helps joining together various systesms for better home automation experience:

* Wink http://winkapp.com (HA system with extensive list of supported devices)
* SmartThings http://smartthings.com (Samsung HA system with extensive list of supported devices)
* Lifx http://lifx.com (color wifi enabled ligjt bulbs)
* IFTTT http://ifttt.com (connecting services and more together)
* Forecast.io http://forecast.io (one of the best weather forecast systems)
* Blue Iris http://blueiris.com (inexpensive solution for video monitoring)
* BloomSky http://bloomsky.com (community based weather station and sky camera)
* Several ip cameras (Foscam, D-link, Samsung)
* OwnTracks app support for geofencing and location sharing http://owntracks.org

written in JavaScript and powered by Node-Red and Node.js it allows to build additional functionality like advanced scheduling very easy. It is also a fun way to learn functional and event based programming and some modern technologies at the same time enchancing your home automation experience.


### Installation instructions:
- Blue Mix Cloud
Use following [HOWTO](README-Bluemix.md) for instructions on how to create BlueMix node.js container with node red as well as how to configure application for initial run,


- Running Locally.

use following [Readme](https://github.com/tfatykhov/local-wink-node-red/blob/master/README.md) for instructions on how to install local modified node-red instance using just single command and also Optional, but <b>but highly recommended</b> instruction on how to obtain SSL certificate and protect your local node-red instance.


Once you have Node-RED running, you can deploy your flows described below
To deploy a flow,
point your browser to your Node-RED configuration page, e.g., [http://127.0.0.1:1880/].
Click on the three bars in the upper-right hand corner to get the menu,
select "Import > Clipboard",
cut-and-paste the contents of the Flow file into the pop-up window,
and click OK.
Then click on the "Deploy" button.

### Main Flows
Please navigate to: [Flows/Bluemix](Flows/Bluemix/). In order for application to work you need to import following flows:

1. [Flows/Bluemix/winkCore.json](Flows/Bluemix/winkCore.json) - core flow that performs initial calls to wink servers in order to get access tocken, list of devices and subscribe itself for status updates from wink as well as other services. It also creates connection to weather api, ifttt, initialstate.com api bassed on your configuration settings. 
2. [Flows/Bluemix/winkIntegration.json](Flows/Bluemix/winkIntegration.json) - creates entry points for IFTTT/tasker/etc. 
3. [Flows/Bluemix/winkFreeboards.json](Flows/Bluemix/winkFreeboards.json) - set of flows to generate freeboard dashboards
4. [Flows/Bluemix/tabletUI.json](Flows/Bluemix/tabletUI.json) - set of flows to generate application User interface


All these flows works perfectly locally and in the cloud.Only exception for now is that local version will not be able to use IBM Cloudant DB as percistence layer. You will have to put all global variables in FunctionGlobalContext section of settings.js in /home/pi/.node-red. This will be addressed in the future but currently we  are concentrated on cloud based version.
Also you  will need to setup port forwarding so your instance can be accessed from outside. 

Brian created schedule flow that works with blue mix monitoring - check it here:[Flows/BMeissen Sample Flows](Flows/BMeissen Sample Flows)


### Donations
Donations are always welcome. They will help us keep this project up and running and add support to more devices and services!
you can use PayPal or google wallet. 

* Timur Fatykhov: tfatykhov@gmail.com
* Brian Meissen: paypal@meissenation.com

### Additional Information
There are many excellent cloud platforms as a service;
if you really like another,
perhaps you contribute a "HOWTO" for installing Node-RED and Freeboard?

## Freeboard

Here is the [HOWTO](README-Freeboard.md) for how to use Freeboard with Node-RED and Wink.

## Useful links

* [Node-RED](http://nodered.org/)

* [Wink API](http://docs.wink.apiary.io/)

* [Node-RED on Raspberry Pi](http://nodered.org/docs/hardware/raspberrypi.html)
 
* [Freeboard](http://freeboard.io/)
