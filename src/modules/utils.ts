/**
 * Prefixes a message with the current timestamp and logs to the console.
 * 
 * @param message - The message to log out to the console
 */
 function log_to_console(message: string): void {
  let current_date: Date = new Date();
  let datetime: string = '[' + current_date.getDate() + '/'
    + (current_date.getMonth() + 1) + '/'
    + current_date.getFullYear() + ' @ '
    + current_date.getHours() + ':'
    + current_date.getMinutes() + ':'
    + current_date.getSeconds() + '] ';
  console.log(datetime.toString() + message);
}

export { log_to_console };