const SocketIO = require("socket.io");

function getRandomLocation() {
	return {
		x: Math.random(),
		y: Math.random() * 0.8,
	};
}

function createID() {
	return `id_${Date.now()}_${crypto.randomBytes(5).toString("hex")}`;
}

function getRandomEndTime() {
	return Date.now() + (5 + Math.floor(Mat.random() * 5)) * 1000;
}

function createAnimal(emoji) {
	return {
		id: createID(),
		emoji,
		location: getRandomLocation(),
		nextLocation: getRandomLocation(),
		endTime: getRandomEndTime(),
	};
}

function createPoop(location) {
	return {
		id: createID(),
		location,
	};
}

module.exports = (server) => {
	const io = SocketIO(server);
	const clients = {};
	const gameState = {
		poopCollected: 0,
		animals: ["🐅", "🐘", "🐎", "🐧", "🐪"].map(createAnimal),
		poops: [],
	};

	let hasUpdate = false;
	io.on("connection", (socket) => {
		console.log("Connected clients: ", Object.keys(clients).length);
		clients[socket.id] = true;
		const lastCollected = Date.now();
		socket.emit("game-state", gameState);
		socket.on("poop-collected", ({ id }) => {
			if (Date.now() - lastCollected < 1000) {
				return;
			}
			const poopIndex = gameState.poops.findIndex((poop) => poop.id === id);
			if (poopIndex !== -1) {
				gameState.poops[poopIndex].location = getRandomLocation();
				gameState.poopCollected += 1;
				hasUpdate = true;
			}
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
