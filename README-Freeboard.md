# How to use Freeboard with Node-Red

First,
determine where Freeboard "lives" -- for example,
if you deployed Node-Red and Freeboard in the IBM Bluemix cloud,
then go to [https://mywinknodered.mybluemix.net/freeboard/](https://mywinknodered.mybluemix.net/freeboard/)

and under "DataSources" click on "Add".

Select the "JSON" type,
enter "WinkData" as the "Name",
enter [https://mywinknodered.mybluemix.net/red/getGlobalDataJson](https://mywinknodered.mybluemix.net/red/getGlobalDataJson)
as the "URL":

<img src='images/Freeboard/SampleFreeboard1.png'/>

Click "Save":

<img src='images/20.png'/>

Here's how to create a gauge that shows the current setting of a smart bulb.

Click on "Add Pane" and in the pane, click on "+":

<img src='images/Freeboard/CreateNewWidget_1.png'/>

Select "Gauge", enter a name for the gauge, click "+ DataSource", and then click on "WinkData":

<img src='images/Freeboard/CreateNewWidget_2.png'/>

Click on "Lights"

<img src='images/Freeboard/CreateNewWidget_3.png'/>

Click on "brightness", and then append "*100"

<img src='images/Freeboard/CreateNewWidget_4.png'/>

Enter "%" for "Units":

<img src='images/Freeboard/CreateNewWidget_5.png'/>

Click on "Save":

<img src='images/Freeboard/CreateNewWidget_6.png'/>

Finally, click on "Save Freeboard".
Now bookmark the browser location, e.g.,

        https://mywinknodered.mybluemix.net/freeboard/#start-...

that's where the new Freeboard lives.
