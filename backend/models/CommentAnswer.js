const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('comment_answers', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        comment_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },        
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    }, {
        createdAt: 'date_answer',
        updatedAt: false
    })
};