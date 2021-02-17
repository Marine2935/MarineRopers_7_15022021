module.exports = (sequelize, type) => {
    return sequelize.define('Comment', {
        id: {
            type: type.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: type.INTEGER,
            allowNull: false
        },        
        text: type.TEXT,
        user_id: {
            type: type.INTEGER,
            allowNull: false
        },
        date_comment: type.DATE
    })
};