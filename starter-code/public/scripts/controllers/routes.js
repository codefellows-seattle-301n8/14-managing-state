'use strict';
var app = app || {};

page('/', app.articleController.loadAll, app.articleController.index);
page('/about', app.aboutController.index);
page('/article/:article_id', app.articleController.loadById, app.articleController.index);

// Redirect home if the default filter option is selected:
page('/category', '/');
page('/author', '/');

page('/author/:authorName', app.articleController.loadByAuthor, app.articleController.index);
page('/category/:categoryName', app.articleController.loadByCategory, app.articleController.index);

// COMMENT: What is this function doing?
//The function, page(), is being called to set up the ability to call the corresponding functions per each route that is controlled by the page.js library. Without running the page() function, everything blows up...ie, nothing is called.
page();
