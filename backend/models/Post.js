const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        text: DataTypes.TEXT,
        file_name: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        createdAt: 'date_post',
        updatedAt: 'last_update'
    })
};