module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
            type: type.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        last_name: type.STRING,
        first_name: type.STRING,
        pseudo: {
            type: type.STRING,
            allowNull: false
        },
        image_name: type.STRING,
        email: {
            type: type.STRING,
            allowNull: false
        },        
        password: {
            type: type.STRING,
            allowNull: false
        },
        isAdmin: {
            type: type.BOOLEAN,
            defaultValue: false
        }
    })
};