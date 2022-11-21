const { Router } = require('express');
const { getTemperaments } = require('../controllers/TempController.js');
const { getDogs, getDogDetail, postDog, removeDogs } = require('../controllers/BreedController.js');

const router = Router();


//GET/dogs and GET/dogs?name=''
router.get('/dogs', getDogs)

//GET/dogs/{idRaza}
router.get('/dogs/:idBreed', getDogDetail )

//POST/dogs
router.post('/dogs', postDog)

//GET/temperaments
router.get('/temperaments', getTemperaments )

//DELETE
router.delete('/dogs/:idBreed', removeDogs)



module.exports = router;
