'use strict';
var app = app || {};

(function(module) {
  function Article(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Article.all = [];

  // REVIEW: We no longer need our prototype toHtml() method. This functionality has been relocated to the view.
  //         As a result, Article.prototype.toHtml has been deleted.

  // REVIEW: With ES6 arrow functions, if the function only has one parameter, you don't need parentheses.
  //         This is similar to saying Article.loadAll = function(rows).
    // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?  Article.loadAll does 2 things.  The first thing is sorting the rows, with a and b being passed in as parameters. a and b are just any two elements in an array that we are comparing.  b.publishedOn is a string therefore it needs to be converted into a numberical value by creating new Date object. The rows are being sorted in the descending order because b - a.  The second thing is the Article.all is an array of all articles, being created by calling rows.map with ele being passed in as a parameter to create new Article by running ele through a Constructor function.  Article.loadAll is being called in the function below Article.fetchAll inside this file article.js
  Article.loadAll = rows => {
    rows.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)));
    Article.all = rows.map(ele => new Article(ele));
  };

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?////Article.fetchAll does a get request with the url of /articles.  It calls Article.loadAll with results being passed inside as a parameter.  Article.loadAll is defined above.  After the articles being loaded then it calls the callback function, which is adminView.initAdminPage; living inside adminView.js.
  Article.fetchAll = callback => {
    $.get('/articles')
    .then(
      results => {
        Article.loadAll(results);
        callback();
      }
    )
  };

  // REVIEW: We have a new method to query our DB for a specific record, based on varying criteria
  Article.findWhere = function(field, value, callback) {
    $.get('/articles/find', {field: field, val: value})
    .then(callback)
  };

  // REVIEW: A new method for gathering all of the categories
  Article.allCategories = function(callback) {
    $.get('/categories', callback);
  };

  Article.numWordsAll = () => {
    return Article.all.map(article => article.body.match(/\b\w+/g).length)
                      .reduce((a, b) => a + b)
  };

  Article.allAuthors = () => {
    return Article.all.map(article => article.author)
                      .reduce((names, name) => {
                        if (names.indexOf(name) === -1) names.push(name);
                        return names;
                      }, []);
  };

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?
  //////Article.numWordsByAuthor returns a total number of words written by the author.  Article.allAuthors() is a function that is being called.  ONce Article.allAuthors returns all the authors in all articles, it performs .map on that array of authors. .map is used to return an object for every author in that array.  An object consists of the key, which is name and its value is author; and another key is numWords with its value an interger, which is the total number of words written by a particular author.  Article.numWordsByAuthor is being called in the adminView.js.

  Article.numWordsByAuthor = () => {
    return Article.allAuthors().map(author => {
      return {
        name: author,
        numWords: Article.all.filter(a => a.author === author)
                             .map(a => a.body.match(/\b\w+/g).length)
                             .reduce((a, b) => a + b)
      }
    })
  };

  Article.stats = () => {
    return {
      numArticles: Article.all.length,
      numWords: Article.numWordsAll(),
      Authors: Article.allAuthors(),
    }
  };

  // COMMENT: What is this function doing? Where is it called? Does it call any other functions, and if so, in what file(s) do those function(s) live?///////Article.truncateTable gives an option of deleting all the articles if it gets called.  Once it starts the ajax request with the url of /articles then it uses the method of delete to delete all the articles. Once the delete action is performed then it console.log then it calls the callback function.
  Article.truncateTable = callback => {
    $.ajax({
      url: '/articles',
      method: 'DELETE',
    })
    .then(console.log)
    .then(callback);
  };

  Article.prototype.insertRecord = function(callback) {
    $.post('/articles', {author: this.author, authorUrl: this.authorUrl, body: this.body, category: this.category, publishedOn: this.publishedOn, title: this.title})
    .then(console.log)
    .then(callback);
  };

  Article.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'DELETE'
    })
    .then(console.log)
    .then(callback);
  };

  Article.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/articles/${this.article_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        authorUrl: this.authorUrl,
        body: this.body,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title,
        author_id: this.author_id
      }
    })
    .then(console.log)
    .then(callback);
  };

  module.Article = Article;
})(app);
