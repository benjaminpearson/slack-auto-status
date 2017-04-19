# Slack Auto Status
A NodeJS application that monitors nearby WiFi networks to automatically update your slack status. Can be run indefinitely in the background using [pm2](https://github.com/Unitech/pm2) and by default checks every minute. Additionally you can override automated status updates by running command line method to manually set your slack status.

## Features
- Scan nearby networks to get a list of SSIDs
- Specify status updates based on nearby networks
- Add custom quick status update shortcuts in config
- Override the automated status updates with a custom status with optional duration
- Specify multiple slack API keys to have multiple accounts updated at once

## Getting started
- Download repo to a local directory (ie, ~/Sites/slack-auto-status)
- Install node version: `nvm install`
- Install PM2: `npm install pm2 -g`
- Install packages: `yarn`
- Duplicate `./config/config.example.json` to `./config/config.json` and add your [Slack API key](https://api.slack.com/custom-integrations/legacy-tokens), locations and any shortcuts you'd like.
- Get a list of nearby locations by running `yarn run scan`. You can then populate the SSIDs in `config.json`.
- Start ecosystem file: `yarn run daemon:start`

## Running at startup
Refer to [pm2 startup instructions](http://pm2.keymetrics.io/docs/usage/startup). In summary:
- `pm2 startup` then run the command it prints out
- Start the ecosystem above if you haven't already
- `pm2 save`
- It will now run at launch

## Make quick status updates
You can add an alias to your profile, bashrc, or zshrc etc to make posting new status updates quick and easy.
- Open profile `nano ~/.profile`
- Add alias `alias slackstatus="node ~/Sites/slack-auto-status/app.js update"` (check the path is correct for your directory location)
- Save and reload `. ~/.profile`
Now you can run `slackstatus meeting 1h` from any terminal. You could then go a step further and add more aliases such as `alias ssm="slackstatus meeting"` which allows you to quickly write `ssm 1h` from any terminal to tell your team you are in a meeting for the next hour.
