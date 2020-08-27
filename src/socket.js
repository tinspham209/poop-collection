const SocketIO = require("socket.io");

function getRandomLocation() {
	return {
		x: Math.random(),
		y: Math.random() * 0.8,
	};
}

module.exports = (server) => {
	const io = SocketIO(server);

	const gameState = {
		animals: [
			{
				id: 0,
				emoji: "🐅",
				location: getRandomLocation(),
			},
			{
				id: 1,
				emoji: "🐘",
				location: getRandomLocation(),
			},
			{
				id: 2,
				emoji: "🐎",
				location: getRandomLocation(),
			},
			{
				id: 3,
				emoji: "🐧",
				location: getRandomLocation(),
			},
			{
				id: 4,
				emoji: "🐿",
				location: getRandomLocation(),
			},
		],
		poops: [
			{
				id: 0,
				location: getRandomLocation(),
			},
			{
				id: 1,
				location: getRandomLocation(),
			},
			{
				id: 2,
				location: getRandomLocation(),
			},
			{
				id: 3,
				location: getRandomLocation(),
			},
			{
				id: 4,
				location: getRandomLocation(),
			},
			{
				id: 5,
				location: getRandomLocation(),
			},
			{
				id: 6,
				location: getRandomLocation(),
			},
			{
				id: 7,
				location: getRandomLocation(),
			},
			{
				id: 8,
				location: getRandomLocation(),
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
