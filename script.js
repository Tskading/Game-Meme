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

var rawgURL = $.get("https://api.rawg.io/api/platforms?key=e318c637851a4a5b9428f416408759cc");

rawgURL.done(function(response) {
    console.log("success got rawg data", response);
}).then(function(response) {
    JSON.stringify(response);

    $(".card-header-title").text(response.results[0].games[0].name);
});
