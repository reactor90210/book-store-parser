import Model from './Model.js';

export default (class extends Model {

    /**
     * Returns the table name.
     */
    static get table() {
        return 'category_locations';
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
            category_id:  this.DataTypes.INTEGER,
            location_id:  this.DataTypes.INTEGER,
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
})
