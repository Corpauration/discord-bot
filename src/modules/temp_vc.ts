import { VoiceState } from "discord.js";

const utils = require('./utils');

/**
 * Deletes an empty temporary voice channel.
 * 
 * @param old_state - The old state given by the voiceStateUpdate event
 * @param channel_prefix - The unique prefix to identify a temporary channel
 * 
 * @remarks
 * 
 * This method is required to be called from within a voiceStateUpdate event
 * otherwise it will not work.
 */
function delete_empty_vc(old_state: VoiceState, channel_prefix: string): void {
  if (
    old_state.channel != undefined && 
    old_state.channel.name.startsWith(channel_prefix) &&
    old_state.channel.members.size == 0
  ) {
    utils.log_to_console("Deleting channel " + old_state.channel.name);
    old_state.channel.delete();
  }
}

/**
 * Creates a temporary voice channel when a user connects a given channel.
 * 
 * @param new_state - The new state given by the voiceStateUpdate event
 * @param trigger - The name of the trigger channel
 * @param channel_prefix - The unique prefix to identify a temporary channel
 * 
 * @remarks
 * 
 * This method is required to be called from within a voiceStateUpdate event
 * otherwise it will not work.
 */
function create_new_vc(new_state: VoiceState, trigger: string, channel_prefix: string): void {
  // console.log(new_state.channel!.parent)
  if (
    new_state.channel != undefined &&
    new_state.channel.name === trigger
  ) {
    // "!" is the non-null assertion operator 
    const channel_name = channel_prefix + ' de ' + new_state.member!.user.username;
    new_state.guild.channels.create(channel_name, {
      type: 'GUILD_VOICE',
      parent: (new_state.channel!.parent || undefined)
    }).then(vc => {
      utils.log_to_console("Creating channel " + new_state.channel!.name);
      new_state.setChannel(vc);
    });
  }
}

export { delete_empty_vc, create_new_vc }