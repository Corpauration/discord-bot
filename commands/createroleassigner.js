const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createroleassigner')
		.setDescription('[Requires admin privileges] Create a role selector.'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};