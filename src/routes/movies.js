const { Router } = require('express');
const {
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie
} = require('../controllers/movies');
const {
    getAllRequestValidations,
    postRequestValidations, 
    putRequestValidations,
    deleteRequestValidations
} = require('../middlewares/movies');

const router = Router();

router.get('/', getAllRequestValidations, getAllMovies);
router.post('/', postRequestValidations, createMovie);
router.put('/:id', putRequestValidations, updateMovie);
router.delete('/:id(\\d+)', deleteRequestValidations, deleteMovie);


module.exports = router;