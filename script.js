///////////////////////// Display Game Content //////////////////////////////////
// Search function
var gameSearch = $('#userGameInput');
var search = [];

$("#searchBtn").click( function searchButton(e){
	e.preventDefault();
	var submittedSearch = gameSearch.submit();
	var userChoice = submittedSearch.val().toLowerCase();
	search.push(userChoice);
    console.log(search);

	for (i = 0; i < search.length; i++) { 
        var game = search[i]
        localStorage.setItem('game', game);
        console.log(game);

	gifSlideShow();
	displayGameInfo();
	}
});

//Display game content with RAWG API
function displayGameInfo() {

	var game = localStorage.getItem('game');
	var queryURL = `https://api.rawg.io/api/games?search=${game}&key=e318c637851a4a5b9428f416408759cc`;
	
	// localStorage.setItem("game", game);
	
	$.ajax({
		url: queryURL,
		method: "GET"
		}).then(function(response){
			console.log(response);
			// Set youtube game ID in local storage here 
			localStorage.setItem("gameID", response.results[0].id);
			// console.log(response.results[0].backgroun_image);

			// Clears card Info
			$("#gameReturns").empty();

			// Sets image card image
			$("#main-img").addClass("game-Image").attr("src", response.results[0].background_image);

			// Sets title based on search
			$(".card-header-title").text(response.results[0].name);

			// Displays release date
			var releaseDate = response.results[0].released;
			var li = $("<li>");

			li.addClass("release").text("Release Date: " + releaseDate);
			$("#gameReturns").prepend(li);

			// Displays metacritic score
			var metaCritic = response.results[0].metacritic;
			var li = $("<li>");

			li.text("Metacritic Score: " + metaCritic);
			$("#gameReturns").append(li);

			// Displays platforms game is available on
			var platforms = response.results[0].platforms;

			console.log("platforms", platforms);

			for ( var i = 0; i < platforms.length; i++) {
				var li = $("<li>");

				li.text(platforms[i].platform.name);
				$("#gameReturns").append(li);
			};
			

			// Calls youtube function to generate info for link in 
			getYouTube();
							
	})
}

// This section handles the youtube video data
function getYouTube(response2){
	// response2.preventDefault();
	
	var id = localStorage.getItem("gameID");
	var queryYouTube = `https://api.rawg.io/api/games/${id}/youtube`;
	
	
	$.ajax({
		url: queryYouTube,
		method: "GET"
	}).then(function(response2){
		console.log(response2);
		// console.log("id:", id);
		// console.log(externalID);

		var externalID = response2.results[0].external_id;
		$("#game-title").attr("href", "https://www.youtube.com/watch?v=" + externalID);
	});
};

///////////////////////// Display Slide Show //////////////////////////////////
// GIPHY API

function gifSlideShow() {

	var game = localStorage.getItem('game');

	console.log(game);

	for (i = 0; i < game.length; i++) { 
	  var giphyURL = `https://api.giphy.com/v1/gifs/search?q=${game}&api_key=0p6VOTrg6ToWiukHOTdQlHu3z5d9TSee&limit=5`;
	  
	 console.log(giphyURL);
 
		$.ajax({
			url: giphyURL,
			method: "GET"
		}).then(function(response){
			console.log(response);
			$('#gif1').attr("src", response.data[0].images.downsized_medium.url); 
			$('#gif2').attr("src", response.data[1].images.downsized_medium.url);
			$('#gif3').attr("src", response.data[2].images.downsized_medium.url);
			$('#gif4').attr("src", response.data[3].images.downsized_medium.url)
			$('#gif5').attr("src", response.data[4].images.downsized_medium.url)
		}
		)}
}


//GIF Slide Show
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

	
///////////////////////// MODAL CODE BELOW //////////////////////////////////


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

///////////////////////// Display last search //////////////////////////////////

//Get Local Storage
window.onload = function() {
	gifSlideShow();
	displayGameInfo();
	}

///////////////////////// Clear Local Storage ///////////////////////////////////	

$("#resetBtn").click( function resetPage(e){
	e.preventDefault();
	localStorage.clear('game');
	location.reload();
});