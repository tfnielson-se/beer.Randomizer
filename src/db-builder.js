// GET to display random beer on main //

// GET all
// function getData() {
// 	fetch("http://localhost:3000/beers")
// 		.then((res) => res.json())
// 		.then((data) => {
// 			renderRandomizer(data);
// 		});
// }
// getData();
// GET all

/////////// this is how we built our db.json BELOW ////////////
/////////// this is how we built our db.json BELOW ////////////
//
// THIS CODE COULD POTENTIALLY BE USED TO FETCH DATA AND POPULATE DB.JSON //
//
// 1. CHANGE getDataFromAPI url values
// 2. by_state= & by_city= values to to desired state and city
// 3. refresh website to fetch and post data to db.json
// 4. repeat...
//
// function getDataFromAPI () {
//     fetch('https://api.openbrewerydb.org/breweries?by_state=texas&by_city=dallas')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         renderData(data)
//     })
// }
// getDataFromAPI();
//
// function renderData(data) {
//     data.forEach(brewery => {
//         let breweryObj = {
//             id: brewery.id,
//             name: brewery.name,
//             brewery_type: brewery.brewery_type,
//             street: brewery.street,
//             city: brewery.city,
//             state: brewery.state,
//             likes: 0,
//             dislikes: 0,
//             reviews: []
//         }
//         postToJSON(breweryObj)
//     })
// }
//
// function postToJSON(breweryObj) {
//     fetch("http://localhost:3000/beers", {
// 		method: 'POST',
// 		headers: {
// 		'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(breweryObj)
// 	})
// 	.then(res => res.json())
// 	.then(data => console.log(data))
// }
//

/////////// this is how we built our db.json ABOVE ////////////
/////////// this is how we built our db.json ABOVE ////////////