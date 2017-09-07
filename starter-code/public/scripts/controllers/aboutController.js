'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // COMMENT: What is this function doing? Where is it called? Does \it call any other functions, and if so, in what file(s) do those function(s) live?

  // (put your response in a comment here) this is a jQuery function that is showing elements with the id of #about and the hides its siblings. Then the function runs the requestRepos method of app.repos which lives in repos.js and takes app.repoView.index as a callback function. 

  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
