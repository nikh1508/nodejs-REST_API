const EventEmitter = require("events");

emitter = new EventEmitter();

var i = 0;

emitter.on("event1", (arg) => {
  console.log(`Event Occured : ${arg.index}`);
});

setInterval(() => {
  emitter.emit("event1", { index: i });
  i++;
}, 2000);
// emitter.emit("event1");
