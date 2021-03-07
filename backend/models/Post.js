const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('posts', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        file_url: DataTypes.STRING,
        link_url: DataTypes.TEXT,            
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        createdAt: 'date_post',
        updatedAt: 'last_update'
    })
};