const { Router } = require('express');
const {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    deleteCharacter
} = require('../controllers/characters');
const {
    getAllRequestValidations,
    postRequestValidations, 
    putRequestValidations,
    deleteRequestValidations
} = require('../middlewares/characters');

const router = Router();

router.get('/', getAllRequestValidations, getAllCharacters);
router.post('/', postRequestValidations, createCharacter);
router.put('/:id', putRequestValidations, updateCharacter);
router.delete('/:id(\\d+)', deleteRequestValidations, deleteCharacter);


module.exports = router;