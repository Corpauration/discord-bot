const {data_name} = require('../config.json');
const fs = require('fs');
const utils = require('../utils');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		utils.log_to_console(`Ready ! Logged in as ${client.user.tag}`);
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
	},
};