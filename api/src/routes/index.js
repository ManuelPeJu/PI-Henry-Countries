const { Router } = require('express');
const axios = require("axios");
const { Op } = require("sequelize")
const { Country, Activity } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// const getApiInfo = async () => {
//     try {
//         const countriesInfo = await axios.get(`https://restcountries.com/v3/all`);
//         let response = countriesInfo.data;
//         // console.log(response)

//         const apiInfo = response.map(el => {
//             return {
//                 id: el.cca3,
//                 name: el.name.official,
//                 flag: el.flags[0],
//                 capital: el.capital,
//                 subregion: el.subregion,
//                 area: el.area,
//                 population: el.population
//             }
//         }); // aquí mapeo para recibir los datos como yo quiero.
        
//         return apiInfo;
//     } catch (error) {
//         // res.status(404).send({error: error.message}) // en caso de tener un fallo que me diga cual es.
//     }
// };

// const getDbInfo = async () => {
//     const dbCountries = await Country.findAll({
//         include: {
//             model: Activity,
//             atributtes: ["name"],
//             through: {
//                 atributtes: [],
//             }
//         }
//     })

//     return dbCountries;
// }

// const getAllInfo = async () => {
//     const apiInfo = await getApiInfo()
//     const dbInfo = await getDbInfo()
//     const infoTotal = dbInfo.concat(apiInfo)

//     return infoTotal;
// }






//////////////////////RUTAS////////////////////////////////



//////////////////////ALL && NAME/////////////////////////
router.get("/countries", async (req, res) => {
    try {
        const name = req.query.name // pedimos un name por query() para buscar por un país específico

    if(name) {
        const result = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}` // el operador Op.iLike, nos sirve para buscar por el name que le digamos siendo no sensitivo a las caps (solo sirve en caso de usar PG, de lo contrario usariamos Op.like)
                }
            },
            include: Activity // incluimos la actividad
        })

        if(result.length === 0) {
            return res.status(404).json({
                msg: "Country not found" // verificamos que haya algo que traer y en caso de que no pues manda este mensaje
            })
            
        } 
        res.status(200).json(result) // en caso de que esté todo perfecto nos manda el país.
    } else {
        const result = await Country.findAll({
            include: {
                model: Activity,
                atributtes: ["name", "difficulty", "duration", "season"]
            }
        })
        res.status(202).send(result) // aquí llama a todos los paises incluyendo el modelo de actividad en caso de que tenga
    }
    } catch (error) {
        res.status(404).send({message: error.message}) // si hay algun tipo de fallo, que nos diga cual es para arreglarlo
    }
})

/////////////////ID////////////////////////
router.get("/countries/:id", async (req, res) => {

    
    try {
        const { id } = req.params; // pedimos una id para buscar por params (/).

    const exists = await Country.findAll({
        where: {
            id: id 
        },
        include: Activity // aqui buscamos en la base de datos por la id incluyendo la actividad
    })

    if(exists) {
        // console.log(exists)
        res.json(exists) // si existe lo que pedimos, nos lo trae
    } else {
        return res.status(404).json({
            msg: "Country not found" // si no existe nos dice que no ha encontrado anda
        })
    }
    } catch (error) {
        res.status(404).send({message: error.message}) // en caso de cualquier error nos lo imprime en cosola para solucionarlo
    }

})


////////////////////////ACTIVITIES///////////////////////////


router.get("/Activities", async (req, res) => {
    const response = await Activity.findAll(); // Buscamos todo en el modelo Activity

    let arr = []; //Creamos un array vacío donde almacenar las busquedas

    if(response) {
        for(let i = 0; i < response.length; i++) {
            if(arr.indexOf(response[i].name) === -1) { // si no encuentra repetidos no los pushea al array
                arr.push(response[i].name) // pusheamos el resultado a la variable arr donde se almacena
            } 
        }
    }
    res.send(arr) // envía las actividades
})

/////////////////////////POST///////////////////////////////


const createActivity = async (name, difficulty, duration, season, idCountry) => {
    try {
        const activity = await Activity.create({
            name,
            difficulty,
            duration,   
            season,
        }) // creamos el patrón para la actividad

        await activity.addCountry(idCountry) // le añadimos idCountry para luego las relaciones de los modelos
    } catch (error) {
        console.log(error) // en caso de error que ponga en la consola que ha pasado
    }
}


router.post("/activities", async (req, res) => {
  // Hago destructuring de la data mandada por body
  try {
    const { name, difficulty, duration, season, idCountries } = req.body; //pedimos por el body para que esos datos entren aquí
  
  if(name && difficulty && duration && season && idCountries.length > 0) { // confirmamos que existan todos los datos
        await idCountries.forEach(e => {
        createActivity(name, difficulty, duration, season, e) 
    }); // si existen, por cada uno creamos la actividad con los parametros deseados

    res.status(201).json({
        msg: `Activity "${name}" successfully created!` // nos notifica que ha ido todo bien
    })
  } else {
    res.status(400).send({
        msg: "Some fields are missing to add the activity" // nos notifica que falta algo
    })
  }
  } catch (error) {
    res.status(500).send({message: error.message}) // si hay algun error nos dice cual es para intentar arreglarlo
  }
})


module.exports = router;