const { DataTypes, UUIDV4 } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {

    id: {
      type:DataTypes.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
      // defaultValue: UUIDV4
    },

    name: {
      type: DataTypes.STRING,
    },

    image: {
      type:DataTypes.STRING,
    },

    continents: {
      type: DataTypes.STRING,
    },

    capital: {
      type: DataTypes.STRING,
    },

    subregion: {
      type: DataTypes.STRING,    
    },

    area: {
      type:DataTypes.DECIMAL,
    },

    population: {
      type:DataTypes.INTEGER,
    },

  },
  {
    timestamps: false
  },
  );
};
