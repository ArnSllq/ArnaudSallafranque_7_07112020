const { Sequelize, DataTypes } = require('sequelize');
const sequelize =  new Sequelize('mysql::memory:');

module.exports = () => {
const comment = sequelize.define('comments', {
    id: {
        type: DataTypes.INT,
        allowNull: false
    },
    userid: {
        type: DataTypes.INT,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    postid: {
        type: DataTypes.INT,
        allowNull: false
    }
})
return comment;
};