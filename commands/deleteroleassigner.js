const { SlashCommandBuilder } = require('@discordjs/builders');
const { data_name } = require('../config.json');
const fs = require('fs');
const utils = require('../utils');
const { Permissions } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('deleteroleassigner')
	.setDescription('Delete an existing role assigner.')
	.addStringOption(option => option.setName('channel_name').setDescription('The name of the channel in which the assigner exists.').setRequired(true))
	.addStringOption(option => option.setName('message_id').setDescription('The assigner\'s ID').setRequired(true)),
	async execute(interaction) {
		if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {

			const optionChannel = interaction.guild.channels.cache.find((r) => r.name === interaction.options.getString('channel_name'));
			if (optionChannel != null) {
				let optionMessage = optionChannel.messages.cache.find((r) => r.id === interaction.options.getString('message_id'));
				if (optionMessage != null) {
					fs.readFile(data_name, 'utf8', async function readFileCallback(err, dataJson) {
						if (err) {
							utils.log_to_console(err + ' :');
							console.log(err);
							await interaction.reply({
								content: 'An error occurred while reading : ' + data_name,
								ephemeral: true
							});
						} else {

							let json = JSON.parse(dataJson)
							delete json [optionChannel.id + ':' + optionMessage.id];
							optionMessage.delete();

							fs.writeFile(data_name, JSON.stringify(json), 'utf8', async function (err) {
								if (err) {
									utils.log_to_console(err + ' :');
									console.log(err);
									await interaction.reply({
										content: 'An error occurred while writing : ' + data_name,
										ephemeral: true
									});
								} else {
									await interaction.reply({content: 'The role assigner have been deleted', ephemeral: true});
									utils.log_to_console('Succefully deleteroleassigner {channel:' + optionChannel.id + ' message:' + optionMessage.id + '}');
								}
							});
						}
					});
				} else {
					await interaction.reply({content: 'Error this message id is not valid', ephemeral: true});
				}
			} else {
				await interaction.reply({content: 'Error this channel name is not valid', ephemeral: true});
			}
		} else {
			await interaction.reply({content: 'You don\'t have access to this command', ephemeral: true});
		}
	},
};
