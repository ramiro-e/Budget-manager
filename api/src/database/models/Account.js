module.exports =  (sequelize, DataTypes) => {
    let alias = "Account"
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
        name:{ 
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull: true
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    const Account = sequelize.define(alias, cols, config);

    Account.associate = function (models) {
        
        Account.belongsTo(models.User,{
            as: "user",
            foreingKey: "userId"
        });

        Account.hasMany(models.Transaction,{
            as: "account",
            foreingKey: "accountId"
        });
    }
    
    return Account;
}