const http = require("http");

// const server = http.createServer();
// server.on("connection", (socket) => {
//   console.log("New connection");
//   //   console.log(socket);
// });

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.write("<H1>Hello World</H1>");
    res.end();
  }
  if (req.url == "/api/courses") {
    // res.write(JSON.stringify([1, 2, 100, 115]));
    res.write(
      JSON.stringify({ course_id: [1, 2, 3, 4, 5], course_topic: "Node.js" })
    );
    res.end();
  }
});
server.listen(3000);

console.log("Server listening on port 3000");
