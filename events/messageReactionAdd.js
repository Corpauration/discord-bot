const { data_name } = require('../config.json');
const fs = require('fs');
const utils = require('../utils');

module.exports = {
   name: 'messageReactionAdd',
   async execute(messageReaction,user) {
      if(!user.bot){
         const userReactions = messageReaction.message.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));
         const member = messageReaction.message.guild.members.cache.find((r) => r.id === user.id);
         fs.readFile(data_name, 'utf8', async function readFileCallback(err, dataJson){
            if (err){
               utils.log_to_console(err + ' :');
               console.log(err);
            } else {
               const json = JSON.parse(dataJson);
               if(json[messageReaction.message.channelId + ':' +messageReaction.message.id]){

                  try {
                     for (const reaction of userReactions.values()) {
                        await reaction.users.remove(user.id);
                     }
                  } catch (error) {
                     utils.log_to_console('Failed to remove reactions.');
                  }

                  Object.keys(json[messageReaction.message.channelId + ':' +messageReaction.message.id]).forEach(async element => {
                     if(json[messageReaction.message.channelId + ':' +messageReaction.message.id][element] === messageReaction._emoji.name){

                        if(member.roles.cache.find(r => r.id === element.split(':')[1]) != null){
                           await member.roles.remove(messageReaction.message.guild.roles.cache.find((r) => r.id === element.split(':')[1]));
                           utils.log_to_console('Succefully reactioRemoveRole, user : ' + user.username + ' role : @' + element.split(':')[0]);
                        } else {
                           await member.roles.add(messageReaction.message.guild.roles.cache.find((r) => r.id === element.split(':')[1]));
                           utils.log_to_console('Succefully reactioAddeRole, user : ' + user.username + ' role : @' + element.split(':')[0]);
                        }
                     }
                  });
               }
            }  
         });
      }
   },
};