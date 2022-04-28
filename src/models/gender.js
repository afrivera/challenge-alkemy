const { DataTypes } = require('sequelize');

const db = require('../loaders/database');

const Gender = db.define('genders', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
},{
    indexes: [
        {
            unique: true,
            fields: ['name']
        }
    ]
})

module.exports = Gender;