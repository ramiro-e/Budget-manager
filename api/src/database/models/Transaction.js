module.exports =  (sequelize, DataTypes) => {
    let alias = "Transaction"
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        accountId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        datetime:{
            type:DataTypes.DATE,
            allowNull: true
        },
        name:{ 
            type: DataTypes.STRING,
            allowNull: true
        },
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        methodId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull: true
        }
    }
    let config = {
        tableName: "transactions",
        timestamps: true
    }
    const Transaction = sequelize.define(alias, cols, config);

    Transaction.associate = function (models) {

        Transaction.belongsTo(models.Account,{
            foreingKey: "accountId"
        });

        Transaction.belongsTo(models.Category,{
            foreingKey: "categoryId"
        });
        
        Transaction.belongsTo(models.Method,{
            foreingKey: "methodId"
        });
    }
    
    return Transaction;
}