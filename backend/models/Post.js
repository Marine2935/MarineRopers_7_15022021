const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('posts', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        text: DataTypes.TEXT,
        file_url: DataTypes.STRING,            
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        createdAt: 'date_post',
        updatedAt: 'last_update'
    })
};