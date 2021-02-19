const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('reactions', {
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },        
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        has_liked: DataTypes.BOOLEAN
    })
}