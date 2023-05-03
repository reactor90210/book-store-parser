import {
    Sequelize,
    Model,
    DataTypes,
    Op} from 'sequelize';
import Book from "./Book.js";
import Category from "./Category.js";
import database from '../../Database.js';

export default class BookCategory extends Model {}

BookCategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        book_id:  {
            type: DataTypes.INTEGER,
            references: {
                model: Book,
                key: 'id'
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Category,
                key: 'id'
            }
        },
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
        },
    },
    {
        sequelize: database,
        tableName: 'book_category',
        createdAt: "created_at",
        updatedAt: "updated_at",
        underscored: true
    },
);