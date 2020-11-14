// GIPHY API
var giphyURL = $.get(
  "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=0p6VOTrg6ToWiukHOTdQlHu3z5d9TSee&limit=5"
);

giphyURL
  .done(function (data) {
    console.log("success got giphy data", data);
  })
  .then(function (data) {
    JSON.stringify(data);

    $("#imageGame").text(data.data[0].images.downsized.url);

    //   $("#giphyDIV").html("<img src= 'gifURL' />");
  });

/////////////////////////////////////////////////////////////////////////////////////////////
// RAWG API

var rawgURL = $.get(
  "https://api.rawg.io/api/platforms?key=e318c637851a4a5b9428f416408759cc"
);

rawgURL
  .done(function (response) {
    console.log("success got rawg data", response);
  })
  .then(function (response) {
    JSON.stringify(response);

    $("#rawgDIV").text(response.results[0].games[0].name);
  });
