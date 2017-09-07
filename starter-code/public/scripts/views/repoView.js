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

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  ///////repoView.index is being defined below.  The first thing this function does is calling on the function ui();, which is defined above in this file.  The function ui empty the contents in the ul of the html element with an id of about. Then ui would show the section of about and hide all the siblings of the element with id of about. The second thing repoView.index does is that it finds the ul of the html element with id of about and it appends the repos to it
  repoView.index = function() {
    ui();

    $('#about ul').append(
      app.repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(app);
