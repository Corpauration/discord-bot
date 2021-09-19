# discord-bot
The bot we use to manage our discord server.

## Features
This bot can do a few things :
<ol>
  <li>Create temporary voice channels</li>
  <li>Manage roles (WIP)</li>
</ol>

## Installation
Step 1 : clone the git repository `git@github.com:Corpauration/discord-bot.git` <br>
Step 2 : move to the corresponding directory : `cd discord-bot` <br>
Step 3 : install dependencies : `npm install` <br>
Step 4 : create a `.env` at the root of the project and paste these contents : 
```bash
TOKEN=<bot-token-here>
CLIENT_ID=<bot-id-here>
GUILD_ID=<server-id-here>
```

## Configuration
There are a few setting you can change in the `config.json` file :
<ul>
  <li>prefix : the prefix that will be added to any temporary voice channel</li>
  <li>trigger : the name of the channel that will act as the trigger for creating a temporary VC</li>
</ul>

## Warning
Since discord.js version 13 it is possible to register slash (/) commands. The process to do so is a bit unique as in it requires the file `deploy-commands.js` to be run before the bot starts (`node deploy-commands.js`).

## Requirements
This bot was written with [Node.js](https://nodejs.org/) version 16.8.0 using [discord.js](https://discord.js.org/) version 13.1.0

## Author
Lucas DRAESCHER (draescherl@cy-tech.fr)