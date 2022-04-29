const { DataTypes } = require('sequelize');

const db = require('../loaders/database');

const Character = db.define('characters', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    history: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},{
    indexes:[
        {
            unique: true,
            fields: ['name', 'age', 'weight']
        }
    ]
})

module.exports = Character;

Character.belongsToMany(require('./movie'), {
    through: 'charactersMovies',
    foreignKey: 'characterId'
});