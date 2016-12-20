This is version 1 of wirelesstag integration with WNR, as I learn more about WNR I will make this act more like the SmartThings integration.
For now you can get the sensor triggers into WNR to run your own WNR robots from sensor triggers.

Import the WNR Flow as a new flow.
Go to https://my.wirelesstag.net/eth/app.html#appListPage and login using your wireless tag username/password
Click Write Your Own App
Enter a unique description e.g. "mywnr.bluemix Send JSON to Wink Node Red when sensor triggered"
Enter your name as Author
I picked the Bell catagory
Tick the sensors with the numbers 12, 13, 21, and 72 at the end
Leave "This app is written in a general way; request publication of this app" unticked
Click Create/Update App
Click Get Link to Install 
Copy and Paste the link in a new tab
Pick the sensors you want to flow into WNR
Enter your WNR url "https://mywnr.mybluemix.net"
Use the API key you selected as your IFTTT - there are future plans to change this
Click Apply
Click Start next to the Kumo App in the list
Enjoy!
