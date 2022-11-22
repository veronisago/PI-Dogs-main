const { Temperament } = require('../db');
const axios = require('axios');


const getTemperaments = async (req, res) => {
    try {
        let temCount = await Temperament.count()

        if (temCount === 0) {
            const apiInfo = await axios.get('https://api.thedogapi.com/v1/breeds')
            let temperaments = '';
    
            apiInfo.data.forEach(e => {
                if (e.temperament) temperaments += `${e.temperament}, `
            });
    
            //array de elementos unicos 
            let temArray = [...new Set(temperaments.replaceAll(", ", " ").trim().split(' '))];
    
            let arrayObj = temArray.map((e) => {
                return { name: e }
            });
            await Temperament.bulkCreate(arrayObj)
        }
        let info = await Temperament.findAll()

        return res.status(200).send(info)

    } catch (error) {
        res.status(404).send(error.message)
    }

}

module.exports = { getTemperaments }