module.exports =  (sequelize, DataTypes) => {
    let alias = "Method"
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name:{ 
            type: DataTypes.STRING,
            allowNull: false
        }
    }
    let config = {
        tableName: "methods",
        timestamps: false
    }
    const Method = sequelize.define(alias, cols, config);

    Method.associate = function (models) {
        Method.hasMany(models.Transaction,{
            foreingKey: "methodId"
        });
    }
    
    return Method;
}