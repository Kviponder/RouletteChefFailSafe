
const randomRecipeBtn = document.getElementById('getRandom');
const randomRecipeContainer = document.getElementById('randomRecipe');

function createRandomRecipe(meal) {
const {strMeal, strMealThumb, strInstructions} = meal;
//Generate the elements that will apear on the card
const recipeCard = document.createElement('div');
  recipeCard.classList.add('recipeCard');

  const recipeCardImg = document.createElement('div');
  recipeCardImg.classList.add('recipeCard-img');

  const img = document.createElement('img');
  img.src = strMealThumb;
  img.alt = strMeal;

  const recipeCardDetails = document.createElement('div');
  recipeCardDetails.classList.add('recipeCard-details');

  const h2 = document.createElement('h2');
  h2.textContent = strMeal;

  const instructions = document.createElement('p');
  instructions.textContent = strInstructions;
//Assembles HTML
recipeCardImg.appendChild(img);
recipeCardDetails.appendChild(h2);
recipeCardDetails.appendChild(instructions);
recipeCard.appendChild(recipeCardImg);
recipeCard.appendChild(recipeCardDetails);

//Clear eexisting recipe details
randomRecipeContainer.innerHTML = '';

//Add card to page
randomRecipeContainer.appendChild(recipeCard);
}
randomRecipeBtn.addEventListener('click', () => {
	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(response => response.json())
		.then(response => {
			createRandomRecipe(response.meals[0]);
		})
		.catch(e => {
			console.warn(e);
		});
});

const randomBtn = document.querySelector('.randomBtn');

randomBtn.addEventListener('mouseenter', () => {
  randomBtn.style.setProperty('--color-r', Math.floor(Math.random() * 255));
  randomBtn.style.setProperty('--color-g', Math.floor(Math.random() * 255));
  randomBtn.style.setProperty('--color-b', Math.floor(Math.random() * 255));
})
