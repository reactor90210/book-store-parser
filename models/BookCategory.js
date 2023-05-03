import Model from './Model.js';
import Book from "./Book.js";
import Category from "./Category.js";

export default (class extends Model {
    /**
     * Returns the table name.
     */
    static get table() {
        return 'book_category';
    }

    static get attributes() {
        return {
            book_id:  {
                type: this.DataTypes.INTEGER,
                references: {
                    model: Book,
                    key: 'id'
                }
            },
            category_id: {
                type: this.DataTypes.INTEGER,
                references: {
                    model: Category,
                    key: 'id'
                }
            },
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
            },
        };
    }

});
