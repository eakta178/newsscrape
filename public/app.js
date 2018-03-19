//Get scraped Articles
$(document).on("click", "#scrape", function(req, res) {
  $.ajax({
    method: "GET",
    url: "/scrape",
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      //res.redirect("/articles")
      $.getJSON("/articles", function(data) {
        console.log("inside getjson")
        // For each one
        for (var i = 0; i < data.length; i++) {
          // Display the apropos information on the page
          $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        }
      });
      
    });

})

// Grab the articles as a json
$.getJSON("/articles", function(data) {
  console.log("inside getjson")
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    $("#articles").append("<div class='collection'>"+"<a href='#'"+ "class='collection-item'" + "data-id='" + data[i]._id + "'>" + data[i].title + "<br />"
    + data[i].link + "</a>"+"</div>");

  }
});

$(document).on("click", ".collection-item", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);

      $("#notes").append("<div class='row'>" + "<div class='col s12 m12'>" +"<div class='card blue-grey darken-1'>" +
      "<div class='card-content white-text'>" +
      "<span class='card-title'>" + data.title + "</span>"+
          "<p>" + "Add a Note/ Delete existing one" + "</p>"+
          "</div>"+
          "<div class='card-action'>"+
          "<div class='input-field col s12'>"+
          "<input placeholder='Note Title' id='titleinput' type='text' name='title' class='validate'>"+
        "</div>"+
        "<div class='input-field col s12'>"+
          "<input placeholder='Add Note here' id='bodyinput' type='text' class='validate' name='body'>"+      
        "</div>"+
            "<a href='#' data-id='" + data._id + "' id='savenote'>Save Note</a>"+
            "<a href='#' data-id='" + data._id + "' id='deletenote'>Delete Note</a>"+
          "</div>"+
        "</div>"+
      "</div>" +
    "</div>");
     
      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the deletenote button
$(document).on("click", "#deletenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "DELETE",
    url: "/articles/delete/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
