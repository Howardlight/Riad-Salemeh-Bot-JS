# Riad-Salemeh-TS
Riad Salemeh JS is a Javascript version of the bot Riad Salemeh

It allows users to monitor the LBP to USD rate by Webscraping

The Website used as a source is www.lbprate.com



If you want to invite the bot to your server [Click here](https://discord.com/api/oauth2/authorize?client_id=826815896718540850&permissions=2147535872&scope=bot%20applications.commands) 
## Usage
After cloning the Repo, you must install all npm dependencies

Open a Terminal in the root folder and use the following command:
```bash
npm install
```

Once that's done you must create a .ENV file in the same folder as your package.json

This file will contain your TOKEN

Contents of the file should look like this
```
TOKEN="YOURBOTTOKEN"
```
After creating the .ENV file, open the config.json file and change the PREFIX to your liking.

Now run the bot by using the command:
```bash
npm run start
```
Finally you should see in your terminal 
```
Logged in as [botName]! | [botID]
```
Once you have the bot Running, Check the Help command
