const SocketIO = require("socket.io");

function getRandomLocation() {
	return {
		x: Math.random(),
		y: Math.random() * 0.8,
	};
}

module.exports = (server) => {
	const io = SocketIO(server);
	const clients = {};
	const gameState = {
		poopCollected: 0,
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

	let hasUpdate = false;
	io.on("connection", (socket) => {
		console.log("Connected clients: ", Object.keys(clients).length);
		clients[socket.id] = true;
		socket.emit("game-state", gameState);
		socket.on("poop-collected", ({ id }) => {
			gameState.poopCollected += 1;
			gameState.poops = gameState.poops.filter((poop) => poop.id !== id);
			gameState.poops.push({
				id: gameState.poops[gameState.poops.length - 1].id + 1,
				location: getRandomLocation(),
			});
			hasUpdate = true;
		});
		socket.on("disconnect", () => {
			delete clients[socket.id];
		});
	});

	setInterval(() => {
		if (hasUpdate) {
			io.emit("game-state", gameState);
			hasUpdate = false;
		}
	}, 300);
};
