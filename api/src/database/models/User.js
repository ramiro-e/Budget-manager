module.exports =  (sequelize, DataTypes) => {
    let alias = "User"
    let cols = {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        email:{ 
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName:{ 
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName:{ 
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
    let config = {
        tableName: "users",
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        
        User.hasMany(models.Account,{
            foreingKey: "userId"
        });
    }
    
    return User;
}