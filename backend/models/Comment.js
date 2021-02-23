const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('comments', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },        
        text: DataTypes.TEXT,
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        createdAt: 'date_comment',
        updatedAt: false
    })
};