/**
 * Copyright 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/
// !!!!DO NOT CHANHGE ANYTHING BELOW THIS LINE!!!
var crp = require("crypto");
var path = require("path");
var when = require("when");

var cfenv = require("cfenv");
var appEnv = cfenv.getAppEnv();

var VCAP_APPLICATION = JSON.parse(process.env.VCAP_APPLICATION);
var VCAP_SERVICES = JSON.parse(process.env.VCAP_SERVICES);

var settings = module.exports = {
    uiPort: process.env.VCAP_APP_PORT || 1880,
    mqttReconnectTime: 15000,
    serialReconnectTime: 15000,
    debugMaxLength: 1000,

    // Add the bluemix-specific nodes in
    nodesDir: path.join(__dirname,"nodes"),

    // Blacklist the non-bluemix friendly nodes
    nodesExcludes:['66-mongodb.js','75-exec.js','35-arduino.js','36-rpi-gpio.js','25-serial.js','28-tail.js','50-file.js','31-tcpin.js','32-udp.js','23-watch.js'],

    // Enable module reinstalls on start-up; this ensures modules installed
    // post-deploy are restored after a restage
    autoInstallModules: true,

    // Move the admin UI
    httpAdminRoot: '/red',

    // You can protect the user interface with a userid and password by using the following property
    // the password must be an md5 hash  eg.. 5f4dcc3b5aa765d61d8327deb882cf99 ('password')
    //httpAdminAuth: {user:"user",pass:"5f4dcc3b5aa765d61d8327deb882cf99"},

    // Serve up the welcome page
    httpStatic: path.join(__dirname,"public"),
   // !!!!Please put your settingx instead of XXX in the section below and remove comments if you use that api (remove //) !!!
   functionGlobalContext: {
	WinkUser: {"uid":"XXX","pwd":"XXXX"}
	,BlueMixUrlBase: "https://XXXX.mybluemix.net"
//	,forecastIoApiKey: "XXXXX"
	,FREEBOARD_TOKEN: "XXXXX"
//	,IFTTT_TOKEN: "XXXX"
//	,LIFX_TOKEN: "XXXX"
//	,motionAdjustTstat: true
//	,InitialStateKey: "XXX"
	,HomeLocation: { "lat":"XXXX","lon":"XXXX"}
    
       // uncomment next lines if you have specific camera models   
	
    // ,FosCam: {
	//	"FosCam1": {"hostname":"XXXX:XXX","uid":"XXX","pwd":"XXXX"} //forFI89X series
	//	,"FosCam98": {"hostname":"fy5299.myfoscam.org:8090","uid":"XXXX","pwd":"XXX","model":"HD"} //for FI98X series
	//	    }
	//,SamsungCam: {
	//	"BasementCam" : {"hostname":"timothyr.no-ip.org:1883","private_key":"Dfdbkjy5"}
    //             }
	//,DlinkCam: {
	//	"DCS942L" : {"hostname":"XXX:XXX","uid":"XXXX","pwd":"XXXXX","model":"DCS-942L"}
	//	,"DCS934L" : {"hostname":"XXXX","uid":"XXXX","pwd":"XXXX","model":"DCS-934L"}
    //	           }
    ,VCAP_SERVICES: JSON.parse(process.env.VCAP_SERVICES)
    ,CRYPTO: crp
//    ,useRobots: true // Uncomment this line if you plan to use BMeissen's Robot flow.
    // uncomment lines below if you want your cameras to record snapshots based on motion
       
    //,camera_motion: {
    //	"Camera":["Camera"]
    //	,"Basement Sensor":["BasementCam"]
    //	,"Living room sensor":["Camera"]
    //	,"foscam":["FosCam1","DCS942L","DCS934L"]
    //}
    // put proper shorcut names with same letter case asin wink app
    ,"tab_ui_shortcuts":["Shortcut 1","Shortcut 2","Shortcut 3","Shortcut 4","Shortcut 5","Shortcut 6"]
 },    
// !!!!DO NOT CHANHGE ANYTHING BELOW THIS LINE!!!
    storageModule: require("./couchstorage")
}

if (process.env.NODE_RED_USERNAME && process.env.NODE_RED_PASSWORD) {
    settings.adminAuth = {
        type: "credentials",
        users: function(username) {
            if (process.env.NODE_RED_USERNAME == username) {
                return when.resolve({username:username,permissions:"*"});
            } else {
                return when.resolve(null);
            }
        },
        authenticate: function(username, password) {
            if (process.env.NODE_RED_USERNAME == username &&
                process.env.NODE_RED_PASSWORD == password) {
                return when.resolve({username:username,permissions:"*"});
            } else {
                return when.resolve(null);
            }
        }
    }
}

settings.couchAppname = VCAP_APPLICATION['application_name'];


var storageServiceName = process.env.NODE_RED_STORAGE_NAME || new RegExp("^"+settings.couchAppname+".cloudantNoSQLDB");
var couchService = appEnv.getService(storageServiceName);

if (!couchService) {
    console.log("Failed to find Cloudant service");
    if (process.env.NODE_RED_STORAGE_NAME) {
        console.log(" - using NODE_RED_STORAGE_NAME environment variable: "+process.env.NODE_RED_STORAGE_NAME);
    }
    throw new Error("No cloudant service found");
}    
settings.couchUrl = couchService.credentials.url;

