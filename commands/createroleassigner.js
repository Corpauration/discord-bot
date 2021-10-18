const {SlashCommandBuilder} = require('@discordjs/builders');
const {data_name, emojis_name} = require('../config.json');
const fs = require('fs');
const utils = require('../utils');
const {Permissions} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName('createroleassigner')
	.setDescription('Create a role assigner.')
	.addStringOption(option => option.setName('role_list').setDescription('List of roles (use @ notation).').setRequired(true))
	.addStringOption(option => option.setName('emoji_list').setDescription('Corresponding emojis.').setRequired(true)),
	async execute(interaction) {

		if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			if (interaction.options.getString('role_list') != null && interaction.options.getString('emoji_list') != null) {
				const optionsRoleList = interaction.options.getString('role_list').replace(/\s+|<|>|@|&/g, '').split(',');
				const optionsEmojiList = interaction.options.getString('emoji_list').replace(/\s+/g, '').split(',');

				if (optionsRoleList.length === optionsEmojiList.length) {
					let verify = false;
					let msg = (`Sélectionnez votre rôle :\n`);
					for (let i = 0; i < optionsRoleList.length; i++) {
						if (await testEmojis(optionsEmojiList[i], interaction) && interaction.guild.roles.cache.find((r) => r.id === optionsRoleList[i]) != null) {
							msg += `\n\t${optionsEmojiList[i]} -> ${interaction.guild.roles.cache.find((r) => r.id === optionsRoleList[i]).name}`;
						} else {
							verify = true;
						}
					}
					msg += `\n`;

					if (!verify) {
						await interaction.channel.send(msg).then(function (message) {
							optionsEmojiList.forEach(element => {
								message.react(element);
							});

							const obj = {};
							obj[message.channelId + ':' + message.id] = {};
							for (let i = 0; i < optionsRoleList.length; i++) {
								obj[message.channelId + ':' + message.id][interaction.guild.roles.cache.find((r) => r.id === optionsRoleList[i]).name + ':' + optionsRoleList[i]] = optionsEmojiList[i];
							}

							fs.readFile(data_name, 'utf8', async function readFileCallback(err, dataJson) {
								if (err) {
									utils.log_to_console(err + ' :');
									console.log(err);
									await interaction.reply({content: 'An error occurred while reading : ' + data_name, ephemeral: true});
								} else {
									const json = JSON.stringify(Object.assign(JSON.parse(dataJson), obj));

									fs.writeFile(data_name, json, 'utf8', async function (err) {
										if (err) {
											utils.log_to_console(err + ' :');
											console.log(err);
											await interaction.reply({
												content: 'An error occurred while writing : ' + data_name,
												ephemeral: true
											});
										} else {
											await interaction.reply({content: 'Role assigner created.', ephemeral: true});
											utils.log_to_console('Successfully created a role assigner | {channel:' + message.channelId + ' message:' + message.id + '}');
										}
									});
								}
							});

						});
					} else {
						await interaction.reply({content: 'An error occurred with these roles or emojis.', ephemeral: true});
					}
				} else {
					await interaction.reply({
						content: 'Error : the number of roles and emojis are not the same.',
						ephemeral: true
					});
				}

			} else {
				await interaction.reply({content: 'There was an error while running this command.', ephemeral: true});
			}
		} else {
			await interaction.reply({content: 'You don\'t have access to this command.', ephemeral: true});
		}
	},
};

async function testEmojis(emoji, interaction) {
	return new Promise(function (resolve) {
		let verify = false;
		fs.readFile(emojis_name, 'utf8', function readFileCallback(err, dataJson) {
			if (err) {
				utils.log_to_console(err + ' :');
				console.log(err);
				interaction.reply({content: 'An error occurred while reading : ' + emojis_name, ephemeral: true});
			} else {
				const json = JSON.parse(dataJson);
				Object.keys(json["emojis"]).forEach(element => {
					if (json["emojis"][element] === emoji) {
						verify = true;
					}
				});
			}
			resolve(verify);
		});
	})
}