const { Router } = require('express');
const {
    getAllCharacters,
    getCharacterById,
    createCharacter,
    updateCharacter,
    deleteCharacter,
    associateMovie,
    getByIdWithMovies
} = require('../controllers/characters');
const {
    getAllRequestValidations,
    postRequestValidations, 
    putRequestValidations,
    deleteRequestValidations,
    getRequestValidations,
    associateRequestValidation
} = require('../middlewares/characters');

const router = Router();

router.get('/', getAllRequestValidations, getAllCharacters);
router.get('/:id', getRequestValidations, getCharacterById);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id', putRequestValidations, updateCharacter);
router.delete('/:id(\\d+)', deleteRequestValidations, deleteCharacter);

router.get('/associate/:id(\\d+)', getRequestValidations, getByIdWithMovies);
router.put('/associate/:idCharacter(\\d+)/:idMovie', associateRequestValidation, associateMovie);


module.exports = router;