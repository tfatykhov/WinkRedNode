# How to use Freeboard with Node-Red

First,
determine where Freeboard "lives" -- for example,
if you deployed Node-Red and Freeboard in the IBM Bluemix cloud,
then go to [https://mywinknodered.mybluemix.net/freeboard/](https://mywinknodered.mybluemix.net/freeboard/)

Freeboard is configured by 

* adding one or more "DataSources";

* adding one or more panes; and,

* for each pane, adding one or more widgets.

# An Example
Let's create a pane with a gauge widget that monitors the brightness of a light.

Click on "Add" under "DataSources",
select the "JSON" type,
enter "WinkData" as the "Name",
enter [https://mywinknodered.mybluemix.net/red/getGlobalDataJson](https://mywinknodered.mybluemix.net/red/getGlobalDataJson)
as the "URL":

<img src='images/Freeboard/SampleFreeboard1.png'/>

Click "Save":

<img src='images/20.png'/>

Here's how to create a gauge that shows the current brightness setting of a smart bulb.

Click on "Add Pane" and in the pane, click on "+":

<img src='images/Freeboard/CreateNewWidget_1.png'/>

Select "Gauge", enter a name for the gauge, click "+ DataSource", and then click on "WinkData":

<img src='images/Freeboard/CreateNewWidget_2.png'/>

Click on "Lights"

<img src='images/Freeboard/CreateNewWidget_3.png'/>

Click on "brightness", and then append "*100"
(In Wink,
brightness is a percentage from `0.0` to `1.0` -- since humans prefer to think of percentages from `0` to `100`,
we'll multiple Wink's value by 100):

<img src='images/Freeboard/CreateNewWidget_4.png'/>

Enter "%" for "Units":

<img src='images/Freeboard/CreateNewWidget_5.png'/>

Click on "Save":

<img src='images/Freeboard/CreateNewWidget_6.png'/>

Finally, click on "Save Freeboard".
Now bookmark the browser location, e.g.,

        https://mywinknodered.mybluemix.net/freeboard/#start-...

that's where the new Freeboard lives.

sample dashboard video - https://www.youtube.com/watch?v=gE8lXdsOkNI
