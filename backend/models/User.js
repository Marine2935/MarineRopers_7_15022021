const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('users', {
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
        avatar_url: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },        
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        timestamps: false
    })
};