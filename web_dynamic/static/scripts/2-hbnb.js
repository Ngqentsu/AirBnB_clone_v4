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
