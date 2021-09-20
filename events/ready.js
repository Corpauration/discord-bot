const utils = require('../utils');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    utils.log_to_console(`Ready ! Logged in as ${client.user.tag}`);
    // console.log(client.api.applications(client.user.id).commands.get());
    // console.log(client.guilds.cache.get('850788219133886565'))
    // client.guilds.cache.get('850788219133886565').commands.permissions.set({
    //   fullPermissions: [
    //     {
    //       id: '889624442991435776',
    //       permissions: [{
    //         id: '850788219133886565',
    //         type: 'ROLE',
    //         permission: false,
    //       }],
    //     },
    //   ]
    // });
  },
};