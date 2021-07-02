const { Sequelize, DataTypes } = require('sequelize');
const sequelize =  new Sequelize('mysql::memory:');

module.exports = () => {
const post = sequelize.define('posts', {
    id: {
        type: DataTypes.INT,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userid: {
        type: DataTypes.INT,
        allowNull: false
    }
})
return post;
};