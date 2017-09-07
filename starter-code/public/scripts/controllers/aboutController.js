'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  // (put your response in a comment here)  This function does 2 things. The first thing is to show the DOM element with the id of about and hide all the siblings of the element with the id of about;  The second thing is calling on the function app.repos.requestRepos with the callback function of app.repoView.index being passed in as a parameter; app.repos.requestRepos(app.repoView.index) is being defined inside the repos.js. Then the callback function is defined inside the repoView.js.
  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
