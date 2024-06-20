const express = require('express');
const routing = express.Router();
const {getAllJournal,getJournal,addJournal,deleteJournal} = require('../controller/journalController');

routing.get('/', getAllJournal);

routing.get('/:id', getJournal);

routing.post('/', addJournal);

routing.delete('/:id', deleteJournal);

module.exports=routing;