var topics = ['cow', 'dog', 'cat'];

function populateDefaultButtons(btnArry) {
  for (var i = 0; i < btnArry.length; i++) {
    var btn = $("<button>").attr('type', 'button');
    btn.addClass('btn btn-primary category-btn');
    btn.text(btnArry[i]);
    $("#button-container").append(btn);
  }
}


function setBtnClickListeners() {
  $(document.body).on('click', '.category-btn', function () {
    console.log($(this));
  });
}

function setImgClickListeners() {
  $(document.body).on('click', '.gif-box', function () {
    var gifBox = $(this);
    var giphyId = gifBox.attr('giphy-id');

    $.ajax({
      method: "GET",
      url: "https://api.giphy.com/v1/gifs/" + giphyId + "?api_key=GmmPeyJWlYQDvAmP3HrToRZMZImiLYpT",
      success: function (response) {
        var gifUrl = response.data.images.original.url;
        var stillUrl = response.data.images.original_still.url;
        console.log($(this));
        if (gifBox.attr('state') === 'still') {
          gifBox.css('background-image', 'url(' + gifUrl + ')');
          gifBox.attr('state', 'active')
        } else {
          gifBox.css('background-image', 'url(' + stillUrl + ')');
          gifBox.attr('state', 'still')

        }
      }
    });

  });
}

function getGifs(searchQuery) {
  //url = 
  $.ajax({
    method: "GET",
    url: "https://api.giphy.com/v1/gifs/search?api_key=GmmPeyJWlYQDvAmP3HrToRZMZImiLYpT&q=" + searchQuery + "&limit=2&offset=0&rating=G&lang=en", // https://api.giphy.com/v1/gifs/search?api_key=GmmPeyJWlYQDvAmP3HrToRZMZImiLYpT&q=dog&limit=25&offset=0&rating=G&lang=en

    success: function (response) {

      for (var i = 0; i < response.data.length; i++) {
        var gifUrl = response.data[i].images.original.url;
        var stillUrl = response.data[i].images.original_still.url;
        var giphyId = response.data[i].id;

        var card = $('<div>').addClass('card gif-card');
        var cardBody = $('<div>').addClass('card-body');
        var cardText = $('<div>').addClass('card-text');
        cardBody.append(cardText.html('<p>asdf</p>'));


        var gifBox = $('<div>').addClass('gif-box');
        gifBox.css('background-image', 'url(' + stillUrl + ')');
        gifBox.attr('state', 'still');
        gifBox.attr('giphy-id', giphyId);

        card.append(gifBox);
        card.append(cardBody);
        $('#gif-container').append(card);
        // response.data[i].images.original.url
        // Append to gif-container
      }
    }
  });
}

populateDefaultButtons(topics);
setBtnClickListeners();
setImgClickListeners();

getGifs('dog');


