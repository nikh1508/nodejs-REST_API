const EventEmitter = require("events");
const url = "";

class Logger extends EventEmitter {
  constructor() {
    super();
    this.log_index = 0;
  }

  log(message) {
    console.log(`Log Message => ${message}`);
    this.emit("logged", { index: this.log_index });
    this.log_index++;
  }
}

module.exports = Logger;
