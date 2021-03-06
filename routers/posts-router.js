const express = require('express')

    //importing the access points to the database
const Posts = require('../data/db.js');

    //we need the express Router to make this all work. instead of calling server.whatever,
    //we call router.whatever now
const router = express.Router();

router.post('/', (req, res) => {

    if(!req.body.title || !req.body.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }else{
        Posts.insert(req.body)
            .then(obj => {
                Posts.findById(obj.id)
                    .then(item => res.status(200).json(item) )
            })
            .catch(err => res.status(400).json({ error: "There was an error while saving the post to the database" }))
    }
});

router.get('/', (req,res) => {
    Posts.find()
        .then(list => res.status(200).json(list) )
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
})

router.get('/:id', (req,res) => {
    let id = req.params.id
    Posts.findById(id)
        .then(list => {
            if(list.length){
                res.status(200)
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
})

router.delete('/:id', (req,res) => {
    let id = req.params.id;

    Posts.remove(id)
        .then(response => {
            if(response){
                res.status(200).json(response)
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

router.put('/:id', (req,res) => {
    let id = req.params.id

    if(req.body.title && req.body.contents){
        Posts.update(id, req.body)
            .then(count => {
                if(count === 1){
                    Posts.findById(id)
                        .then(item => res.status(200).json(item) )      
                }else{
                    res.status(404).json({ message: "The post with the specified ID does not exist." })
                }
        })
        .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
    }else{
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }

    

})

module.exports = router;