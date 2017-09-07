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
  //this function takes care of showing all of our repos. it wil first run the ui() function (declared above), and then it will append into the <ul> that is a child of the element with an id of "about", and then run the repos.with function (found in repo.js) and give it an argument of 'name' which the function will use to filter through the repos. so any repo with a "name" property will then be passed into our handlebars render function described above. 
  repoView.index = function() {
    ui();

    $('#about ul').append(
      app.repos.with('name').map(render)
    );
  };

  module.repoView = repoView;
})(app);
