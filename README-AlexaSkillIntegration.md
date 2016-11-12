# Integrating Wink Node Red and a custom Alexa Skill

## Create Custom Skill for Alexa
Follow these instructions to create the skill you would like to use  
[Create your own custom skill](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/overviews/steps-to-build-a-custom-skill "Skill instructions")
#### Skill Information
I've included images from my skill for reference. For my skill I have used the invocation name of "jarvis" so when I want to use my skill I start by saying "Alexa, ask Jarvis..." So whatever you put in "Invocation Name" calls the skill then whatever you put in the next section, "Intents" is what you want "Jarvis" to do.  

![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/custom-skill-1.PNG?raw=true)
#### Interaction Model
You can add as many "intents" as you'd like to match the different things you want the skill to do. Under "Sample Utterances" add any combination of phrases you can think of using for each intent.

![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/customskill2.PNG?raw=true) 
#### Configuration
This is what I used for the "Configuration settings" mainly because I am not familiar with the "Lambda" settings. I used a random key generator to create the end location in the url (marked out in image)

![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/CustomSkill3.PNG?raw=true)  
#### SSL Certificate
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/CustomSkill4.PNG?raw=true)
## Now For Node Red
I started by creating a separate tab in Node Red for Alexa (just click the + to the right of your tabs) Here is what the tab and flows look like.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/Alexatab.PNG?raw=true)  
I'm probably going to break this down too far but hopefully it is understandable.  
Start with an HTTP node. Double click and change to POST and for "URL" make it / plus whatever random string you used in the configuration section of the Alexa Skill creation.   
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa1.PNG?raw=true) 
The next node is a SWITCH node  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa2.PNG?raw=true)  
It needs to be configured as below  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa3.PNG?raw=true)  
Next is another SWITCH node named "Intents". **This switch node is connected to the previous one from the second slot which is the "Intent Request" slot**  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa4.PNG?raw=true)  
The Intents node will have the same number of outputs as you created in your Alexa skill.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa5.PNG?raw=true)  
**From this point everything is very customizable depending upon what you want your skill to do. I don't use Alexa to send commands to WNR per se, I mostly use it to change variable states which basically triggers WNR events. For the next section I am going to show how to set up a variable change and I will also show how to do a status report.**
#### Bedtime Mode
Basically I have an event in my Schedules that sets my home to "Bedtime Mode" if bedtimeEvent is true.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa6.PNG?raw=true)  
Since my "Bedtime" intent is the fifth one on my intents node I add a FUNCTION node, name it Bedtime, and connect it to the fifth slot on the Intents Node.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa7.PNG?raw=true)  
I edit this node and put the command to change the global variable bedtimeEvent to true  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa8.PNG?raw=true)  
Now add a TEMPLATE node. This is where you can get creative with Alexa's voice responses.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa9.PNG?raw=true)  
When I say "Alexa, tell Jarvis I am going to be" she changes the bedtimeEvent variable to true and responds "Good night, I have prepared the house for bedtime mode"  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa10.PNG?raw=true)  
Next is a TEMPLATE node named Format Speech and all of your intent nodes combine back into this template node(see first image).  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa11.PNG?raw=true)  
This TEMPLATE node can be formatted a couple of ways.  
This format simply passes through whatever was in the previous template for voice output from Alexa.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa12.PNG?raw=true)  
This format is a little more complex (you only have to type it once though) and it passes the previous node info but it also generates a card in the Alexa app.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa13.PNG?raw=true)  
*just copy and paste the below and change the title to whatever you are using*
```
{
  "version": "1.0",
  "response": {
    "outputSpeech": {"type":"PlainText","text":"{{payload}}"},
    "card": {
      "type": "Simple",
      "title": "Jarvis",
      "content": "{{payload}}"
    }
  }
}
```

After the above Template node simply add a JSON node followed by an HTTP RESPONSE node. Neither of these nodes need to be edited.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa14.PNG?raw=true)  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa15.PNG?raw=true)  
**That's it for bedtime event!**  
#### Status Report  
The status report node comes off of my first intent slot and splits. I am checking four things in my status report; lights, doors, windows, and alarm status. I want all four of these things to come out as a natural sentence from Alexa so I have to check for the status of these things, add language that makes the sentence flow correctly, and add delays to make sure that each thing is said in the correct order.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa16.PNG?raw=true)  
My order is Lights---doors---windows---alarm status  
I add a FUNCTION node called Lights and connect it to the first Intent slot. This node contains the following which gives the number of lights on or off in the system.  
```
msg.payload=context.global.winkState.groups['@lights'].powered.true_count+ " lights on ";
return msg;
```  
I then add a DELAY node and edit it to delay 250 milliseconds. 
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa17.PNG?raw=true)  
The output for the delay node goes to a FUNCTION node named Doors that contains the following:  
```
msg.payload=context.global.winkState.groups['@door_sensors'].opened.true_count+ " doors open  ";
return msg;
```
I do the same as above for nodes for Windows setting the delay to 500 milliseconds and using this code to check for open windows.
```
msg.payload=context.global.winkState.groups['@window_sensors'].opened.true_count+ " windows open and";
return msg;
```  
The alarm status is a little more. I add a DELAY node with a one second delay then a FUNCTION node named Alarm Status. This function node contains  
```
if(context.global.alarmArmed=="on")
{
    msg.payload="armed";
}
else
{
    msg.payload="not armed";
}
return msg;
```  
This is going to output either "armed" or "not armed" so I then add a TEMPLATE node that adds the word "Your alarm system is" then whatever the above payload was to make it a complete sentence.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa18.PNG?raw=true)  
All of these nodes Lights, Doors, Windows, and Alarm Status Template node go into a JOIN node which is formatted as below.  
![image](https://github.com/tfatykhov/WinkRedNode/blob/master/images/alexa19.PNG?raw=true)  
This JOIN node does not output anything until it has received four inputs. This kind of gets rid of the delay that we created earlier in regard to output and allows for everything to go together as a coherent sentence. This JOIN node then goes into the same Format Speach node that everything else goes into.  

It is important to note for speach output the spaces and words I used in each of the functions for checking the doors, windows, and lights. I have the delays and phrases set up so that once everything reaches the JOIN node that it falls in line as a sentence that makes sense. For example the Windows function is the next to last output so it outputs the number of windows open(literally just a number) then " windows open and" This allows for Alexa to say " X lights on X doors open X windows open and your alarm system is X.

Hopefully all of this makes sense. I cobbled a bunch of stuff together from the internet and and borrowed pieces of code from here and there to get this working. I use this a lot and rarely have a problem but I do know that the main error I hear about is that if Alexa isn't quite sure which intent you called for she will just pick one for you. This should give everyone the basic concept and structure for creating a custom skill and integrating it with WNR. There are many more possibilities to this and you CAN use this to send commands to WNR but that would be a Brian Olsen question as I think he modified this to do that. I use a lot of variables rather than individual commands.













