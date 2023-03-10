// [<O>] TFN // CODE CHECKED
// PUSH 01/05/2023

////////////////////////// WORKING CODE BELOW ONLY //////////////////////////////////
////////////////////////// WORKING CODE BELOW ONLY //////////////////////////////////

// global
let currentRandomBeer;
// State and City selector for Randomizer  //
let stateAndCityObj = {
	Arizona: ["Gilbert", "Mesa"],
	Colorado: ["Castle Rock", "Denver"],
	California: ["Petaluma", "San Diego"],
	Indiana: ["Knox"],
	Idaho: ["Boise"],
	Massachusetts: ["Abington"],
	Minnesota: ["Anoka"],
	Nevada: ["Reno"],
	"New York": ["Williamsville"],
	Oregon: ["Bend", "John Day", "Portland"],
	Texas: ["Dallas"],
};

// constants
const breweryName = document.querySelector("#brewery-name");
const breweryType = document.querySelector("#brewery-type");
const breweryStreet = document.querySelector("#brewery-street");
const breweryCity = document.querySelector("#brewery-city");
const breweryState = document.querySelector("#brewery-state");
const stateDropdown = document.querySelector("#state-dropdown");
const cityDropdown = document.querySelector("#city-dropdown");
const beerForm = document.querySelector("#beer-form");
const commentsSection = document.querySelector("#comments-section");
const commentForm = document.querySelector("#comment-form");
const dislikeBtn = document.querySelector("#dislike-btn");
const likeBtn = document.querySelector("#like-btn");
const hideShowContact = document.querySelector("#bottom-nav button");
const contactInfo = document.querySelector(".contact-info");

// init

function init() {
	renderRandomizer();
}
init();

// init

////////// fetch() //////////
////////// fetch() //////////

