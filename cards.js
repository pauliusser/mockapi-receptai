// 1. Susikonfiguruot mockAPI, susikurt duomenų modelį recipes;
// 2. recipes turi turėt properties: title, description, instructions, ingredients(naudot string, ne array), recipe_img;
// 3. Thunder client pagalba įdėt 2-3 receptus;
// 4. Receptus atvaizduoti kortelėse;
// 5. Sukurti puslapį su formą, formą turi įdėt naują rezultatą į mockAPI;
// 6. Kai rezultatas yra įdedamas, turi atsirast žinutė su užrašu, receptas buvo pridėtas;
// 7. Kai rezeptas yra įdedamas po 3sek vartotojas turi būt nukreipiamas į puslapį su visais receptais;

// 1. Paspaudus ant kortelės recepto id turi būt išsaugotas į localstorage bei varototojas turi būt nudirectintas į konkretauks produkto puslapį;
// 2. Sukurti konkretaus produkto puslapio dizainą su "mockintais"(fake) duomenim;
// 3. Puslapy iš loclastorage išsitraukt recepto id bei parfetchint receptą;
// 4. Visas recepto detales reikia atvaizduoti puslapy;
// 5. Pridėti delete mygtuką, jį paspaudus receptas turi būt ištrintas;
// 6. Po ištrinimo turi ekrane atsirast informacinė žinutė kuri informuoja, kad receptas buvo ištrintas bei vartotojas turi būt nukreiptas į visų receptų puslapį;

const pageWrapper = document.getElementById("page-wrapper");

buildCards();

async function buildCards() {
	const recipes = await fetchRecipes();
	// console.log(recipes);
	recipes.forEach((recipe) => {
		const card = document.createElement("div");
		card.setAttribute("class", "card");
		card.addEventListener("click", () => {
			const id = recipe.id;
			// console.log(id);
			localStorage.setItem("recipe_ID", id);
			window.location.replace("./recipePage.html");
		});

		const title = document.createElement("h2");
		title.textContent = recipe.title;

		const description = document.createElement("p");
		description.textContent = recipe.description;

		// const instructions = document.createElement("p");
		// instructions.textContent = recipe.instructions;

		// const ingredients = document.createElement("ul");
		// ingredients.textContent = "reikės:";

		// const ingredientsArray = recipe.ingredients.split(", ");
		// // console.log(ingredientsArray);
		// ingredientsArray.forEach((ingredient) => {
		// 	const item = document.createElement("li");
		// 	item.textContent = ingredient;
		// 	ingredients.append(item);
		// });

		const recipe_img = document.createElement("img");
		recipe_img.src = recipe.recipe_img;

		card.append(title, description, recipe_img);
		// card.append(title, description, recipe_img, ingredients, instructions);
		pageWrapper.append(card);
	});
}

async function fetchRecipes() {
	try {
		const recipesResponse = await fetch("https://65552d2e63cafc694fe784d3.mockapi.io/recipie");
		const recipes = await recipesResponse.json();
		console.log(recipes);
		return recipes;
	} catch (err) {
		console.log("recipes fetch failed");
	}
}
