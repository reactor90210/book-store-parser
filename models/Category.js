import Model from './Model.js';
import Book from './Book.js';
import BookCategory from './BookCategory.js';

export default (class extends Model {
    /**
     * Returns the table name.
     */
    static get table() {
        return 'categories';
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
            name:  this.DataTypes.STRING,
            parent_id:  this.DataTypes.INTEGER,
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

    /**
     * Define table associations.
     */
    //static association() {
    //    this.belongsToMany(Book, {
    //        through: BookCategory
    //    });
    //}
});
