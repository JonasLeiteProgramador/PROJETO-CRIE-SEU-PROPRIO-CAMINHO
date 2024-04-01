import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/connection.js";



export const imageEntity = sequelize.define('image',{
    id:{
        type:DataTypes.UUIDV4,
        allowNull:true,
        defaultValue:Sequelize.UUID

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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Project', 
          key: 'id' 
        }
    }
})