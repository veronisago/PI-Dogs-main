const { Breed } = require('../db.js');
const { getTotalInfo, sortDogs, dogsFormat, sourceFilter, nameFilter, tempFilter } = require('../helpers/DogsHelper')

//Ruta que me retorna todos los perros y si hay algun query los filtra u ordena
const getDogs = async (req, res) => {

    try {
        let { name, order, orderBy, source, temp } = req.query
        let totalDogsInfo = await getTotalInfo();

        //aqui usamos el helper para que arraydogs que contiene a los perros de api y db  tengan el mismo formato de propiedades
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

//Eliminar un perro que ha sido creado
const removeDogs = async (req, res) => {
    try {
        let { idBreed } = req.params;

        const remove = await Breed.destroy({
            where: {
                id: idBreed
            }
        })
        return res.status(200).send('ok');
    } catch (error) {
        return res.status(500).send('todo mal');
    }
}

//Dettalle de cada perro
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

//Creacion de un perro 
const postDog = async (req, res) => {
    const { name, height, weight, life_span, temperament } = req.body;

    try {
        const newDog = await Breed.create({ name, height, weight, life_span });
        await newDog.addTemperament(temperament);

        res.status(201).send(newDog)

    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = {
    getDogs,
    getDogDetail,
    postDog,
    removeDogs
}