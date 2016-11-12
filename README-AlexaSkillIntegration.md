# Integrating Wink Node Red and a custom Alexa Skill

## Create Custom Skill for Alexa
Follow these instructions to create the skill you would like to use  
[Create your own scustom skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/steps-to-build-a-custom-skill "Skill instructions")
#### Skill Information
I've included images from my skill for reference. For my skill I have used the invocation name of "jarvis" so when I want to use my skill I start by saying "Alexa, ask Jarvis..." So whatever you put in "Invocation Name" calls the skill then whatever you put in the next section, "Intents" is what you waat "Jarvis" to do.  

![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/custom-skill-1.PNG?raw=true)
#### Interaction Model
You can add as many "intents" as you'd like to match the different things you want the skill to do. Under "Sample Utterances" add any combination of phrases you can think of using for each intent.

![image]  
#### Configuration
This is what I used for the "Configuration settings" mainly because I am not familiar with the "Lambda" settings. I used a random key generator to create the end location in the url (marked out in image)

![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/CustomSkill3.PNG?raw=true)  
#### SSL Certificate
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/CustomSkill4.PNG?raw=true)
## Now For Node Red
I started by creating a separate tab in Node Red for Alexa (just click the + to the right of your tabs) Here is what the tab and flows look.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/Alexatab.PNG?raw=true)  
I'm probably going to break this down too far but hopefully it is understandable.  
Start with an HTTP node. Double click and change to POST and for "URL" make it / plus whatever random string you used in the configuration section of the Alexa Skill creation.   
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa1.PNG?raw=true)  
The next node is a SWITCH node  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa2.PNG?raw=true)  
It needs to be configured as below  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa3.PNG?raw=true)





