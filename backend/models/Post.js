const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        text: DataTypes.TEXT,
        file_name: DataTypes.STRING,
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date_post: DataTypes.DATE,
        last_modif: DataTypes.DATE
    })
};