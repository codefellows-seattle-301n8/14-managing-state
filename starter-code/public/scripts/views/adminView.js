'use strict';
var app = app || {};

(function(module) {
  const adminView = {
    initAdminPage : () => {
      let template = Handlebars.compile($('#author-template').text());
        // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
        //app.Artile.numWordsByAuthor lives in the article.js file and it is a function that returns an array of objects.  Each object has two properties, first one being the author name, and second being the total number of words written by that author.  We run a forEach on that array that will throw the object into our handlebars compiler function named "template" and then append the results into the DOM 
      app.Article.numWordsByAuthor().forEach(stat => $('.author-stats').append(template(stat)));
      $('#blog-stats .articles').text(app.Article.all.length);
      $('#blog-stats .words').text(app.Article.numWordsAll());
    }
  };

  app.Article.fetchAll(adminView.initAdminPage);
  module.adminView = adminView;
})(app);
