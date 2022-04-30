const { Router } = require('express');
const {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    associateCharacter,
    getByIdWithCharacters
} = require('../controllers/movies');
const {
    getAllRequestValidations,
    postRequestValidations, 
    putRequestValidations,
    deleteRequestValidations,
    getRequestValidations,
    associateRequestValidation
} = require('../middlewares/movies');

const router = Router();

router.get('/', getAllRequestValidations, getAllMovies);
router.get('/:id', getRequestValidations, getMovieById);
router.post('/', postRequestValidations, createMovie);
router.put('/:id', putRequestValidations, updateMovie);
router.delete('/:id(\\d+)', deleteRequestValidations, deleteMovie);


router.get('/associate/:id(\\d+)', getRequestValidations, getByIdWithCharacters);
router.put('/associate/:idMovie(\\d+)/:idCharacter(\\d+)', associateRequestValidation, associateCharacter);


module.exports = router;