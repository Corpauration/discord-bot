const fs = require('fs');
const {Permissions} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');
const {data_name} = require('../config.json');
const utils = require('../utils');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('listroleassigners')
	.setDescription('List all existing role assigners.'),
	async execute(interaction) {
		if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			fs.readFile(data_name, 'utf8', async function readFileCallback(err, dataJson) {
				if (err) {
					utils.log_to_console(err + ' :');
					console.log(err);
					await interaction.reply({
						content: 'An error occurred while reading : ' + data_name,
						ephemeral: true
					});
				} else {
					const json = JSON.parse(dataJson);
					let msg = '';
					if (Object.keys(json).length !== 0) {
						Object.keys(json).forEach(element => {
							msg += interaction.guild.channels.cache.find((r) => r.id === element.split(':')[0]).name + ' : ' + element.split(':')[1] + ' :\n';
							Object.keys(json[element]).forEach(subElement => {
								if (subElement !== Object.keys(json[element])[Object.keys(json[element]).length - 1]) {
									msg += '         ├ ' + subElement.split(':')[0] + ' : ' + json[element][subElement] + '\n';
								} else {
									msg += '         └ ' + subElement.split(':')[0] + ' : ' + json[element][subElement] + '\n\n';
								}
							});
						});
						utils.log_to_console('Successful call to listroleassigners.');
						await interaction.reply({content: msg, ephemeral: true});
					} else {
						await interaction.reply({content: 'No available role assigners.', ephemeral: true});
					}
				}
			});
		} else {
			await interaction.reply({content: 'You don\'t have access to this command.', ephemeral: true});
		}

	},
};