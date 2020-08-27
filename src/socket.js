const SocketIO = require("socket.io");

module.exports = (server) => {
	const io = SocketIO(server);

	io.on("connection", (socket) => {
		console.log("a user connected");
	});
};
