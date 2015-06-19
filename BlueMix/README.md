Steps to configure your bluemix node-red instance with basic authentication and add freeboard and pushbullet nodes (example for MS Windows workstation)

	 1. Please copy all files and folders to your local drive (for example c:\BlueMix)
	 2. Open manifest.yml file with any text editor
	 3. update values for  NODE_RED_USERNAME and  NODE_RED_PASSWORD: with any desired values.
	 4. Download bluemix cloudfoundry command line tool from https://github.com/cloudfoundry/cli/releases
	 5. open windows command line (cmd)
	 6. navigate to the directory where you extracted this folder content (cd c:\BlueMix)
	 7. type - cf api https://api.ng.bluemix.net
	 8. type - cf login -u <your ibm bluemix login id>
	 9. type your ibm bluemix password when promted
	10. Select proper workspace (by default you only have one)
	11. type cf push <your ibm bluemix application name>
	12. Deployment will start. Wait until it completes
	13. Navigate to <your ibm bluemix application name>.mybluemix.net and click on "Go to your Node-RED flow editor" enter uid and password you defined at step 2 when prompted.
        14. Start importing flows or creating your own.
