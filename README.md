IOS Build and submit process -

Prebuild (this is only necessary as it stopped registering the change in version number)
Build
Submit to Testflight/App store

Instructions:

1. go to app.json, and increment version number (ie 1.1.1 to 1.1.2)
2. in console run

npx expo prebuild --platform ios

3. once it’s finished, in console run

npx eas build
select ios
Log in with apple account when prompted and let it run for a while,
The build details link will take you to the page where you can monitor the process better
Drink coffee, this can take 5-20 mins (you can check that the version number being built matches the one you want, as if this is didn’t update you won’t find out until the near the end of the submit process when it fails)
Once that’s done, in the console run

npx eas submit
select ios
log in again
Select a build to run from EAS
Choose the most recent build
Make a coffee, this might take 20 seconds, might take 20 mins, not sure what causes the difference time for this.
Follow the appstoreconnect link
Internal testing aka Supertusch staff is automatically shared, but any external testers will need to be manually added - it might also take a short while for the new build to be fully processed and show up in the system here (refresh to check)
Once it does under groups click the + symbol to add the testers you want for this version.
In the message box add the changes, anything to be aware of etc etc,
hooray!
