const { DataTypes } = require('sequelize');

module.exports = (sequelize, type) => {
    return sequelize.define('Comment', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },        
        text: DataTypes.TEXT,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        createdAt: 'date_comment',
        updatedAt: false
    })
};