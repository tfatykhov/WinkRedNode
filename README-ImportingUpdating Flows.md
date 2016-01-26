# Importing and Updating Flows in Node Red
## Initial Node Red Setup - Flow Import:
Once Node Red is set up, you'll need to import flows into your Node Red application. Browse to your app's webpage and log into the Node Red application. The Node Red application URL will be either `http://localhost:1880/` or `http://YourWinkNodeRed.mybluemix.net/red/#`

Next, we need to import some flows into Node Red.

##### winkCore:

1. At the top of Node Red will be a tab, double click it and change the name of the tab to `WinkCore`.
2. Browse in a new tab to the following [winkCore.json flow](https://github.com/tfatykhov/WinkRedNode/blob/master/Flows/Bluemix/winkCore.json)
3. In that page, highlight all of the text in the `winkCore.json` file and copy to your clipboard
4. Return to Node Red, click the 3 line "hamburger menu" in the top right, click `Import` and then `Clipboard`
    ![Menu, Import, Clipboard](http://i63.tinypic.com/jhtzdu.png)
5. Paste the `winkCore.json` text into the window that pops up and click OK. **It can sometimes take a little while for the import**
6. Next you'll see the imported flow in your winkCore tab's workspace. Drag the flows to the top left and click again to drop the flows in place.

#####  winkIntegration:

1. Create a new tab in your Node Red application by clicking the "+" symbol on the tab bar.
2. Name your new tab `winkIntegration`
3. Browse in a new tab to the following [winkIntegration.json flow](https://github.com/tfatykhov/WinkRedNode/blob/master/Flows/Bluemix/winkIntegration.json)
4. In that page, highlight all of the text in the `winkIntegration.json` file and copy to your clipboard
5. Return to Node Red, click the 3 line "hamburger menu" in the top right, click `Import` and then `Clipboard`
    ![Menu, Import, Clipboard](http://i63.tinypic.com/jhtzdu.png)
6. Paste the `winkIntegration.json` text from your clipboard into the window that pops up and click OK. **It can sometimes take a little while for the import.**
7. Next you'll see the imported flow in your winkIntegration tab's workspace. Drag the flows to the top left and click again to drop the flows in place.

##### winkFreeboards:

Repeat steps 1 through 7 from `winkIntegration`, but instead using the flow from [winkFreeboards.json](https://github.com/tfatykhov/WinkRedNode/blob/master/Flows/Bluemix/winkFreeboards.json)

##### tabletUI:

Repeat steps 1 through 7 from `winkIntegration`, but instead use the flow from [tabletUI.json](https://github.com/tfatykhov/WinkRedNode/blob/master/Flows/Bluemix/tabletUI.json)

When all 4 tabs have been created and imported, click the down arrow for `Deploy` in the top right of Node Red, then select `Modified Nodes` - in my opinion, this is better than leaving   `Full` selected. Once `Modified Nodes` is selected, click the `Deploy` button.
![Modified Nodes](http://i64.tinypic.com/11mclyw.png)


Click the `Debug` tab on the right side of the Node Red application and watch as the data is imported into your Node Red app.
![Debug tab](http://i67.tinypic.com/verpsw.png)

## Updating existing flows:

To update existing flows, use the same method as described above to import flows. But instead of creating new tabs, go to each tab, use `control+A` on your keyboard to select all, and then click `delete` on your keyboard to remove all the flows from the tab. Then follow the steps above for each respective tab.
