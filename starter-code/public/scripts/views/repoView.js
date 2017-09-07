'use strict';
var app = app || {};

(function(module) {
  const repoView = {};

  const ui = function() {
    let $about = $('#about');

    $about.find('ul').empty();
    $about.show().siblings().hide();
  };

  const render = Handlebars.compile($('#repo-template').text());

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live? this function calls the ui() function which uses jQuery to empty a 'ul' it then shows the ul element and hides its siblings. Then it appends all the repos with the name property to the '#about ul'
//this function calls the ui() function which uses jQuery to empty a 'ul' it then shows the ul element and hides its siblings. Then it appends all the repos with the name property to the '#about ul'
  repoView.index = function() {
    ui();

    $('#about ul').append(
      app.repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(app);
