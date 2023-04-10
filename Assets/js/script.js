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




// Set the canvas width and height
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the array of balls
let balls = [];

// Define the Ball class
class Ball {
  constructor(x, y, vx, vy, radius, color) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
  }

  // Draw the ball
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  // Update the ball's position
  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Check for collisions with the canvas edges
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.vx = -this.vx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.vy = -this.vy;
    }
  }
}

// Define the animation loop
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Loop through the balls array and update each ball's position
  balls.forEach(ball => {
    ball.draw();
    ball.update();
  });

  // Request the next animation frame
  requestAnimationFrame(animate);
}

// Load saved balls from local storage if any
if (localStorage.getItem('balls')) {
  balls = JSON.parse(localStorage.getItem('balls'));
  balls.forEach(ball => {
    ball.__proto__ = Ball.prototype;
  });
}

// Add a new ball to the array each time the button is clicked
document.getElementById('getRandom').addEventListener('click', () => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const vx = Math.random() * 10 - 5;
  const vy = Math.random() * 10 - 5;
  const radius = Math.random() * 50 + 10;
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);

  balls.push(new Ball(x, y, vx, vy, radius, color));
  localStorage.setItem('balls', JSON.stringify(balls));
});

// Start the animation loop
animate();

// Display ball count
const ballCount = document.getElementById('ballCount');
ballCount.textContent = balls.length;

// Increase ball count when a new ball is added
document.getElementById('getRandom').addEventListener('click', () => {
  ballCount.textContent = balls.length;
});

// Clear saved balls and ball count when the clear button is clicked
document.getElementById('clearBtn').addEventListener('click', () => {
  balls = [];
  localStorage.removeItem('balls');
  ballCount.textContent = 0;
});

const ballCountElem = document.getElementById('ballCount');

function updateBallCount() {
  ballCountElem.innerText = balls.length.toString();
}