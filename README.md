# WinkRedNode
Set of sample flows that shows how to use node-red and Quirky Wink api to automate home

In order to utilize this repository you need to have following:

 1. Working version of Node-Red instance - http://nodered.org/. Also some basic knowledge on node-red functions and usage.
 2. freeboard node installed (required to utilize dashboards). Optional. (http://flows.nodered.org/node/node-red-contrib-freeboard)
 3. Wink API key

The way I set it up for now - each txt file in Flows subfolder is a text representation of a flow or set of flows for node-red. 
Please open the file and copy all it contents to the clipboard. Go to your Node Red flow editor, clink on 3 bars icon at the top right corner and select Import - Clipboard. This operation will paste the flow to the editor window. 

List of flows:

1. InitializeWinkApi.txt - First flow that will be used to request authorization token from wink. You need to edit GEtOAuthTocken function and add yuor credentials and Wink API key. Inject node is configured to run every 24 hours. You need to manually start it by clicking on the "start" button of inect node first.

2. SampleWebServices.txt - this set of flows will give you example of how other application can communicate with your node-red app wia REST API. It has a comments node with more details.
