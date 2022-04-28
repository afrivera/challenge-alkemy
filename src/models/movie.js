const { DataTypes } = require('sequelize');

const db = require('../loaders/database');

const Movie = db.define('movies', {
    title: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    creationDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    calification:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    contentType: {
        type: DataTypes.ENUM('SERIES', 'MOVIES'),
        allowNull: false
    }
},{
    indexes: [
        {
            unique: true,
            fields: ['title', 'contentType' ]
        }
    ]
})

module.exports = Movie;