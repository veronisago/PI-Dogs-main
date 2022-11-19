const { Breed, Temperament } = require('../db.js');
const axios = require('axios');


const getTotalInfo = async () => {
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds`);

    const dbInfo = await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    })

    const totalInfo = apiUrl.data.concat(dbInfo);

    return totalInfo;
}

const weightFormat = (weight) => {
    if (typeof weight ==='number') return weight;

    return weight.slice(-4).replace(/[-\s–]/g, "") 
}

const sortDogs = (array, order, orderBy) => {
    if (orderBy === 'weight') { 
        if (order == 'asc') return array.sort((a, b) => weightFormat(a.weight) - weightFormat(b.weight))
        if (order == 'desc') return array.sort((a, b) => weightFormat(b.weight)  - weightFormat(a.weight) )
    }

    if (orderBy === 'name') {
        if (order == 'asc') return array.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
        if (order == 'desc') return array.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1)
    }
}



const dogsFormat = (array) => {

    return array.map((e) => {
        return {
            id: e.id,
            image: e.image?.url || 'https://i.pinimg.com/originals/35/22/3a/35223a232b520d960d01822c29d4c9e7.jpg',
            name: e.name,
            temperament: e.temperament?.split(', ') || e.Temperaments?.map(e => e.name),
            weight: e.weight.imperial|| e.weight,
            height: e.height.imperial || e.height,
            life_span: e.life_span,
        }
    })
}


const sourceFilter = (array, source) => {
    if (source == 'api') {
        return array.filter((e) => typeof e.id == 'number')
    }
    if (source == 'created') {
        return array.filter((e) => typeof e.id == 'string')
    }
    return array;
}


const tempFilter = (array, temp) => {
    return array.filter((e) => e.temperament?.includes(temp))
}


const nameFilter = (array, name) => {
    return array.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
}



module.exports = {
    getTotalInfo,
    sortDogs,
    dogsFormat,
    sourceFilter,
    tempFilter,
    nameFilter
}
