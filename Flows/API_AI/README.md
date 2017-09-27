
# Integrating Wink Node Red and a custom "Action on Google" using API.AI
This will detail step by step how to import a prebuilt "Assistant Action" and how to keep it private (ie. you can use the Action in your own Google Home device, but it will not be publicly available).
The idea is to create an flow for wink node-red (webhook) that is triggered by an Action built with API.AI.  
## 1)API.AI
API.AI is a development tool for conversational end points. It allows to create a natural language interactions action for Google Home.
### 1.1)Create an account
You must create the account with the same Google email that you use to control your Google Home.
* Create an account on [API.AI](https://api.ai/):

### 1.2)Create Agent
Once we have signed up, we will be taken straight to the Api.ai interface where we can create our virtual AI assistant. Each assistant we create and teach specific skills to is called an “agent” in Api.ai. So, to begin, we create our first agent by clicking the “Create Agent” button on the top left hand side:
<img src='/images/createAgent2.png'/>
On the next screen, we enter in our agent’s details, including:
* Name: This is just for your own reference to differentiate agents in the api.ai interface. You could call the agent anything you would like, (I chose WinkNodeRed).
* Description: A human readable description so you can remember what the agent’s responsible for. This is optional and might not be needed if your agent’s name is self-explanatory.
* Language: The language which the agent works in. For this tutorial, we will be choosing English.

When you have input your agent’s settings, choose “Save” next to the agent’s name to save everything:

### 1.3)Import Agent
Download the following file which is a prepopulated Agent for the wink node-red interface.  This file will be imported as described.
* [winkNodeRed_0_2.zip](winkNodeRed_0_2.zip)
* In "Agent Setting"  Click on "Export and Import" and select "Import from zip"

<img src='/images/importAgent.jpg'/>

### 1.4)Finding your Api.ai API keys
The API keys we will need are further down on this agent page. Scroll down and you will find the “API keys” section. Copy and paste the “Developer access token” somewhere safe. This will be need to make queries to the Wink Node Red (context.global.googleHomeKey):

<img src='/images/agentAPIKeys.png'/>

### 1.5)Connect your API.AI action to your webhook
* Open ‘Fulfillment’ window on the right panel.
* Copy the URL of your application ‘https://your.mybluemix.net/red/googleActions’ to the URL field in API.AI.
* Leave "BASIC AUTH" blank
* Fill in "HEADERS" as show
* Set to "ENABLED"
* Save the Fulfillment.
* In any relevant Intent, enable the Fulfillment for the response: open ‘Intents’ window, open the intent that you want to connect, scroll down to ‘Fulfillment’ section, check “Use webhook”.
* Make sure all domains in the ‘Domains’ window are turned off.

<img src='/images/fulfillment.png'/>

## 2)Node-Red
The behavior of the Assistant when triggered by an Intent.  For example, what should the Assistant do when you ask “Turn On the Bedroom light”. API.AI recognize the words ‘On’(@command), and ‘Bedroom’(@winkName) but we need an application that process those words,  carry out the command and give us a responce. This is called a webhook. 

* Create new tab  - give it a meaningful name (Google Home Integration)
* Import from clipboard - [API_AI_webhook.json](API_AI_webhook.json)
* Set Global Defines - context.global.googleHomeKey="your developer access token";
* Deploy flow

Details of the "Process Request" function node will be added at sometime in the future that I can find the time to write it up.

## 3)Test Integration API.AI=>Node-Red=>API.AI
We can now test out our new Agent by executing the "update my devices" Intent. 
<img src='/images/updateDeviceIntent.jpg'/>

Click on the "Entities" selection on the left pane and type the test statement "update devices" into the test console on the right.
<img src='/images/testUpdateDevices.jpg'/>

The agent responds back with the number of wink devices WNR detected.    
<img src='/images/newDevices.jpg'/>

Clicking on the @winkName entity should display all of your wink devices.  The left column is the winkName and the right is synonyms that you can add to.
<img src='/images/winkNameEntity.jpg'/>

Again Details of the Intents and Enities will be added at sometime in the future that I can find the time to write it up.  I would suggest reading [Get started in 5 steps](https://docs.api.ai/docs/get-started)

## 4)Enable Actions on Google
* In the API.AI console, select Integrations in the left-hand panel.
* Enable the toggle switch on the Actions on Google card, as the following example shows:
<img src='/images/enableActions.jpg'/>

After you have enabled Actions on Google, you can configure your Conversation Action to prepare the Draft for testing
