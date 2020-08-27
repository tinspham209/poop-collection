const SocketIO = require("socket.io");
const crypto = require("crypto");

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
	return Date.now() + (5 + Math.floor(Math.random() * 5)) * 1000;
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
		let lastCollected = Date.now();
		socket.emit("game-state", gameState);
		socket.on("poop-collected", ({ id }) => {
			if (Date.now() - lastCollected < 1000) {
				return;
			}
			const poopIndex = gameState.poops.findIndex((poop) => poop.id === id);
			if (poopIndex !== -1) {
				gameState.poops.splice(poopIndex, 1);
				gameState.poopCollected += 1;
				hasUpdate = true;
				lastCollected = Date.now();
			}
		});
		socket.on("disconnect", () => {
			delete clients[socket.id];
		});
	});

	setInterval(() => {
		gameState.animals.forEach((animal) => {
			const diff = animal.endTime - Date.now();
			if (diff <= 0) {
				const nextLocation = getRandomLocation();
				gameState.poops.push(
					createPoop({
						y:
							nextLocation.y > animal.nextLocation.y
								? animal.nextLocation.y + 0.02
								: animal.nextLocation.y - 0.02,
						x:
							nextLocation.x > animal.nextLocation.x
								? animal.nextLocation.x + 0.02
								: animal.nextLocation.x - 0.02,
					})
				);
				if (gameState.poops.length > 40) {
					gameState.poops.shift();
				}
				animal.location = animal.nextLocation;
				animal.nextLocation = nextLocation;
				animal.endTime = getRandomEndTime();
				animal.hasUpdate = true;
				hasUpdate = true;
			} else {
				animal.hasUpdate = false;
			}
		});
		if (hasUpdate) {
			io.emit("game-state", gameState);
			hasUpdate = false;
		}
	}, 300);
};
