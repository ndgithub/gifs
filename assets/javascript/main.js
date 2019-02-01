var topics = ['cow', 'dog', 'cat'];

function populateButtons(btnArry) {
  $("#button-container").html('');
  for (var i = 0; i < btnArry.length; i++) {
    var btn = $("<button>").attr('type', 'button');
    btn.addClass('btn btn-primary category-btn');
    btn.text(btnArry[i]);
    btn.attr('data-topic', btnArry[i]);
    $("#button-container").append(btn);
  }
}

function setTopicClickListeners() {
  $(document.body).on('click', '.category-btn', function () {
    var topic = $(this).attr('data-topic');
    getGifs(topic);
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
          gifBox.attr('state', 'still');
        }
      }
    });

  });
}

function setAddTopicClickListeners() {
  $('#topic-input').on('keyup', function (e) {
    var input = $('#topic-input').val();
    if (e.which === 13) {
      if (input) addTopic(input);
      console.log(input);
    }
  })
  $('#search-button').on('click', function () {
    var input = $('#topic-input').val();
    if (input) addTopic(input)
  });
}

function addTopic(topic) {
  topics.push(topic);
  populateButtons(topics);
  getGifs(topic);
  $('#topic-input').val('');
}

function getGifs(searchQuery) {
  console.log("pop");
  $('#gif-container').html('');
  $.ajax({
    method: "GET",
    url: "https://api.giphy.com/v1/gifs/search?api_key=GmmPeyJWlYQDvAmP3HrToRZMZImiLYpT&q=" + searchQuery + "&limit=20&offset=0&rating=G&lang=en", // https://api.giphy.com/v1/gifs/search?api_key=GmmPeyJWlYQDvAmP3HrToRZMZImiLYpT&q=dog&limit=25&offset=0&rating=G&lang=en

    success: function (response) {

      for (var i = 0; i < response.data.length; i++) {
        var stillUrl = response.data[i].images.original_still.url;
        var giphyId = response.data[i].id;
        var gifRating = response.data[i].rating;

        var card = $('<div>').addClass('card gif-card');
        var cardBody = $('<div>').addClass('card-body');
        var cardText = $('<div>').addClass('card-text');
        cardBody.append(cardText.html('<p>Rating: ' + gifRating + '</p>'));

        var gifBox = $('<div>').addClass('gif-box');
        gifBox.css('background-image', 'url(' + stillUrl + ')');
        gifBox.attr('state', 'still');
        gifBox.attr('giphy-id', giphyId);

        card.append(gifBox);
        card.append(cardBody);
        $('#gif-container').append(card);
      }
    }
  });
}

populateButtons(topics);
setTopicClickListeners();
setImgClickListeners();
setAddTopicClickListeners();

getGifs(topics[0]);


