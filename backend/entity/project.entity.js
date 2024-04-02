import { Sequelize, DataTypes } from 'sequelize'
import { sequelize } from '../database/connection.js'

export const projectEntity = sequelize.define('Project', {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: Sequelize.UUID,
        allowNull: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(30),
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Esse campo não pode estar vazio!"
            },
            len: {
                args: [10, 30],
                msg: "Esse campo deve ter pelo menos de 10 a 30 caracteres"
            }
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    email:{
        type:DataTypes.STRING(30),
        allowNull:true
    },
    tecnologies:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    contactNumber:{
        type:DataTypes.STRING,
        allowNull:true
    }
    


})