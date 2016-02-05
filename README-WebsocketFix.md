# Websocket Fix

When WinkCore and WinkIntegration are imported into the Wink Node Red app, Node Red incorrectly creates two websockets. 
These two websockets need to be re-combined into only one web socket.

To fix, click on your "Wink Integration" tab and scroll down until you get to the white comment node that says
"cloudant DB-------------------------" Below that comment box, scroll to the right and you'll see a green 
node that says `[ws] /ws/winkStat` -- double click this node.

A new window will open and the 2nd line will be a drop down. Click the down arrow and expand the drop down - 
select the first "/ws/winkStat" at the top of the list. Click Save/Update.

Next, go to your "hamburger menu" (the 3 horizontal line menu in the top right of the Node Red application) and select "View" -> "Configuration Nodes"

You'll now see two /ws/winkStat nodes. One should say (2) and one should say 0. Double click the node that says 0 and click "Delete"

Deploy your changes (be sure only "Modified Nodes" is selected in the Deploy drop down) and you'll be fixed.
