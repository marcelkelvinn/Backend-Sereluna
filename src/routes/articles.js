const express = require('express');
const routing = express.Router();

const { getAllArticles, addArticles, getArticle} = require('../controller/articlesController');

routing.get('/', getAllArticles );

routing.get('/:id', getArticle);

routing.post('/', addArticles);

module.exports = routing;
