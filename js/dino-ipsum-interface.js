// import { Dino } from './../js/object_name.js';
$(document).ready(function() {
  $('#dino-ipsum').submit(function(event) {
    event.preventDefault();
    let paragraphs = $('#paragraphs').val();
    $('#paragraphs').val("");
    let words = $('#words').val();
    $('#words').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=${paragraphs}&words=${words}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      for (var i = 0; i < body.length; i++) {
          $(".output").append(`<br><span class = 'paragraphLabel'>Paragraph ${i+1}: </span> `);
        for (var j = 0; j < body[i].length; j++) {
          $(".output").append(`<span>${body[i][j]} </span>`);
        }


      }
    }, function(error) {
      $('.output').text(`There was an error! ${error.message}` )
    });
  });
});
