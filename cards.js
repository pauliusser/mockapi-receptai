// 1. Susikonfiguruot mockAPI, susikurt duomenų modelį recipes;
// 2. recipes turi turėt properties: title, description, instructions, ingredients(naudot string, ne array), recipe_img;
// 3. Thunder client pagalba įdėt 2-3 receptus;
// 4. Receptus atvaizduoti kortelėse;
// 5. Sukurti puslapį su formą, formą turi įdėt naują rezultatą į mockAPI;
// 6. Kai rezultatas yra įdedamas, turi atsirast žinutė su užrašu, receptas buvo pridėtas;
// 7. Kai rezeptas yra įdedamas po 3sek vartotojas turi būt nukreipiamas į puslapį su visais receptais;

const pageWrapper = document.getElementById("page-wrapper");

buildCards();

async function buildCards() {
	const recipies = await fetchRecipies();
	// console.log(recipies);
	recipies.forEach((recipie) => {
		const card = document.createElement("div");
		card.setAttribute("class", "card");

		const title = document.createElement("h2");
		title.textContent = recipie.title;

		const description = document.createElement("p");
		description.textContent = recipie.description;

		const instructions = document.createElement("p");
		instructions.textContent = recipie.instructions;

		const ingredients = document.createElement("ul");
		ingredients.textContent = "reikės:";

		const ingredientsArray = recipie.ingredients.split(", ");
		console.log(ingredientsArray);
		ingredientsArray.forEach((ingredient) => {
			const item = document.createElement("li");
			item.textContent = ingredient;
			ingredients.append(item);
		});

		const recipe_img = document.createElement("img");
		recipe_img.src = recipie.recipe_img;

		card.append(title, description, recipe_img, ingredients, instructions);
		pageWrapper.append(card);
	});
}

async function fetchRecipies() {
	try {
		const recipiesResponse = await fetch("https://65552d2e63cafc694fe784d3.mockapi.io/recipie");
		const recipies = await recipiesResponse.json();
		return recipies;
	} catch (err) {
		console.log("recipies fetch failed");
	}
}
