# Alarm Keypad



This is a flow that creates a keypad for code entry that can be used for most commands but in this case it is used for alarm disarming by multiple family members. By intergating Pushbullet and IFTTT it also allows for an emergency code to be entered that will send out PB notifications as well as emails to notify people of a possible emergency. I have an old smartphone mounted by my door with screen alays on that my family uses as a keypad. 

IMPORTANT- If someone knows your url they **can** find this dashboard as well. At this time it is NOT password protected but hopefully one of us will get that straight very soon.

![alt text][keypad]



# As far as I know you must be using Node Red v15+

The basic flow is self explanatory and can be recreated based on the image of my flow. If you have the latest version of node red the dashboard nodes should be available already in your palette but if they are not the installation can be found [here][git-repo-url]. 

The flow looks like this but obviously can be modified to fit your needs.
![alt text][keypadflow]

The column of Button nodes contain where I want them on my keypad, in this example I want the "1" to be in the Group "Keypad Left" in the "[Alarm]" tab of my dashboard. The location is easier to do once the flow is completely built from the dashboard config tab in the right of the editor (where debug is there should be a dashboard option).
![alt text][buttonEdit]

All of these buttons go to a "Join" node except for teh "Enter" button which first passes through a "Template" node which sets the property to "msg.complete" and the body is just "return;". This is the trigger for the join node to pass the message along.
![alt text][join]

The "Enter" button is a little different as I have it's Payload set as e
![alt text][enter]

From the Join node we go to a switch node. I use the switch node to cancel and incorrect(typo) entry in the panel. The switch node is set for three outputs. The first two are for if the paylod it received contains an * or # it basically stops there. If it does not it continues on to the next switch node which drops the "e" that is in the current message from the "Enter" button.
![alt text][switch]
![alt text][dropE]

From the Drop E switch we go to the main switch that checks the pin numbers and directs the response of the system.
![alt text][mainSwitch]

The main switch checks for the proper code and forwards it out the proper output. For a more simple system you could use one common code and simply go from there to your actions but I have it set up so that each member has their own code so that I get a notification via PB about who just entered a code. I have the "otherwise" output letting me know that an unknown code was entered into the keypad.

Each correct code goes to that person's respective Template node which contains a plain text message that is then passed to a PushBullet node.
![alt text][template]

And each correct code goes to a function node which tells the system what you want to happen if that code is entered. In my case I disarm my alarm using teh global variable context.global.alarmArmed (on/off)
![alt text][armed]

The "Emergency" Function node below the "alarm Off" node does whatever you want to happen if teh emergency code is entered. That may be nothing, maybe sound the alarm, or in my case it still disarms the alarm but it also turns on ALL lights in the house.

The "Unknown Code" function node checks if(msg.payload=="1111"||msg.payload=="2222"|| so on and so on then return false; but if not make msg.payload "unknon code entered" and it sends that message to pushbullet.

The "EmergEmail" function node only contains return msg; and it is just a trigger for the http node that folows. This http node is a POST to IFTTT which triggers the Applet you must create in IFTTT. In my case it sends out several emails.
![alt text][Emerg]

I notified everyone that is on the list of recipients of the system and sent a test email so that they would know what to expect. My email may be a little overboard but I wanted them to know exactly what I wanted them to do and provide them with information to pass along.
![alt text][email]

I'm sure that there is an easier or "better" way to do this but this is the way I did it and hopefully it will help others set theirs up and expand the capabilities of WNR even further. 


 [git-repo-url]: <https://github.com/node-red/node-red-dashboard>
[keypad]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmKeypad.png "Alarm Keypad"
[keypadflow]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmKeypadFlow.png "Alarm Keypad Flow"
[buttonEdit]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmButtonEdit.png "One Button"
[join]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/alarmJoinNode.PNG "Join"
[enter]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmEnter.PNG "Enter"
[switch]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmSwitch.png "Switch"
[dropE]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmDropE.png "Drop E"
[mainSwitch]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmMainSwitch.png "Main Switch"
[template]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmTemplate.png "Template"
[armed]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmDisarm.png "Disarm"
[emerg]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmEmPB.png "Emergency"
[email]: https://github.com/tfatykhov/WinkRedNode/blob/master/images/AlarmEmEmail.png "Email"

