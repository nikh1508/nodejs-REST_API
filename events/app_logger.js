const Logger = require("./logger");
// const Logger = log.Logger;

var log = new Logger();
log.on("logged", (arg) =>
  console.log(`message was logged with index ${arg.index}`)
);

log.log("new message");
setTimeout(() => log.log("message2"), 1000);
