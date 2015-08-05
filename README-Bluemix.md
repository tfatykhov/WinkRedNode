# How to create a cloud instance for Node-RED and Freeboard in the IBM Bluemix cloud

In the text that follows,
the string `MyWinkNodeRed` is used as the application name -- 
<b>you need to use a different name and change corresponding configuration lines with your name.</b><br>
<b>Keep this in mind as you read the documentation!</b>

## Creating the MyWinkNodeRed Application

If you haven't already, please signup for a free **IBM Bluemix** account at [https://bluemix.net](https://bluemix.net/):

<img src='images/01.png'/>


Log in to your account, and make sure that you're on the "Dashboard" --
Scroll down to "Applications" and click on "+ Create an App" and then click on "Web":

<img src='images/02.png'/>

Click on "Browse Boilerplates" -- and when the pop-up appears, click on "Browse Boilerplates" in the pop-up:

<img src='images/03.png'/>

Click on "Node-RED Starter" -- you may have to wait a while for the form in the right-hand column to finish loading:

<img src='images/04.png'/>

Enter the application "name" in the "Create an app" panel (e.g., "MyWinkNodeRed") --
the "host" will automatically be filled-in. Click on "Create":

<img src='images/06.png'/>

In approximately 30 seconds, the screen will change to "Your application is staging.":
Once that appears, scroll down and click on "Start Coding >" and then "Download Starter Code":

<img src='images/07.png'/>

Once downloaded and unzipped, you will have a folder named as your application:

<img src='images/10.png'/>

Wait about two minutes --
you'll see "Your app is running. [https://MyWinkNodeRed.mybluemix.net](https://MyWinkNodeRed.mybluemix.net)" -- 
click on the link to access your application:

<img src='images/09.png'/>

## Download and Configure the Cloud Foundry environment
Go to [https://github.com/cloudfoundry/cli/releases](https://github.com/cloudfoundry/cli/releases):

<img src='images/00.png'/>

Click on the link for the appropriate installer,
after it successfully downloads,
double-click on the installer program,
and then follow the steps.

Open your command line program (`cmd` on Windows, `iTerm` on Mac OS X, `xterm` on Linux, etc.) and
and run the `cf api https://api.ng.bluemix.net` command:

<img src='images/11.png'/>

Then run the 

        cf login -u your_ibm_bluemix_login_id

command,
and when prompted, enter your IBM Bluemix password.

## Configuring Your Application

### Editing three files
In the "MyWinkNodeRed" folder that was created,
there are three files to be edited.

* In `bluemix-settings.js`,
look for this line:

        functionGlobalContext: { },

    and replace it with these lines:

        functionGlobalContext: {
              WinkUser         : { uid : "your Wink username"
                                 , pwd : "your Wink password"
                                 }
            , BlueMixUrlBase   : "https://MyWinkNodeRed.mybluemix.net"
            , forecastIoApiKey : "your API key"
            , HomeLocation     : { lon : "the longitude of your home location"
                                 , lat : "the lattitude of your home location"
                                 }
            , FREEBOARD_TOKEN  : "pseudo-random-string"
            , IFTTT_TOKEN: "your IFTTT secret key"
        },

    to get an API key for `forecast.io` go [here](https://developer.forecast.io).
    to get an IFTTT token go to http://ifttt.com/maker and look for secret key strinkg
* In 'manifest.yml',
below the line:

          domain: mybluemix.net

    add these three lines:

          env:
            NODE_RED_USERNAME: another-pseudo-random-string
            NODE_RED_PASSWORD: and-another-pseudo-random-string

    e.g.,

          env:
            NODE_RED_USERNAME: zphiZvUMUsMFoyTUD9VkVyThDNV3Vh
            NODE_RED_PASSWORD: pZiMGaK8FtppasbhdPWr=JRPzh2vtn

    Note that indentation is important!

    When you're done the entire file should look something like:

        applications:
        - services:
          - MyWinkNodeRed-cloudantNoSQLDB
          - MyWinkNodeRed-MonitoringAndAnalytics
          disk_quota: 1024M
          host: MyWinkNodeRed
          name: MyWinkNodeRed
          command: node --max-old-space-size=384 node_modules/node-red/red.js --settings ./bluemix-settings.js -v
          path: .
          domain: mybluemix.net
          env:
            NODE_RED_USERNAME: pseudo-random-string-one
            NODE_RED_PASSWORD: pseudo-random-string-two
          instances: 1
          memory: 512M

* In `package.json`,
below the line:

        "node-red-node-cf-cloudant":"0.x",

    add this line:

        "node-red-node-pushbullet":"0.x",

    Also, below the line:

        "node-red-contrib-bluemix-hdfs":"0.x",

    add this line:

        "node-red-contrib-freeboard":"git://github.com/tfatykhov/node-red-contrib-freeboard.git",

    When you're done the entire file should look something like:

        {
            "name"         : "node-red-bluemix",
            "version"      : "0.4.20",
            "dependencies": {
                "when": "~3.x",
                "mongodb": "~1.4.x",
                "nano": "~5.11.0",
                "cfenv":"~1.0.0",
                "feedparser":"~0.19.2",
                "redis":"~0.10.1",
                "node-red": "0.x",
                "node-red-bluemix-nodes":"0.x",
                "node-red-node-cf-cloudant":"0.x",
                "node-red-node-pushbullet":"0.x",
                "node-red-contrib-scx-ibmiotapp":"0.x",
                "node-red-contrib-ibmpush":"0.x",
                "node-red-contrib-bluemix-hdfs":"0.x",
                "node-red-contrib-freeboard":"git://github.com/tfatykhov/node-red-contrib-freeboard.git",
                "node-red-nodes-cf-sqldb-dashdb":"0.x"
            },
            "engines": {
                "node": "0.10.x"
            }
        }

### Updating the application
Open your command line program,
change to the folder where the the folder named for your application was created,
and run the `cf push MyWinkNodeRed` command:

<img src='images/12.png'/>

## Fundamental Flows for Node-RED on Bluemix
Go to [https://MyWinkNodeRed.mybluemix.net](https://MyWinkNodeRed.mybluemix.net) and click on 
["Go to your Node-RED flow editor"](https://mywinknodered.mybluemix.net/red).

You will be prompted to enter the `NODE_RED_USERNAME` and `NODE_RED_PASSWORD` values
that you previously entered into `manifest.yml`.

Click on the three bars in the upper-right hand corner to get the menu,
select "Import > Clipboard",
copy the contents of [Flows/Bluemix/Bluemix-Monitoring.json](Flows/Bluemix/Bluemix-Monitoring.json)
into the pop-up window,
and click "OK".

Click on "Deploy". you will see information will start flow in debug window on right side of the screen (may need to swith to debug tab)

To start using Freeboard,
go to [https://mywinknodered.mybluemix.net/freeboard](https://mywinknodered.mybluemix.net/freeboard/),
and take a look at [README-Freeboard.md](README-Freeboard.md).

To start using IFTTT,
take a look at [README-IFTTT.md](README-IFTTT.md).

