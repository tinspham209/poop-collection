const SocketIO = require("socket.io");

module.exports = (server) => {
	const io = SocketIO(server);

	const gameState = {
		animals: [
			{
				id: 0,
				emoji: "🐅",
				location: {
					x: Math.random(),
					y: Math.random(),
				},
			},
			{
				id: 1,
				emoji: "🐘",
				location: {
					x: Math.random(),
					y: Math.random(),
				},
			},
			{
				id: 2,
				emoji: "🐎",
				location: {
					x: Math.random(),
					y: Math.random(),
				},
			},
			{
				id: 3,
				emoji: "🐧",
				location: {
					x: Math.random(),
					y: Math.random(),
				},
			},
			{
				id: 4,
				emoji: "🐿",
				location: {
					x: Math.random(),
					y: Math.random(),
				},
			},
		],
		poops: [
			{
				id: 0,
				x: Math.random(),
				y: Math.random(),
			},
			{
				id: 1,
				x: Math.random(),
				y: Math.random(),
			},
			{
				id: 2,
				x: Math.random(),
				y: Math.random(),
			},
			{
				id: 3,
				x: Math.random(),
				y: Math.random(),
			},
			{
				id: 4,
				x: Math.random(),
				y: Math.random(),
			},
			{
				id: 5,
				x: Math.random(),
				y: Math.random(),
			},
			{
				id: 6,
				x: Math.random(),
				y: Math.random(),
			},
			{
				id: 7,
				x: Math.random(),
				y: Math.random(),
			},
			{
				id: 8,
				x: Math.random(),
				y: Math.random(),
			},
		],
	};

	io.on("connection", (socket) => {
		console.log("a user connected");
	});

	setInterval(() => {
		io.emit("game-state", gameState);
	}, 1000);
};