// PATCH - used to UPDATE the JSON file
function patchData(beerObj) {
	fetch(`http://localhost:3000/beers/${currentRandomBeer.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(beerObj), // beerObj from reviews submit btn
	})
		.then((res) => res.json())
		.then((beer) => {
			renderRandomCard(beerObj);
		});
}
// PATCH

// for handleSubmitRandom fn
function getRandomBeerId(beerRandom) {
	let randomBeer = beerRandom[Math.floor(Math.random() * beerRandom.length)];
	//console.log(randomBeer.id)
	// fetch from local db.json file
	fetch(`http://localhost:3000/beers/${randomBeer.id}`)
		.then((res) => res.json())
		.then((beerRandom) => {
			//console.log(beerRandom)
			renderRandomCard(beerRandom);
			displayReviews(beerRandom.reviews);
		});
}
// for handleSubmitRandom fn

////////// fetch() //////////
////////// fetch() //////////

// Random beer from State and City selection BELOW //
// Random beer from State and City selection BELOW //

function renderRandomizer() {
	stateData = Object.keys(stateAndCityObj); // grab only KEYs from Obj
	stateData.forEach((stateData) => {
		let optState = document.createElement("option");
		//state
		optState.value = stateData;
		optState.textContent = stateData;
		stateDropdown.appendChild(optState);
	});
	// ** EVENT = CHANGE ** //
	//city conditioned on selected state //
	citySelector = document.querySelector("#state-dropdown");

	citySelector.addEventListener("change", (e) => {
		e.preventDefault();
		let cityData = stateAndCityObj[e.target.value];
		//debugger
		cityData.forEach((cityName) => {
			let optCity = document.createElement("option");
			optCity.value = cityName;
			optCity.textContent = cityName;
			cityDropdown.appendChild(optCity);
		});
	});
}
// Random beer from State and City selection ABOVE //
// Random beer from State and City selection ABOVE //

// submit to randomize fn BELOW //
// submit to randomize fn BELOW //

// ** EVENT = SUBMIT ** //
beerForm.addEventListener("submit", handleSubmitRandom);

function handleSubmitRandom(e) {
	e.preventDefault();
	// fetch brewery by selected state and city
	fetch(
		`https://api.openbrewerydb.org/breweries?by_state=${e.target["state-dropdown"].value}&by_city=${e.target["city-dropdown"].value}`
	)
		.then((res) => res.json())
		.then((beerRandom) => {
			//beerRandom contains an API based on state and city
			getRandomBeerId(beerRandom);
		});
	e.target.reset(); // reset values for submit form
	// reset city dropdown // ?? OPTIMIZE ??
	let optCity = document.createElement("option");
	optCity.value = "choose-city";
	optCity.textContent = "- Select State First -";
	cityDropdown.replaceChildren(optCity);
	// reset review section
	commentsSection.replaceChildren("");
}
// submit to randomize fn ABOVE //
// submit to randomize fn ABOVE //

// Render Brewery Random Card BELOW //
// Render Brewery Random Card BELOW //

function renderRandomCard(beerRandom) {
	breweryName.textContent = beerRandom.name;
	breweryType.textContent = beerRandom.brewery_type;
	breweryStreet.textContent = beerRandom.street;
	breweryCity.textContent = beerRandom.city;
	breweryState.textContent = beerRandom.state;
	likeBtn.textContent = `${beerRandom.likes} Likes`;
	dislikeBtn.textContent = `${beerRandom.dislikes} Dislikes`;
	// store RANDOM CARD values inside currentRandomBeer
	currentRandomBeer = beerRandom;
}
// Render Brewery Random Card ABOVE //
// Render Brewery Random Card ABOVE //

// Handle and display Reviews BELOW //
// Handle and display Reviews BELOW //

commentForm.addEventListener("submit", handleNewReview);

function handleNewReview(e) {
	e.preventDefault();
	let newReview = e.target["comment-input"].value;
	let currentReviews = currentRandomBeer.reviews;
	currentReviews.push(newReview);
	e.target.reset();
	// reset review section
	commentsSection.replaceChildren("");
	//
	patchData(currentRandomBeer);
	displayReviews(currentRandomBeer.reviews);
}

function displayReviews(beerRandom) {
	beerRandom.forEach((review) => {
		let p = document.createElement("p");
		p.textContent = review;
		commentsSection.append(p);
	});
}
// Handle and display Reviews ABOVE //
// Handle and display Reviews ABOVE //

// Like and Dislikes BELOW //
// Like and Dislikes BELOW //

// click to like BELOW
likeBtn.addEventListener("click", handleSubmitLike);

function handleSubmitLike(e) {
	e.preventDefault();
	currentRandomBeer.likes += 1;

	patchData(currentRandomBeer);
}
// click to dislike BELOW
dislikeBtn.addEventListener("click", handleSubmitDislike);

function handleSubmitDislike(e) {
	e.preventDefault();
	currentRandomBeer.dislikes += 1;

	patchData(currentRandomBeer);
}
// Like and Dislikes ABOVE //
// Like and Dislikes ABOVE //

// bottom nav BELOW //
// bottom nav BELOW //

hideShowContact.addEventListener("click", handleHideShowButton);

function handleHideShowButton(e) {
	if (contactInfo.style.display === "none") {
		contactInfo.style.display = "block";
	} else {
		contactInfo.style.display = "none";
	}
}
// bottom nav ABOVE //
// bottom nav ABOVE //

////////////////////////// WORKING CODE ABOVE ONLY//////////////////////////////////
////////////////////////// WORKING CODE ABOVE ONLY//////////////////////////////////

////////////////////////// IN PROGRESS CODE BELOW ONLY//////////////////////////////
////////////////////////// IN PROGRESS CODE BELOW ONLY//////////////////////////////

// CODE HERE

//////////////////////// OLD WORKING CODE BELOW ONLY////////////////////////////////
//////////////////////// OLD WORKING CODE BELOW ONLY////////////////////////////////

