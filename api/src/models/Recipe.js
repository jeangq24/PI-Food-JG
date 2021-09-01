const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      unique: true,
      allowNull: false,
      primaryKey: true,
      
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    image: {
      type: DataTypes.STRING
    },

    puntuacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    nivel_saludable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    paso_paso: {
      type: DataTypes.TEXT,
    },

    tipo_plato: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }

    
  });
};
