const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  id: {
    type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
  },

description:{
  type: DataTypes.TEXT,
  allowNull: false,
},

released:{
  type: DataTypes.STRING,
  allowNull: false,
},

rating:{
  type: DataTypes.STRING,
  allowNull: false,
},

rating_top:{
  type: DataTypes.STRING,
  allowNull: false,
},

platforms:{
  type: DataTypes.JSON,
  allowNull: false,
},
img:{
  type: DataTypes.TEXT,
  allowNull: false,
},

background_image:{
  type: DataTypes.TEXT,
  allowNull: false,
},




  });
};
