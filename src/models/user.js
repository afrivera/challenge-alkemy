const { DataTypes } = require('sequelize');

const db = require('../loaders/database');

const User = db.define('users', {
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    enable: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    role: {
        type: DataTypes.ENUM('USER_ROLE', 'ADMIN_ROLE'),
        defaultValue: 'USER_ROLE'
    }
},{
    indexes: [
        {
            unique: true,
            fields: [ 'username', 'email']
        }
    ]
})

module.exports = User;