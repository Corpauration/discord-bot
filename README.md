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
Step 4 : create a `creds.json` file in the `src/config/` folder (`touch src/config/creds.json`) and paste these contents : 
```json
{
  "token": ""
}
```
Step 5 : paste your discord bot token in the `creds.json` file

## Configuration
There are a few setting you can change in the `config.json` file :
<ul>
  <li>prefix : the prefix that will be added to any temporary voice channel</li>
  <li>trigger : the name of the channel that will act as the trigger for creating a temporary VC</li>
</ul>

## Debugging
From the root of the project, run `npm run dev`.

## Building for production
From the root of the project, run `npm run build`.

## Requirements
This bot was written with [Node.js](https://nodejs.org/) version 16.8.0 using [discord.js](https://discord.js.org/) version 13.1.0

## Author
Lucas DRAESCHER (draescherl@cy-tech.fr)