import {
    Sequelize,
    Model,
    DataTypes,
    Op} from 'sequelize';
import database from '../../Database.js';

export default class Book extends Model {}

Book.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title:  DataTypes.STRING,
        image:  DataTypes.STRING,
        price:  DataTypes.DOUBLE,
        discount:  DataTypes.INTEGER,
        in_stock:  DataTypes.TINYINT,
        description:  DataTypes.TEXT,
        information:  DataTypes.TEXT,
        created_at: {
            field: 'created_at',
            type:  DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            field: 'updated_at',
            type:  DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    { sequelize: database,
        modelName: 'books',
        createdAt: "created_at",
        updatedAt: "updated_at"}
);