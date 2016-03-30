Example robots can be submitted through the [Wink Node Red Users Group on Facebook](https://www.facebook.com/groups/WinkNodeRed/). 

Each robot below are "if statements." Copy and paste the if statement into your Robot node to add it to your flow.

```javascript
// Courtesy of Scott Rainey
// This robot turns a light bulb on when the front door opens and then fades the lightbulb off after 30 seconds.
if (changed.name=="Front Door" && changed.new_state=="Opened") //check if front door opens
    {
    if (context.global.winkState.light_bulbs['Right lamp'].powered===true)
    {
        var lrlamp = (context.global.winkState.light_bulbs['Right lamp'].brightness)*100; //set variable to current brightness of living room lamp

        WinkCMDmsg = context.global.executeWinkCMD("Right lamp","light","on","100"); //now turn light to 100% brightness
        node.send(WinkCMDmsg);

        var timerId = setTimeout(function()
        {WinkCMDmsg=context.global.executeWinkCMD("Right lamp","light","on",lrlamp); //turn same light back to previous brightness after 1 minute
        node.send(WinkCMDmsg)},30000);
    }
    else
    {
        WinkCMDmsg = context.global.executeWinkCMD("Right lamp","light","on","100"); //now turn light to 100% brightness
        node.send(WinkCMDmsg);

        var timerId = setTimeout(function()
        {WinkCMDmsg=context.global.executeWinkCMD("Right lamp","light","off"); //turn same light back to previous brightness after 1 minute
        node.send(WinkCMDmsg)},45000);
    }
    }
```

```javascript
// Courtesy of Ken Vermillion
//****** BEGIN PRESENCE BASED ROBOTS*******
	if(changed.name=="Ken" && changed.old_state===false && changed.new_state===true)  //check if Ken's presence is now detected
	{
    	if(context.global.winkState.sensor_pods.Katie.presence===true) //check if Katie is already home
    	{
       	 
        	node.warn("you've made it past the katie home kenny arrive check");
        	try {
        	WinkCMDmsg = context.global.executeWinkCMD("PRESENCE","shortcut"); //activate PRESENCE shortcut
        	node.send(WinkCMDmsg);
        	}
        	catch(error){
        	node.warn(error.message);
        	}
    	}   
	}
    
	if(changed.name=="Katie" && changed.old_state===false && changed.new_state===true) //check if Katie's presence is now detected
	{
    	if(context.global.winkState.sensor_pods.Ken.presence===true) //check if Ken is already home
    	{
       	 
        	node.warn("you've made it past the kenny home katie arrive check");
        	try {
        	WinkCMDmsg = context.global.executeWinkCMD("PRESENCE","shortcut");  //activate PRESENCE shortcut
        	node.send(WinkCMDmsg);
        	}
        	catch(error){
        	node.warn(error.message);
        	}   
    	}
	}
	//*******END PRESENCE BASED ROBOTS*******
```

```javascript
// Courtesy of Ken Vermillion
//*******BEGIN MOTION BASED ROBOTS
	if (changed.name=="Garage Door Open Too Long" && changed.new_state!==changed.old_state) //check if robot fires
	{
   	 
    	if(context.global.winkState.sensor_pods['Garage Motion'].motion===false) //check if garage motion sensor does not detect motion
    	{
      	 
        	try {
        	WinkCMDmsg = context.global.executeWinkCMD("Close Garage Sequence","shortcut");  //activate CLOSE GARAGE SEQUENCE shortcut
        	node.send(WinkCMDmsg);
        	}
        	catch(error){
        	node.warn(error.message);
        	}
    	}
	}
    
	if (changed.name=="Arrive Home Garage Notify" && changed.new_state!==changed.old_state)  //check if robot fires
	{
   	 
    	if(context.global.winkState.sensor_pods['Garage Motion'].motion===false)  //check if garage motion sensor does not detect motion
    	{
      	 
        	try {
        	node.warn("trying to run close garage sequence");
        	WinkCMDmsg = context.global.executeWinkCMD("After Presence Detected","shortcut"); //activate AFTER PRESENCE DETECTED shortcut
        	node.send(WinkCMDmsg);
        	}
        	catch(error){
        	node.warn(error.message);
        	}
    	}
	}
    
	if (changed.name=="Basement Motion" && changed.old_state===false && changed.new_state===true ) //if basement motion detected - turn basement lights on
	{
     	try {
        	WinkCMDmsg = context.global.executeWinkCMD("Basement","group","on","100");
        	node.send(WinkCMDmsg);
     	}
    	catch(error){
        	node.warn(error.message);
    	}
	}
	//*******END MOTION BASED ROBOTS*******//
```

```javascript
// Courtesy of Ken Vermillion
//*******BEGIN DOOR OPEN/CLOSED BASED ROBOTS*******
	if (changed.name=="Garage Door" && changed.old_state=="Closed" && changed.new_state=="Opened")
	{
    	node.warn("garage door has been opened");
    	var timerGrg = setTimeout(function()
        	{if(context.global.winkState.sensor_pods['Garage Motion'].motion===false)
        	{WinkCMDmsg=context.global.executeWinkCMD("Close Garage Sequence","shortcut");
        	node.send(WinkCMDmsg)}},30000);
	}
    
	if (changed.name=="Mudroom Door" && changed.old_state=="Closed" && changed.new_state=="Opened" ) //check if mudroom door has opened
	{
     	try {
        	WinkCMDmsg = context.global.executeWinkCMD("Mudroom","light","on","100");
        	node.send(WinkCMDmsg);
     	}
    	catch(error){
        	node.warn(error.message);
    	}
	}
    
	if (changed.name=="Mudroom Door" && changed.old_state=="Opened" && changed.new_state=="Closed" ) //check if mudroom door has closed
	{
     	try {
        	WinkCMDmsg = context.global.executeWinkCMD("Mudroom","light","off");
        	node.send(WinkCMDmsg);
     	}
    	catch(error){
        	node.warn(error.message);
    	}
	}
    
	if (changed.name=="Garage Entry Door" && changed.old_state=="Closed" && changed.new_state=="Opened") //check if garage entry door opens
	{
     	try {
        	WinkCMDmsg = context.global.executeWinkCMD("Garage","light","on","100");
        	node.send(WinkCMDmsg);
     	}
    	catch(error){
        	node.warn(error.message);
    	}
	}
    
	if (changed.name=="Front Door" && changed.new_state=="Opened") //check if front door opens
	{
    	if (context.global.winkState.light_bulbs['Living Room Lamp'].powered===true)
    	{
        	var lrlamp = (context.global.winkState.light_bulbs['Living Room Lamp'].brightness)*100; //set variable to current brightness of living room lamp
           	 
        	WinkCMDmsg = context.global.executeWinkCMD("Living Room Lamp","light","on","100"); //now turn light to 100% brightness
        	node.send(WinkCMDmsg);
       	 
        	var timerLmp = setTimeout(function()
        	{WinkCMDmsg=context.global.executeEffectCMD("fadeout","Living Room Lamp","light",lrlamp,100,30);
         	node.send(WinkCMDmsg)},30000);
    	}
    	else
    	{
        	WinkCMDmsg = context.global.executeWinkCMD("Living Room Lamp","light","on","100"); //now turn light to 100% brightness
        	node.send(WinkCMDmsg);
       	 
        	var timerLmp = setTimeout(function()
        	{WinkCMDmsg=context.global.executeWinkCMD("Living Room Lamp","light","off"); //turn same light back to previous brightness after 1 minute
         	node.send(WinkCMDmsg)},30000);
    	}
	}
    
	if (changed.name=="Garage Entry Door" && changed.old_state=="Opened" && changed.new_state=="Closed") //check if garage entry door has been closed
	{
   	if(context.global.winkState.sensor_pods['Garage Motion'].motion===false) //AND IF no motion detected - turn light off
    	{
        	try {
        	WinkCMDmsg = context.global.executeWinkCMD("Garage","light","off","100");
        	node.send(WinkCMDmsg);
         	}
        	catch(error){
            	node.warn(error.message);
        	}  
    	}
	}
	//*******END DOOR OPEN/CLOSE ROBOTS*******
```

```javascript
// Courtesy of Ken Vermillion
//*******BEGIN REMOTE BASED ROBOTS*******
	if (changed.name=="Master Bedroom Remote" && context.global.winkState.remotes['Master Bedroom Remote'].button_off_pressed===true) //Robot: if bottom button on MB remote pushed, activate Alexa Bedtime Shortcut
	{
    	node.warn("bedroom button pressed");
    	WinkCMDmsg = context.global.executeWinkCMD("Alexa Bedtime","shortcut");
    	node.send(WinkCMDmsg);
	}
    
	//*******END REMOTE BASED ROBOTS*******
```
