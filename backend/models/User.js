const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        last_name: DataTypes.STRING,
        first_name: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
};