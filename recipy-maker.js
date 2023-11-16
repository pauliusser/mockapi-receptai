// 1. Susikonfiguruot mockAPI, susikurt duomenų modelį recipes;
// 2. recipes turi turėt properties: title, description, instructions, ingredients(naudot string, ne array), recipe_img;
// 3. Thunder client pagalba įdėt 2-3 receptus;
// 4. Receptus atvaizduoti kortelėse;
// 5. Sukurti puslapį su formą, formą turi įdėt naują rezultatą į mockAPI;
// 6. Kai rezultatas yra įdedamas, turi atsirast žinutė su užrašu, receptas buvo pridėtas;
// 7. Kai rezeptas yra įdedamas po 3sek vartotojas turi būt nukreipiamas į puslapį su visais receptais;

const btn = document.getElementById("submit-btn");
const message = document.getElementById("message");
message.style.display = "none";

btn.addEventListener("click", () => {
	const res = recipieObjectMaker();
	if (typeof res != "object") {
		message.style.display = "flex";
		message.style.backgroundColor = "red";
		message.textContent = res;
	} else {
		uploadRecipy(res);

		message.style.display = "flex";
		message.style.backgroundColor = "green";
		message.textContent = "pavyko";

		// console.log("upload successfull");
		setTimeout(() => {
			window.location.replace("./index.html");
		}, 3000);
	}
});

async function uploadRecipy(recipy) {
	// console.log(recipy);
	await fetch("https://65552d2e63cafc694fe784d3.mockapi.io/recipie", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(recipy),
	});
}
function recipieObjectMaker() {
	const titleInput = document.getElementById("title").value;
	const descriptionInput = document.getElementById("description").value;
	const ingredientsInput = document.getElementById("ingredients").value;
	const instructionsInput = document.getElementById("instructions").value;
	const recipe_imgInput = document.getElementById("recipe_img").value;

	if (titleInput === "") {
		return "nėra pavadinimo";
	}
	if (descriptionInput === "") {
		return "nėra aprašo";
	}
	if (ingredientsInput === "") {
		return "nėra ingredientų";
	}
	if (instructionsInput === "") {
		return "nėra recepto";
	}
	if (recipe_imgInput === "") {
		return "nėra paveikslėlio nuorodos";
	}
	return {
		title: titleInput,
		description: descriptionInput,
		instructions: instructionsInput,
		ingredients: ingredientsInput,
		recipe_img: recipe_imgInput,
	};
}
