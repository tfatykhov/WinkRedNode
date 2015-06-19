# How to create a cloud instance for Node-Red and Freeboard in the IBM Bluemix cloud

## Creating the MyWinkNodeRed Application

If you haven't already, please signup for a free **IBM Bluemix** account at [http://bluemix.net/](http://bluemix.net/)
<img src='images/01.png'/>

Log in to your account, and make sure that you're on the "Dashboard"
<img src='images/02.png'/>

Scroll down to "Applications" and click on "+ Create an App" and then click on "Web"
<img src='images/03.png'/>

Click on "Browse Boilerplates" -- and when the pop-up appears, click on "Browse Boilerplates" in the pop-up
<img src='images/04.png'/>

Click on "Node-RED Starter"
<img src='images/05.png'/>

Enter the application "name" in the "Create an app" panel (e.g., "MyWinkNodeRed") --
the "host" will automatically be filled-in
<img src='images/06.png'/>

Click on "Create" --
in approximately 30 seconds, the screen will change to "Your application is staging."
<img src='images/07.png'/>

Wait about two minutes --
you'll see "Your app is running. [http://MyWinkNodeRed.mybluemix.net](http://MyWinkNodeRed.mybluemix.net)"
<img src='images/08.png'/>

Click on the link to access your application
<img src='images/09.png'/>


## Adding the Freeboard node module
To add an additional node package to your IBM Bluemix cloud instance,
the steps are:
* find the node package
* fetch the package
* set environment variables
* upload the package

## Configuring the Cloud Foundry environment
However, there's a *once-only* step to be performed --
installing and configuring your Cloud Foundry environment on your computer.

Go to [https://github.com/cloudfoundry/cli/releases](https://github.com/cloudfoundry/cli/releases)
<img src='images/10.png'/>

Click on the link for the appropriate installer,
after it successfully downloads,
double-click on the installer program,
and then follow the steps.

### Finding the node package
To add the freeboard node module,
go to [http://flows.nodered.org/](http://flows.nodered.org/) and enter "freeboard" into the search window
<img src='images/11.png'/>

Click on the "node-red-contrib-freeboard" box
<img src='images/12.png'/>

### Fetching the package
Under "Installation",
you'll see

        npm install node-red-contrib-freeboard

That's the command you'll run on your computer -- this assumes that you have the `npm` command installed on your computer.
If so, great!
After running `npm`,
you'll see a folder called `node_modules` has been created,
and within it is the folder you want
<img src='images/13.png'/>

If you want to install `npm` on your computer,
please read [this](http://blog.npmjs.org/post/85484771375/how-to-install-npm),
follow the steps and then run the `npm install` command above.

If you do not wish to use `npm` on your computer, you can fetch via _github_ --
notice that in the "Node Info" box, there is a link to [view on npm](https://npmjs.org/package/node-red-contrib-freeboard) --
click on that link
<img src='images/14.png'/>

Click on the [https://github.com/urbiworx/node-red-contrib-freeboard](https://github.com/urbiworx/node-red-contrib-freeboard)
link in the right-hand column
<img src='images/15.png'/>

Click on "Download ZIP" in the right-hand column -- this will create a folder called "node-red-contrib-freeboard-master"
<img src='images/16.png'/>

### Setting the Environment Variables
Go to your IBM Bluemix dashboard
<img src='images/19.png'/>

Click on the _rocketship_ icon for your application
<img src='images/20.png'/>

Click on "Environment Variables" in the left-hand column, and then click on "User-Defined"
<img src='images/21.png'/>

Add and save two environment variables,
`NODE_RED_USERNAME` and `NODE_RED_PASSWORD`,
these will be used to log into your Freeboard
<img src='images/22.png'/>

### Uploading the Package
Open your command line program (`cmd` on Windows, `iTerm` on Mac OS X, etc.) and
change to the folder where the the freeboard node module was fetched,
and run `cf api https://api.ng.bluemix.net`
<img src='images/17.png'/>

Then run `cf login -u your_ibm_bluemix_login_id`

When prompted, enter your IBM Bluemix password.
You'll be asked to select a workspace -- there should be only one, so select that.

Finally, run `cf push MyWinkNodeRed`
<img src='images/18.png'/>


Go to [http://MyWinkNodeRed.mybluemix.net](http://MyWinkNodeRed.mybluemix.net) and click on "Go to your Node-RED flow editor"

You will be prompted to enter the `NODE_RED_USERNAME` and `NODE_RED_PASSWORD` values that you entered into `manifest.yml`

### Next Steps

 * Start importing flows or creating your own.
 * freeboard will be accessible via http://your_ibm_bluemix_application_name.mybluemix.net/freeboard
