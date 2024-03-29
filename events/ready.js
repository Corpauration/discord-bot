const {data_name} = require('../config.json');
const fs = require('fs');
const utils = require('../utils');
const express = require('express');

const app = express();
const port = 8080;

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		utils.log_to_console(`Ready ! Logged in as ${client.user.tag}`);
        client.user.setActivity("Powered by CleverCloud!")

		fs.readFile(data_name, 'utf8', async function readFileCallback(err, dataJson) {
			if (err) {
				utils.log_to_console(err + ' :');
				console.log(err);
			} else {
				const json = JSON.parse(dataJson);
				for (const element of Object.keys(json)) {
					await client.channels.cache.get(element.split(':')[0]).messages.fetch(element.split(':')[1]).then(message => {
						console.log('Retrieved from cache : ', message.id);
					}).catch(console.error);
				}
			}
		});

        // The app needs to be listening on port 8080 so that Clever Cloud can healthcheck
        app.get('/', (req, res) => {
            res.send('Bot is alive!');
        });

        app.listen(port, () => {
            utils.log_to_console(`Webserver up on port ${port}.`);
        });
	},
};
