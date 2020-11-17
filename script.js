// GIPHY API

function gifSlideShow() {

	var game = localStorage.getItem('game');

	console.log(game);

	for (i = 0; i < game.length; i++) { 
	  var giphyURL = `http://api.giphy.com/v1/gifs/search?q=${game}&api_key=0p6VOTrg6ToWiukHOTdQlHu3z5d9TSee&limit=5`;
	  
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

/////////////////////////////////////////////////////////////////////////////////////////////
// RAWG API

$(".button").on("click", function(e){
	e.preventDefault();
	console.log(e);

	var game = $("#userGameInput").val().trim();

	localStorage.setItem('game', game);
	gifSlideShow();

	console.log(game);

	var queryURL = `https://api.rawg.io/api/games?search=${game}&key=e318c637851a4a5b9428f416408759cc`;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response){
		console.log(response);

		// console.log(response.results[0].backgroun_image);


		$("#main-img").attr("src", response.results[0].background_image);
		$(".card-header-title").text(response.results[0].name);
		// $("#gameTextEl").text(response.results[0].);
	});
	
});