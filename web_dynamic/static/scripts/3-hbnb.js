$(document).ready(function () {
  $('input[type="checkbox"]').on('change', function () {
    const checkedCheckboxes = $('input[type="checkbox"]:checked');
    const amenityName = checkedCheckboxes.map(function () {
      return $(this).data('name');
    }).get();

    const amenityID = checkedCheckboxes.map(function () {
      return $(this).data('id');
    }).get();

    const amenitiesH4 = $('.amenities h4');

    if (amenityName.length === 0) {
      amenitiesH4.html('&nbsp;');
    } else {
      amenitiesH4.text(amenityName.join(', '));
    }

    console.log(amenityID);
  });
});

$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  type: 'GET',
  dataType: 'json',
  success: function (json) {
    $('#api_status').addClass('available');
  },
  error: function (xhr, status) {
    console.log('error ' + status);
  }
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  contentType: 'application/json',
  data: JSON.stringify({}),
  success: function (data) {
    $.each(data, function (index, place) {
      var article = $('<article>');
      article.append($('<div class="title_box">').append($('<h2>').text(place.name)));
      article.append($('<div class="information">').text(place.max_guest + ' Guests | ' +
                         place.number_rooms + ' Bedrooms | ' +
                         place.number_bathrooms + ' Bathrooms'));
      article.append($('<div class="description">').text(place.description));
      $('section.places').append(article);
    });
  },
  error: function (error) {
    console.error("Error fetching places:", error);
  }
});
