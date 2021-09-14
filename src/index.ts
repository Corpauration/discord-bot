import { VoiceState } from "discord.js";

const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const { token } = require('./config/creds.json');
const { channel_prefix, trigger } = require('./config/config.json');

const utils = require('./modules/utils');
const temp_vc = require('./modules/temp_vc');

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS, 
  Intents.FLAGS.GUILD_VOICE_STATES,
  Intents.FLAGS.GUILD_MESSAGES
]});

client.once('ready', () => {
  utils.log_to_console('Bot is online.');
});

client.on('voiceStateUpdate', (old_state: VoiceState, new_state: VoiceState) => {
  temp_vc.delete_empty_vc(old_state, channel_prefix);
  temp_vc.create_new_vc(new_state, trigger, channel_prefix);
});

client.on('interactionCreate', async (interaction: { isCommand: () => any; commandName: string; reply: (arg0: { content: string; components: any[]; }) => any; }) => {
	console.log('event triggered')
  
  if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);

		await interaction.reply({ content: 'Pong!', components: [row] });
	}
});

client.login(token);