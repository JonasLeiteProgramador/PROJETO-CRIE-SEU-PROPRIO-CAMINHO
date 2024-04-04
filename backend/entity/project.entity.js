import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../database/connection.js';

export const projectEntity = sequelize.define('Project', {
 
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: true
       
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING(30),
        allowNull:true
    },
    technologies:{
        type:DataTypes.STRING,
        allowNull:true
    },
    contactNumber:{
        type:DataTypes.STRING,
        allowNull:true
    }

   
});


projectEntity.sync()
  .then(() => {
    console.log('Tabela "Images" criada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabela "Images":', error);
  });