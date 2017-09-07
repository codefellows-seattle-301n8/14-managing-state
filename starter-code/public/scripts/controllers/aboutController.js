'use strict';
var app = app || {};

(function(module) {
  const aboutController = {};

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  //The function, aboutController.index, is targeting the section with the selector of #about. Method .show to show this section, with methed .sibling to target sibling tags/elements, and using .hide to hide those sibling tags/elements. Calling epos.requestRepos function (this is getting the repos from github) from repos.js and giving it the arguement of repoView.index (which is appending to the dom using an unordered list) from repoView.js.
  aboutController.index = () => {
    $('#about').show().siblings().hide();
    app.repos.requestRepos(app.repoView.index);
  };

  module.aboutController = aboutController;
})(app);
