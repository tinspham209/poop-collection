const socket = io();

const zoo = document.querySelector(".zoo");
const scoreElement = document.querySelector(".score .value");

{
	/* <span class="emoji animal bounce">🐅</span>
<span class="emoji animal bounce">🐘</span>
<span class="emoji poop">💩</span> */
}

const animalsById = {};
const poopsById = {};

function removePoop(poop) {
	poop.classList.add("shrink");
	poop.addEventListener("animationend", () => {
		poop.remove();
	});
}

function collectPoop(poop) {
	return () => {
		socket.emit("poop-collected", {
			id: poop.id,
		});
		if (poopsById[poop.id]) {
			removePoop(poopsById[poop.id]);
			delete poopsById[poop.id];
		}
	};
}

let firstRun = true;
function updateView(gameState) {
	scoreElement.textContent = gameState.poopCollected;
	const poopIds = {};
	gameState.poops.forEach((poop) => {
		poopIds[poop.id] = true;
		if (!poopsById[poop.id]) {
			const poopElement = document.createElement("span");
			poopElement.classList.add("emoji");
			poopElement.classList.add("poop");
			poopElement.textContent = "💩";
			poopsById[poop.id] = poopElement;
			poopElement.addEventListener("click", collectPoop(poop));
			zoo.appendChild(poopElement);
		}

		poopsById[poop.id].style.top = `${poop.location.y * 100}vh`;
		poopsById[poop.id].style.left = `${poop.location.x * 100}vw`;
	});
	Object.entries(poopsById).forEach(([id, poop]) => {
		if (!poopIds[id]) {
			removePoop(poop);
		}
	});

	const animalsIds = {};
	gameState.animals.forEach((animal) => {
		animalsIds[animal.id] = true;
		let animalElement = animalsById[animal.id];

		if (!animalElement) {
			animalElement = document.createElement("span");
			animalElement.classList.add("emoji");
			animalElement.classList.add("animal");
			animalElement.classList.add("bounce");
			animalElement.textContent = animal.emoji;
			animalsById[animal.id] = animalElement;
			zoo.appendChild(animalElement);
		}
		if (animal.hasUpdate || firstRun) {
			animalElement.style.top = `${animal.location.y * 100}vh`;
			animalElement.style.left = `${animal.location.x * 100}vw`;
		}
		const duration = (animal.endTime - Date.now()) / 1000;
		animalElement.style.transition = `all ${duration}s ease-in-out`;
		const bounceDuration = 250 + Math.floor(Math.random() * 200);
		let animationName = "bounce";
		if (animal.nextLocation.x > animal.location.x) {
			animationName = "flip-bounce";
		}
		animalElement.style.animation = `${animationName} ${bounceDuration}ms alternate ease-in-out infinite`;
		setTimeout(() => {
			animalElement.style.top = `${animal.nextLocation.y * 100}vh`;
			animalElement.style.left = `${animal.nextLocation.x * 100}vw`;
		}, 200);
	});
	Object.entries(animalsById).forEach(([id, animal]) => {
		if (!animalsIds[id]) {
			animal.remove();
		}
	});
	firstRun = false;
}

socket.on("game-state", updateView);
