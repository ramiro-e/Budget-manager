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
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name:{ 
            type: DataTypes.STRING,
            allowNull: true
        },
        color: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
    let config = {
        tableName: "account",
        timestamps: false
    }
    const Account = sequelize.define(alias, cols, config);

    Account.associate = function (models) {
        
        Account.belongsTo(models.User,{
            foreingKey: "userId"
        });

        Account.hasMany(models.Transaction,{
            foreingKey: "accountId"
        });
    }
    
    return Account;
}