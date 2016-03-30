Example robots can be submitted through the (Wink Node Red Users Group on Facebook)[https://www.facebook.com/groups/WinkNodeRed/]. 

Each robot below are "if statements." Copy and paste the if statement into your Robot node to add it to your flow.

```javascript
// Scenario #1: Let's start with an 'easy' robot. In this case, I want to turn on some lights when a tripper opens. Note we have the name, old_state, and new_state in our condition statement. These are the 3 basic conditions. In subsequent scenarios we'll see more complex conditions and we'll really see how Wink Node Red shines!!
    if (changed.name=="Basement Door" && changed.old_state!=="Opened" && changed.new_state=="Opened" )
    {
        // So here is your basic structure for the action of your robots.
        // When creating new robots, copy the format below. You always want to "try" then "catch any errors"
        // Refer to other examples below where there's not as many comments which will be easier to copy and paste.
        // My three actions are to turn on Basement Stairs, turn on Basement Lights, and then send the note to the Event Log in Tablet UI.
        try {
            node.send(context.global.executeWinkCMD("Basement Stairs","light","on","100"));
            node.send(context.global.executeWinkCMD("Basement Lights","light","on","100"));
            node.send(context.global.send_ui_note('information',60000,'Robot Triggered - Basement Lights on when Door Opened',Math.floor(Math.random()*1000)));
        }
        catch(error){
            node.warn(error.message);
        }
    }
```
