module.exports =  (sequelize, DataTypes) => {
    let alias = "Category"
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
        tableName: "categories",
        timestamps: false
    }
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function (models) {
        Category.hasMany(models.Transaction,{
            foreingKey: "categoryId"
        });
    }
    
    return Category;
}