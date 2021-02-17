module.exports = (sequelize, type) => {
    return sequelize.define('Post', {
        id: {
            type: type.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        text: type.TEXT,
        file_name: type.STRING,
        user_id: {
            type: type.INTEGER,
            allowNull: false
        },
        date_post: type.DATE,
        last_modif: type.DATE
    })
};