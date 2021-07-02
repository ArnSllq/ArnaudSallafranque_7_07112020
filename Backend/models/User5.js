const { Sequelize, DataTypes } = require('sequelize');
const sequelize =  new Sequelize('mysql::memory:');

module.exports = (sequelize, Sequelize) => {
const user = sequelize.define('users', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

return user;
};