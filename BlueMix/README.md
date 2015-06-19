<b>Creating your inital cloud instance for Node-Red and IBM BlueMix cloud</b>

* First you need to signup for a free account at http://bluemix.net/
* Once you have that done  log in to your account and navigate to dashboard
* Click on Create an App, select WEB and then click on "Browse Boilerplates"
* On the next page look for Node-Red starter pack and select it.
* On the Node-Red configuration page just put your app name (MyWinkNodeRed for example) and click - Create
* You will be redirected back to your dashboard page. Just wait until your initial application is getting ready.
* Once it will be ready your can access it by navigating to http://MyWinkNodeRed.mybluemix.net in the browser.

Now we need to add freeboard node to your default instance.


<b>Configure your bluemix node-red instance with basic authentication and add freeboard and pushbullet nodes (example for MS Windows workstation)</b>
In order to add additional nodes to your cloud instance you need node name from npm (for example node-red-contrib-freeboard is the name for freeboard package)

 * Please copy all files and folders to your local drive (for example c:\BlueMix)
 * Open package.json file with text editor and add that package name to dependecies section. This dstribution already have it added so you can just check syntax or skip this step
 * Open manifest.yml file with any text editor
 * update values for  NODE_RED_USERNAME and  NODE_RED_PASSWORD: with any desired values.
 * Download bluemix cloudfoundry command line tool from https://github.com/cloudfoundry/cli/releases
 * open windows command line (cmd)
 * navigate to the directory where you extracted this folder content (cd c:\BlueMix)
 * type - cf api https://api.ng.bluemix.net
 * type - cf login -u <your ibm bluemix login id>
 * type your ibm bluemix password when promted
 * Select proper workspace (by default you only have one)
 * type cf push <your ibm bluemix application name>
 * Deployment will start. Wait until it completes
 * Navigate to <your ibm bluemix application name>.mybluemix.net and click on "Go to your Node-RED flow editor" enter uid and password you defined at step 2 when prompted.
 * Start importing flows or creating your own.
