const express = require('express')
const router = express.Router()
const Movie = require('../models/items')


router.get('/', async(req,res) => {
    try{
           const movies = await Movie.find()
           res.json(movies)
    }catch(err){
        res.send('Error ' + err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const movie = await Movie.findById(req.params.id)
           res.json(movie)
    }catch(err){
        res.send('Error ' + err)
    }
})


router.post('/', async(req,res) => {
    const movie = new Movie({
        name: req.body.name,
        image: req.body.image,
        summary: req.body.summary
    })

    try{
        const a1 =  await movie.save() 
        res.json(a1)
    }catch(err){
        res.send('Error')
    }
})

router.patch('/:id',async(req,res)=> {
    try{
        const movie = await Movie.findById(req.params.id) 
        // movie.name = req.body.name
        // const a1 = await movie.save()
        // res.json(a1)   
        for (const field in req.body) {
            movie[field] = req.body[field];
        }

        const updatedMovie = await movie.save()
        res.json(updatedMovie) 
    }catch(err){
        res.send('Error')
    }

})



router.delete('/:id', async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) return res.status(404).json({ message: 'Movie not found' });
      res.json({ message: 'Movie deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


module.exports = router