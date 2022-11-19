const { Breed } = require('../db.js');
const { getTotalInfo, sortDogs, dogsFormat, sourceFilter, nameFilter, tempFilter } = require('../helpers/DogsHelper')

const getDogs = async (req, res) => {

    try {
        let { name, order, orderBy, source, temp } = req.query
        let totalDogsInfo = await getTotalInfo();


        let arrayDogs = dogsFormat(totalDogsInfo)

        if (name) arrayDogs = nameFilter(arrayDogs, name)
        if (order && orderBy) sortDogs(arrayDogs, order, orderBy)
        if (source) arrayDogs = sourceFilter(arrayDogs, source)
        if (temp) arrayDogs = tempFilter(arrayDogs, temp)

        return res.status(200).send(arrayDogs);

    } catch (error) {
        res.status(404).send(error.message)
    }
}

const getDogDetail = async (req, res) => {
    const { idBreed } = req.params;
    let totalDogsInfo = await getTotalInfo();

    try {
        const filterDogs = totalDogsInfo.filter(e => e.id == idBreed)
        if (filterDogs.length) {
            return res.status(200).send(dogsFormat(filterDogs)[0])
        }
        return res.status(404).send('No existe coincidencia para el ID')
    } catch (error) {
        res.status(404).send(error.message)
    }
}

const postDog = async (req, res) => {
    const { name, height, weight, life_span, temperament } = req.body;

    try {
        const newDog = await Breed.create({ name, height, weight, life_span });
        await newDog.addTemperament(temperament);

        res.status(200).send(newDog)

    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {
    getDogs,
    getDogDetail,
    postDog
}