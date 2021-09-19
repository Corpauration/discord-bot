const utils = require('../utils');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		utils.log_to_console(`Ready ! Logged in as ${client.user.tag}`);
	},
};