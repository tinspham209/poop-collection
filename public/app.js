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

function updateView(gameState) {
	scoreElement.textContent = gameState.poopCollected;
	gameState.poops.forEach((poop) => {
		if (!poopsById[poop.id]) {
			const poopsElement = document.createElement("span");
			poopsElement.classList.add("emoji");
			poopsElement.classList.add("poop");
			poopsElement.textContent = "💩";
			poopsById[poop.id] = poopsElement;
			poopsElement.addEventListener("click", collectPoop(poop));
			zoo.appendChild(poopsElement);
		}

		poopsById[poop.id].style.top = poop.location.y * window.innerHeight + "px";
		poopsById[poop.id].style.left = poop.location.x * window.innerWidth + "px";
	});

	gameState.animals.forEach((animal) => {
		if (!animalsById[animal.id]) {
			const animalElement = document.createElement("span");
			animalElement.classList.add("emoji");
			animalElement.classList.add("animal");
			animalElement.classList.add("bounce");
			animalElement.textContent = animal.emoji;
			animalsById[animal.id] = animalElement;
			zoo.appendChild(animalElement);
		}

		animalsById[animal.id].style.top =
			animal.location.y * window.innerHeight + "px";
		animalsById[animal.id].style.left =
			animal.location.x * window.innerWidth + "px";
	});
}

socket.on("game-state", updateView);
