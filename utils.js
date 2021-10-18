/**
 * Prefixes a message with the current timestamp and logs to the console.
 *
 * @param message - The message to log out to the console
 */
exports.log_to_console = (message) => {
  let current_date = new Date();
  let datetime = ('[' + current_date.toLocaleString('fr') + '] ').replace(',', ' @');
  console.log(datetime.toString() + message);
}