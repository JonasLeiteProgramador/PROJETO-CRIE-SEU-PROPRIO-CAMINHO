import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/connection.js";
import { projectEntity } from "./project.entity.js";



export const imageEntity = sequelize.define('Image',{
    id:{
        type:DataTypes.UUID,
        allowNull:true,
        defaultValue:Sequelize.UUIDV4,
        primaryKey:true

    },
    fileName:{
        type:DataTypes.STRING,
        allowNull:true,

    },
    url:{
        type:DataTypes.STRING,
        allowNull:true
    },
    projectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: projectEntity,
          key: 'id' 
        }
    }
})


imageEntity.sync()
  .then(() => {
    console.log('Tabela "Images" criada com sucesso');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar tabela "Images":', error);
  });