//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn, Country } = require('./src/db.js');
const axios = require("axios")


const getApiInfo = async () => {
  try {
    const exists = await Country.count();

  if(!exists) {
    axios.get("https://restcountries.com/v3/all")
      .then( response => {
        response.data.forEach(async (e) => {
          let cap = "None";
          let cont = "None";
          if(Array.isArray(e.capital)) {
            cap = e.capital.pop()
          }
          if(Array.isArray(e.continents)) {
            cont = e.continents.pop()
          }
          
          await Country.create({
            id: e.cca3,
            name: e.name.official,
            image: e.flags[1],
            continents: cont,
            capital: cap,
            subregion: e.subregion,
            area: e.area,
            population: e.population,
          })
        })
      })
  } else {
    console.log("\n Database already created")
  }
  } catch (error) {
    console.log(error)
  }
  // const exists = await Country.count();

  // if(!exists) {
  //   axios.get("https://restcountries.com/v3/all")
  //     .then( response => {
  //       response.data.forEach(async (e) => {
  //         let cap = "None";
  //         let cont = "None";
  //         if(Array.isArray(e.capital)) {
  //           cap = e.capital.pop()
  //         }
  //         if(Array.isArray(e.continents)) {
  //           cont = e.continents.pop()
  //         }
          
  //         await Country.create({
  //           id: e.cca3,
  //           name: e.name.official,
  //           image: e.flags[1],
  //           continents: cont,
  //           capital: cap,
  //           subregion: e.subregion,
  //           area: e.area,
  //           population: e.population
  //         })
  //       })
  //     })
  // } else {
  //   console.log("\n Database already created")
  // }
}

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
    getApiInfo()
  });
});
