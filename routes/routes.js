//import required modules
const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');

//import schema
const Article = require('../models/articles');

//adding routes here
//retrieve articles by using get method
router.get('/articles', function(req, res, next){
    //res.send('Article retrieval url accessed.')
    //logic to fetch articles
    Contact.find(function(err, articles){
        res.json(articles);
    });
});

//adding articles to dbase using post method
router.post('/articles', function(req, res, next){
    //logic to add articles
    //creating object article
    let newArticle = new Article({
        headline: req.body.headline,
        content: req.body.content,
        author_info: req.body.author_info
    });
    
    //console.log(newArticle);
    //insert the contact into database
    newArticle.save(function(err, article){
        if(err)
            res.json({msg: 'Failed to add Article: '+err});
        else
            res.json({msg: 'Article added successfully'});
    });
    
});

//deleting articless from dbase using delete method
router.delete('/articles/:id', function(req, res, next){
    //logic to delete contacts
    Article.deleteOne({_id: req.params.id}, function(err, result){
        if(err)
            res.json(err);
        else
            res.json(result);
    });
});


//export the router
module.exports = router;