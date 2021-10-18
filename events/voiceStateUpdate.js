// noinspection PointlessBooleanExpressionJS,JSIgnoredPromiseFromCall

const utils = require('../utils');
const { channel_prefix, trigger } = require('../config.json');

module.exports = {
	name: 'voiceStateUpdate',
	execute(old_state, new_state) {

		if (old_state.channel != null) {
		}
		if (
			old_state.channel != null &&
			old_state.channel.name.startsWith(channel_prefix) &&
			old_state.channel.members.size === 0
		) {
			utils.log_to_console("Deleting channel " + old_state.channel.name);
			setTimeout(() => {
				try {
					if (old_state.channel != null) {
						old_state.channel.delete();
					}
				} catch (error) {
					utils.log_to_console(error);
				}
			}, 0);
		}

		if (
			new_state.channel !== undefined &&
			new_state.channel.name === trigger &&
			new_state.channel != null
		) {
			const channel_name = channel_prefix + ' de ' + new_state.member.user.username;
			new_state.guild.channels.create(channel_name, {
				type: 'GUILD_VOICE',
				parent: (new_state.channel.parent || undefined)
			}).then(vc => {
				utils.log_to_console("Creating channel " + channel_name);
				new_state.setChannel(vc);
			});
		}
	},
};