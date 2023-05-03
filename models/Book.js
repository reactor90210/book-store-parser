import Model from './Model.js';
import Category from "./Category.js";
import BookCategory from "./BookCategory.js";

export default (class extends Model {

    /**
     * Returns the table name.
     */
    static get table() {
        return 'books';
    }

    /**
     * Returns the columns of the table.
     */
    static get attributes() {
        return {
            id: {
                type: this.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title:  this.DataTypes.STRING,
            image:  this.DataTypes.STRING,
            price:  this.DataTypes.DOUBLE,
            discount:  this.DataTypes.INTEGER,
            in_stock:  this.DataTypes.TINYINT,
            description:  this.DataTypes.TEXT,
            information:  this.DataTypes.TEXT,
            created_at: {
                field: 'created_at',
                type:  this.DataTypes.DATE,
                allowNull: false,
                defaultValue: this.DataTypes.NOW
            },
            updated_at: {
                field: 'updated_at',
                type:  this.DataTypes.DATE,
                allowNull: false,
                defaultValue: this.DataTypes.NOW
            }
        };
    }
});
