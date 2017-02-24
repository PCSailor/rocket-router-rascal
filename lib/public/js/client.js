$(document).ready(function(){
  console.log('jQuery is sourced');
  var spaceshipParts = [];

////////////////// NOTE: /hello Ajax Request: //////////////////
  $.ajax({
    type: 'GET',
    url: '/hello',
    success: function(data){ // NOTE: what data?
      $('h1').text(data);
    },

    error: function(error){
      console.log('The "/hello" ajax get request failed with error: ', error);
    }
  });

////////////////// NOTE: /parts Ajax Request: //////////////////
////////////////// NOTE: ERROR //////////////////
  getParts(); // QUESTION: Why is this AJAX always run via the getParts() function being called?
  function getParts(){
    $.ajax({
      type: 'GET',
      url: '/parts', // QUESTION: Modules/spaceship-parts-->var spaceshipParts is the info needed here.  How to get it in?
      // url: './modules/spaceship-parts',
      // NOTE: GOTO Module/parts-->GOTO VAR/spaceshipParts-->GOTO Modules/spaceship-parts-->spaceshipParts is a object-filled array with module.exports = spaceshipParts;
      // NOTE: So what happens back here in client.js?

      success: function(partsData){
      // success: function(spaceshipParts){
        displayParts(partsData); // NOTE: partsData replaced by array
        // displayParts(spaceshipParts); // NOTE: Need to change this line?
      },
      error: function(error){
        console.log('The "/parts" ajax get request failed with error: ', error);
      }
    });
    // getRocketPossibleCount();
    getRocketPossibleCount(); // NOTE: call what?? See line 87
  }
////////////////// NOTE: /displayParts: //////////////////
  function displayParts(partThings){
    $('tbody').empty();
    for(var i = 0; i < partThings.length; i++){
      var newRow = $('<tr>');
      newRow.data('partId', partThings[i].id);
      newRow.append('<td>' + partThings[i].name + '</td>');
      newRow.append('<td>' + partThings[i].needed + '</td>');
      newRow.append('<td>' + partThings[i].inStock + '</td>');
      $('tbody').append(newRow);
    }
  }

  // New part
  ////////////////// NOTE: /New part //////////////////
  $('#newPartInfo').on('submit', function(event) {
    event.preventDefault();
    var newPartObject = {};
    var fields = $('#newPartInfo').serializeArray();
    fields.forEach(function(element, index, array) {
      newPartObject[element.name] = element.value;
    });
    $('#newPartInfo').find('input[type=text]').val('');
    $('#newPartInfo').find('input[type=number]').val('');

    saveNewPart(newPartObject);
  });
////////////////// NOTE: /saveNewPart: //////////////////
  function saveNewPart(newestPart){
    $.ajax({
      type: 'POST',
      url: '/parts/new',
      data: newestPart,
      success: function(response){
        console.log(response);
        getParts();
      },
      error: function(error){
        console.log('The "/part" ajax post request failed with error: ', error);
      }
    });
  }


  ////////////////// NOTE: /Calculate number of rockets you can build: //////////////////
  function getRocketPossibleCount(){
    $.ajax({
      type: 'GET',
      url: 'parts/rocketCount',
      success: function(data){
        console.log(data);
        $('#numberOfSpaceships').text(data.count);
      },
      error: function(error){
        console.log('The "/rocketCount" ajax get request failed with error: ', error);
      }
    });
  }

}); // NOTE: FOR: $(document).ready(function(){
console.log('Javascript is sourced');
