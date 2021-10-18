const { SlashCommandBuilder } = require('@discordjs/builders');
const { data_name } = require('../config.json');
const fs = require('fs');
const utils = require('../utils');
const { Permissions } = require('discord.js');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('listeroleassigner')
		.setDescription('List all roles assigner that have been created'),
	async execute(interaction) {
		if(interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			fs.readFile(data_name, 'utf8', async function readFileCallback(err, dataJson){
				if (err){
					utils.log_to_console(err + ' :');
					console.log(err);
					await interaction.reply({ content: 'An error occured with the reading of the following file : ' + data_name, ephemeral: true });
				} else {
					const json = JSON.parse(dataJson);
					let chaine = '';
					if(Object.keys(json).length !== 0){
						Object.keys(json).forEach(element => {
							chaine += interaction.guild.channels.cache.find((r) => r.id === element.split(':')[0]).name + ' : ' + element.split(':')[1] + ' :\n';
							Object.keys(json[element]).forEach(subElement => {
								if (subElement !== Object.keys(json[element])[Object.keys(json[element]).length-1]){
									chaine += '         ├ ' + subElement.split(':')[0] + ' : ' + json[element][subElement] + '\n';
								} else {
									chaine += '         └ ' + subElement.split(':')[0] + ' : ' + json[element][subElement] + '\n\n';
								}
							});
						});
						utils.log_to_console('Succefully listeroleassigner');
						await interaction.reply({ content: chaine, ephemeral: true });
					} else {
						await interaction.reply({ content: 'There is no data', ephemeral: true });			
					}
				}  
			});
		} else {
			await interaction.reply({ content: 'You don\'t have access to this command', ephemeral: true });
		}

	},
};