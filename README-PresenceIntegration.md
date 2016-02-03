# Presence Integration with Wink Node Red, Life360, and IFTTT

So now you have Wink Node Red up and running and it's time to figure some various things you can do with the app.
One of the nice built-in flows with Wink Node Red is Presence. To use Presence, we need to pass a JSON request 
into the Wink Node Red application using an HTTP POST request. There's many different ways we can do this,
but I found the easiest of which is using Life360 and IFTTT.

#### Life 360 Setup

Once Life 360 is installed, you'll need to have your home location saved in the app so it knows when you're home or not.
To save your home in the app, click the 3 line "hamburger" menu on the left side of the Life 360 app, click `Places` and then click
`Add Place`. Follow the steps to add your home to the saved places.


#### IFTTT Setup

If you don't already have an account with IFTTT, head on over to [IFTTT.com](http://www.ifttt.com/) and create a new account.

Once your account is created, we need to connect two channels: Life360 and Maker Channel. When you connect your Maker channel, you
will get a token. That token will go into the IFTTT Token field in the `Configuration` tab on the Wink Node Red UI.


- Create a new recipe and select Life360 as the trigger. Select arrival as the trigger and then select your home location from the drop down
menu. 
- For the action, select the Maker channel and use the following parameters:
  - `URL`: `http://MyWinkNodeRed.mybluemix.net/red/presence` ***Change MyWinkNodeRed to your application name***
  - `Method`: `POST`
  - `Content Type`: `application/json`
  - `Body`: `{"iftttkey":"(your maker channel IFTTT key)","name":"(name of person)","home":"yes"}`
  
Click save and your first recipe is created! Repeat the previous steps, but have the trigger be when you LEAVE, and change "home":"yes" to "home":"no" respectively.


That's it! Next time you leave your house, Life360 should trigger IFTTT to send the web request to your Wink Node Red app to show that you're away.
