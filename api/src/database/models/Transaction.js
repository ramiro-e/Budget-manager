module.exports =  (sequelize, DataTypes) => {
    let alias = "Transaction"
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        datetime:{
            type:dataTypes.DATE,
            allowNull: true
        },
        name:{ 
            type: DataTypes.STRING,
            allowNull: true
        },
        categoryId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        depOrWit: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        methodId: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        createdAt:{
            type:dataTypes.DATE,
            allowNull: true
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.hasMany(models.Transaction,{
            as: "user",
            foreingKey: "userId"
        });
    }
    
    return User;
}