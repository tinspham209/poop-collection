const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http");
const sockets = require("./socket");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
sockets(server);
// HTTP Logger
app.use(morgan("tiny"));

// CORS attack
app.use(cors());

// Set public folder
app.use(express.static(path.join(__dirname, "..", "public")));

server.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});
