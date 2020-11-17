// GIPHY API
var giphyURL = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=0p6VOTrg6ToWiukHOTdQlHu3z5d9TSee&limit=5";

$.ajax({
    url: giphyURL,
    method: "GET"
}).then((data) =>{
console.log(data);
carouselGenerator(data);
});

function carouselGenerator(gifData) {
    console.log(gifData);
    // Initialize all div with carousel class
var carousels = bulmaCarousel.attach('.carousel', options);

// Loop on each carousel initialized
for(var i = 0; i < carousels.length; i++) {
	// Add listener to  event
	carousels[i].on('before:show', state => {
		console.log(state);
	});
}

// Access to bulmaCarousel instance of an element
var element = document.querySelector('#my-element');
if (element && element.bulmaCarousel) {
	// bulmaCarousel instance is available as element.bulmaCarousel
	element.bulmaCarousel.on('before-show', function(state) {
		console.log(state);
	});
}
}

// giphyURL.done(function(data) { 
//     console.log("success got giphy data", data); 
// }).then(function(data) {
//     console.log(data);



//   $("#imageGame").text(data.data[0].images.downsized.url);
  

//   $("#giphyDIV").html("<img src= 'gifURL' />");
// });

/////////////////////////////////////////////////////////////////////////////////////////////
// RAWG API

$(".button").on("click", function(e){
	e.preventDefault();
	console.log(e);

	var game = $("#userGameInput").val().trim();
	
	var queryURL = `https://api.rawg.io/api/games?search=${game}&key=e318c637851a4a5b9428f416408759cc`;
	
	localStorage.setItem("game", game);
	

	$.ajax({
		url: queryURL,
		method: "GET"
		}).then(function(response){
			console.log(response);
			// Set youtube game ID in local storage here 
			localStorage.setItem("gameID", response.results[0].id);
			// console.log(response.results[0].backgroun_image);


			$("#main-img").attr("src", response.results[0].background_image);

			$(".card-header-title").text(response.results[0].name);

			// var releaseDate = response.results[0].released;
			// var p = $("<p>");

			// p.addClass("release").text("Release Date: " + releaseDate);
			// $("#gameReturns").prepend(p);
					
	});


});
// This section handles the youtube video data
$(".button").on("click", function(response2){
	response2.preventDefault();
	
	var id = localStorage.getItem("gameID");
	var queryYouTube = `https://api.rawg.io/api/games/${id}/youtube`;
	
	
	$.ajax({
		url: queryYouTube,
		method: "GET"
	}).then(function(response2){
		console.log(response2);
		console.log(id);
		console.log(externalID);

		var externalID = response2.results[0].external_id;
		$("#gameReturns").text("https://www.youtube.com/watch?v=" + externalID);
	});
});


// THis section handles the achievement data
$(".button").on("click", function(response3){
	console.log(response3);

	var id2 = localStorage.getItem("gameID");
	var queryAchievements = `https://api.rawg.io/api/games/${id2}/achievements`;

	$.ajax({
		url:queryAchievements,
		method: "GET"
	}).then(function(response3){
		console.log(response3);

		// $("#gameReturns").children.
	})
});
	