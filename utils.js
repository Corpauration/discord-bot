/**
 * Prefixes a message with the current timestamp and logs to the console.
 * 
 * @param message - The message to log out to the console
 */
exports.log_to_console = (message) => {
  let current_date = new Date();
  let datetime = '[' + current_date.getDate() + '/'
    + (current_date.getMonth() + 1) + '/'
    + current_date.getFullYear() + ' @ '
    + current_date.getHours() + ':'
    + current_date.getMinutes() + ':'
    + current_date.getSeconds() + '] ';
  console.log(datetime.toString() + message);
}