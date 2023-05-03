import {
    Sequelize,
    Model,
    DataTypes,
    Op} from 'sequelize';
import database from '../../Database.js';

export default class Category extends Model {}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:  DataTypes.STRING,
        parent_id:  DataTypes.INTEGER,
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
    {
        sequelize: database,
        tableName: 'categories',
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
);