// 1. Paspaudus ant kortelės recepto id turi būt išsaugotas į localstorage bei varototojas turi būt nudirectintas į konkretauks produkto puslapį;
// 2. Sukurti konkretaus produkto puslapio dizainą su "mockintais"(fake) duomenim;
// 3. Puslapy iš loclastorage išsitraukt recepto id bei parfetchint receptą;
// 4. Visas recepto detales reikia atvaizduoti puslapy;
// 5. Pridėti delete mygtuką, jį paspaudus receptas turi būt ištrintas;
// 6. Po ištrinimo turi ekrane atsirast informacinė žinutė kuri informuoja, kad receptas buvo ištrintas bei vartotojas turi būt nukreiptas į visų receptų puslapį;

const recipeWrapper = document.getElementById("recipe-wrapper");

drawPage();

async function drawPage() {
	const recipe = await fetchRecipe(localStorage.getItem("recipe_ID"));
	console.log(recipe);

	const title = document.createElement("h2");
	title.textContent = recipe.title;

	const description = document.createElement("p");
	description.textContent = recipe.description;

	const instructions = document.createElement("p");
	instructions.textContent = recipe.instructions;

	const ingredients = document.createElement("ul");
	ingredients.textContent = "reikės:";

	const ingredientsArray = recipe.ingredients.split(", ");
	ingredientsArray.forEach((ingredient) => {
		const item = document.createElement("li");
		item.textContent = ingredient;
		ingredients.append(item);
	});

	const recipe_img = document.createElement("img");
	recipe_img.src = recipe.recipe_img;

	const message = document.createElement("p");
	message.textContent = "Receptas pašalintas, grįtame į pagrindinį puslapį";
	message.setAttribute("class", "alert");

	const deleteBtn = document.createElement("button");
	deleteBtn.textContent = "Pašalinti Receptą";
	deleteBtn.setAttribute("class", "delete-btn");
	deleteBtn.addEventListener("click", async () => {
		message.style.display = "block";
		await fetch(`https://65552d2e63cafc694fe784d3.mockapi.io/recipie/${recipe.id}`, { method: "DELETE" });
		localStorage.removeItem("recipe_ID");
		setTimeout(() => {
			window.location.replace("./index.html");
		}, 2000);
		// console.log(recipe.id);
	});

	recipeWrapper.append(title, description, recipe_img, ingredients, instructions, message, deleteBtn);
}

async function fetchRecipe(recipeId) {
	try {
		const id = recipeId;
		const recipeResponse = await fetch(`https://65552d2e63cafc694fe784d3.mockapi.io/recipie/${id}`);
		const recipe = await recipeResponse.json();
		console.log(recipe);
		return recipe;
	} catch (err) {
		console.log("recipe fetch failed");
	}
}
