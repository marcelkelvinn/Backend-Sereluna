const Articles = require('../model/articlesModel');


//Mengambil semua artikel
const getAllArticles = async (req,res) =>{
    try {
        const articles = await Articles.find({});
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
};

const getArticle = async (req,res) =>{
    try {
        const { id } = req.params;
        const articles = await Articles.findById(id);
        if (!articles){
            return res.status(404).json({ message: 'Cannot find any journal with that ID' });
        }
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const addArticles = async (req,res)=>{
    try {
        const articles = await Articles.create(req.body);
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
}

module.exports = {getAllArticles, getArticle, addArticles};