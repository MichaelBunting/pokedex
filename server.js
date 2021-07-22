const http = require("http");
const getPokedex = require("./getPokedex");

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(await getPokedex(5), null, 4));
});

server.listen(3005, "127.0.0.1", () => {
  console.log("Server started at localhost:3005");
})